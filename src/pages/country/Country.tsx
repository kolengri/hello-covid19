import * as React from 'react';

import { useParams } from 'react-router-dom';

import { PageLayout } from '../../components';
import { BASE_URL } from '../../config';
import { urlDecorator } from '../../utils';

export type CountryProps = {};
export type CountryParams = {
  country: string;
};

export const url = urlDecorator<CountryParams>(`${BASE_URL}:country`);

const CountryMemo: React.FC<CountryProps> = (props) => {
  const { country } = useParams<CountryParams>();
  return (
    <PageLayout title={`Hello COVID19 - ${country}`} header={country}>
      {country}
      <h1>WIP PAGE</h1>
    </PageLayout>
  );
};

export const Country = React.memo(CountryMemo);

export default Country;
