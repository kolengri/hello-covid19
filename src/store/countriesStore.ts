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

export type Weights = {
  recovered: number;
  active: number;
  critical: number;
  deaths: number;
};

const WEIGHTS: Weights = {
  recovered: 5,
  active: 0,
  critical: -1,
  deaths: -5
};

export type WeightsData = Record<keyof Weights, number>;

const countResolved = (totalCase: number, activeCases: number) => totalCase - activeCases;
const countDeathRate = (recovered: number, resolved: number) => (recovered > 0 ? Math.floor(resolved / recovered) : 0);
const countRecoveryRate = (deaths: number, resolved: number) => (deaths > 0 ? Math.floor(resolved / deaths) : 0);
const countRating = (data: WeightsData) => {
  const weightResult = Object.entries(data).reduce((acc, curr) => {
    const [key, value] = curr;
    const weight = WEIGHTS[key as keyof WeightsData] || 0;
    return acc + value * weight;
  }, 0);
  const weightSum = Object.entries(data).reduce((acc, curr) => {
    const [, value] = curr;
    return acc + value;
  }, 0);

  return weightResult / weightSum;
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
        const rating = countRating({ deaths, recovered, critical, active });
        return { ...item, recoveryRate, deathRate, resolved, rating };
      });
      actions.fetchSuccess(content);
    } catch (error) {
      actions.fetchError(error);
    }
  })
};

export default store;
