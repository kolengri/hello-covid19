import { urlReplace } from './urlReplace';

export const urlDecorator = <T, Q = {}>(path: string): UrlDecoratorResult<T, Q> => (params, query) => {
  if (params || query) {
    return urlReplace(path, params, query as any);
  }
  return path;
};
