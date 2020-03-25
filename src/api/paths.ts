import { urlDecorator } from '../utils';

export const ALL_COUNTRIES = 'https://corona.lmao.ninja/countries';
export const ONE_COUNTRY = urlDecorator<{ name: string }>('https://corona.lmao.ninja/countries/:name');
