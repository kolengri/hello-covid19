import { createStore, createTypedHooks } from 'easy-peasy';

import storeModel, { StoreModel } from './model';

const store = createStore(storeModel);

export const hooks = createTypedHooks<StoreModel>();

export default store;
