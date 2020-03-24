export enum StoreStatus {
  Fetching = 'fetching',
  Error = 'error',
  Success = 'success',
  Empty = 'empty'
}

export interface Store<T> {
  status: StoreStatus;
  error?: string | null;
  content: T;
}
