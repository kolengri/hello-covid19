import * as React from 'react';

import { LineChart, Line, XAxis, YAxis } from 'recharts';

import { useCountries } from '../../../hooks';
import { StoreStatus } from '../../../models';
import { Segment } from '../../ui';

export type PieProps = {};

const PieMemo: React.FC<PieProps> = (props) => {
  const { state } = useCountries();
  const loading = state.status === StoreStatus.Fetching;
  const data = state?.content?.sort((a, b) => (a.todayCases >= b.todayCases ? -1 : 1));

  return (
    <>
      <Segment loading={loading} style={{ padding: 0 }}>
        {!state.error && (
          <LineChart width={800} height={400} data={data ? data.splice(0, 5) : []}>
            <Line type="monotone" dataKey="todayCases" stroke="#8884d8" />
            <XAxis dataKey="country" />
            <YAxis />
          </LineChart>
        )}
      </Segment>
    </>
  );
};

export const Pie = React.memo(PieMemo);

export default Pie;
