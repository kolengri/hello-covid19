import { Country } from '../models';
import { ALL_COUNTRIES } from './paths';
import { request } from './request';

export type Response = Country[];

export const fetchCounties = async (): Promise<Response> => {
  return request<Response>(ALL_COUNTRIES);
};
