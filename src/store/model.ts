import countries, { Model as CountriesModel } from './countriesStore';
export type StoreModel = {
  countries: CountriesModel;
};

const storeModel: StoreModel = {
  countries
};

export default storeModel;
