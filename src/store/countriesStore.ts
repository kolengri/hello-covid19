import { Action, action, Thunk, thunk } from 'easy-peasy';

import { fetchCounties } from '../api';
import { Country, Store, StoreStatus } from '../models';

export type Item = Country & {
  deathRate: number;
  resolved: number;
  recoveryRate: number;
  rating: number;
};
export type Content = Item[];

const weights = {
  recovered: 5,
  active: 0,
  critical: -1,
  death: -5
};

const countResolved = (totalCase: number, activeCases: number) => totalCase - activeCases;
const countDeathRate = (recovered: number, resolved: number) => (recovered > 0 ? Math.floor(resolved / recovered) : 0);
const countRecoveryRate = (deaths: number, resolved: number) => (deaths > 0 ? Math.floor(resolved / deaths) : 0);
const countRating = (deaths: number, recovered: number, critical: number, active: number) => {
  return (
    (recovered * weights.recovered + active * weights.active + critical * weights.critical + deaths * weights.death) /
    (deaths + recovered + critical + active)
  );
};

export interface Model extends Store<Content | undefined> {
  fetch: Thunk<Model>;
  fetchError: Action<Model, Error>;
  fetchSuccess: Action<Model, Content>;
  fetchStart: Action<Model>;
}

const store: Model = {
  status: StoreStatus.Empty,
  content: undefined,
  error: null,
  fetchStart: action((state) => {
    state.status = StoreStatus.Fetching;
    state.error = null;
  }),
  fetchError: action((state, error) => {
    state.status = StoreStatus.Error;
    state.error = error.message;
  }),
  fetchSuccess: action((state, content) => {
    state.status = StoreStatus.Success;
    state.content = content;
    state.error = null;
  }),
  fetch: thunk(async (actions, payload) => {
    try {
      actions.fetchStart();
      const response = await fetchCounties();
      const content: Content = response.map((item) => {
        const { cases, active, recovered, deaths, critical } = item;
        const resolved = countResolved(cases, active);
        const deathRate = countDeathRate(recovered, resolved);
        const recoveryRate = countRecoveryRate(deaths, resolved);
        const rating = countRating(deaths, recovered, critical, active);
        return { ...item, recoveryRate, deathRate, resolved, rating };
      });
      actions.fetchSuccess(content);
    } catch (error) {
      actions.fetchError(error);
    }
  })
};

export default store;
