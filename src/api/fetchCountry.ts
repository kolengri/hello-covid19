import { Country } from '../models';
import { ONE_COUNTRY } from './paths';
import { request } from './request';

export type FetchCountryResponse = Country;

export const fetchCountry = async (name: string): Promise<Response> => {
  return request<Response>(ONE_COUNTRY({ name }));
};
