import { Action, action, Thunk, thunk } from 'easy-peasy';

import { fetchCounties } from '../api';
import { Country, Store, StoreStatus } from '../models';

export type Content = Country[];

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
      const content = await fetchCounties();
      actions.fetchSuccess(content);
    } catch (error) {
      actions.fetchError(error);
    }
  })
};

export default store;
