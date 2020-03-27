import * as React from 'react';

import { PieChart, Pie, Cell, Tooltip, Legend, XAxis, Label } from 'recharts';

import { useCountries } from '../../../hooks';
import { StoreStatus } from '../../../models';
import { Segment } from '../../ui';
import { Item as StoreItem } from '../../../store/countriesStore';

const COLORS = ['red', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', 'purple', 'magenta', 'blue', '#000'];

export type ChartProps = {
  dataKey: keyof StoreItem;
  title: string;
};

const ChartMemo: React.FC<ChartProps> = ({ dataKey, title }) => {
  const { state } = useCountries();
  const loading = state.status === StoreStatus.Fetching;
  const data = state.content || [];
  const sortedData = [...data].sort((a, b) => (a[dataKey] >= b[dataKey] ? -1 : 1));
  const otherCountries = sortedData.slice(8);
  const otherCountriesCases = otherCountries.reduce((sum, current) => {
    return sum + Number(current[dataKey]);
  }, 0);

  return (
    <Segment loading={loading}>
      {!state.error && (
        <>
          <h3>{title}</h3>
          <PieChart width={450} height={400}>
            <Pie
              dataKey={dataKey}
              isAnimationActive={false}
              data={sortedData.slice(0, 8).concat([{ country: 'Others', [dataKey]: otherCountriesCases } as any])}
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
            <Legend />
          </PieChart>
        </>
      )}
    </Segment>
  );
};

export const Chart = React.memo(ChartMemo);

export default Chart;
