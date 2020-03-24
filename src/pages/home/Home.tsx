import * as React from 'react';

import { PageLayout } from '../../components';
import { BASE_URL } from '../../config';
import { useCountries } from '../../hooks';
import { urlDecorator } from '../../utils';

export type HomeProps = {};

export const url = urlDecorator(`${BASE_URL}`);

export type HomeParams = {};

const HomeMemo: React.FC<HomeProps> = (props) => {
  const { state } = useCountries();

  return (
    <PageLayout title="Hello COVID19 - Home Page">
      <table>
        <tbody>
          {state.content?.map((item) => (
            <tr key={item.country}>
              <td>{item.country}</td>
              <td>{item.cases}</td>
              <td>{item.active}</td>
              <td>{item.deaths}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageLayout>
  );
};

export const Home = React.memo(HomeMemo);

export default Home;
