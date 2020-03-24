import * as qs from 'qs';
import { generatePath } from 'react-router-dom';

export interface UrlParams {
  [key: string]: string;
}

export const urlReplace = <T = UrlParams>(path: string, params: T, query?: UrlParams): string => {
  const [urlString, search = ''] = path.split('?');
  const existSearch = qs.parse(search);
  const searchNeedly = qs.stringify(
    { ...existSearch, ...query },
    {
      encode: false
    }
  );

  try {
    const resultParams = { ...params } as any;
    return `${generatePath(urlString, resultParams)}${searchNeedly ? `?&${searchNeedly}` : ''}`;
  } catch (error) {
    console.error(error);
    return path;
  }
};

export default urlReplace;
