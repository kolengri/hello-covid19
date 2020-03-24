import * as React from 'react';

import { CountriesTable, PageLayout } from '../../components';
import { BASE_URL } from '../../config';
import { urlDecorator } from '../../utils';

export type HomeProps = {};

export const url = urlDecorator(`${BASE_URL}`);

export type HomeParams = {};

const HomeMemo: React.FC<HomeProps> = (props) => {
  return (
    <PageLayout title="Hello COVID19 - Home Page">
      <CountriesTable />
    </PageLayout>
  );
};

export const Home = React.memo(HomeMemo);

export default Home;
