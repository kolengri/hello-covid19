import { Country } from '../models';
import { ALL_COUNTRIES } from './paths';
import { request } from './request';

export type FetchCountiesResponse = Country[];

export const fetchCounties = async (): Promise<FetchCountiesResponse> => {
  return request<FetchCountiesResponse>(ALL_COUNTRIES);
};
