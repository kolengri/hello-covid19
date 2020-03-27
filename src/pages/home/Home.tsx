import * as React from 'react';

import { Chart, CountriesTable, PageLayout } from '../../components';
import { BASE_URL } from '../../config';
import { urlDecorator } from '../../utils';
import { Wrapper } from './styled';

export type HomeProps = {};

export const url = urlDecorator(BASE_URL);

export type HomeParams = {};

const HomeMemo: React.FC<HomeProps> = (props) => {
  return (
    <PageLayout title="Hello COVID19 - Home Page">
      <Wrapper>
        <Chart dataKey="active" title="Active cases" />
        <Chart dataKey="todayCases" title="New cases" />
        <Chart dataKey="todayDeaths" title="New deaths" />
      </Wrapper>
      <br />
      <CountriesTable />
    </PageLayout>
  );
};

export const Home = React.memo(HomeMemo);

export default Home;
