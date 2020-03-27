import * as React from 'react';

import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, Tooltip } from 'recharts';

import { useCountries } from '../../../hooks';
import { StoreStatus } from '../../../models';
import { Segment } from '../../ui';

const COLORS = ['red', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', 'purple'];

export type ChartProps = {};

const ChartMemo: React.FC<ChartProps> = (props) => {
  const { state } = useCountries();
  const loading = state.status === StoreStatus.Fetching;
  const data = state.content || [];
  const sortedData = [...data].sort((a, b) => (a.todayCases >= b.todayCases ? -1 : 1));

  return (
    <Segment loading={loading} style={{ padding: 0 }}>
      {!state.error && (
        <>
          <PieChart width={800} height={400}>
            <Pie
              dataKey="todayCases"
              isAnimationActive={false}
              data={sortedData.slice(0, 6)}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              nameKey="country"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </>
      )}
    </Segment>
  );
};

export const Chart = React.memo(ChartMemo);

export default Chart;
