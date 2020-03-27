import * as React from 'react';

import { H4 } from '@blueprintjs/core';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { useCountries } from '../../../hooks';
import { StoreStatus } from '../../../models';
import { Item as StoreItem } from '../../../store/countriesStore';
import { Segment } from '../../ui';

const COLORS = ['red', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', 'purple', 'magenta', 'blue', '#000'];

export type ChartProps = {
  dataKey: keyof StoreItem;
  title: string;
};

const TOP_COUNTRIES = 5;

const useChartData = (config: ChartProps) => {
  const { dataKey } = config;
  const { state } = useCountries();
  const loading = state.status === StoreStatus.Fetching;
  const data = state.content || [];
  const sortedData = React.useMemo(() => [...data].sort((a, b) => (a[dataKey] >= b[dataKey] ? -1 : 1)), [data, dataKey]);
  const otherCountries = sortedData.slice(TOP_COUNTRIES);
  const otherCountriesCases = React.useMemo(
    () =>
      otherCountries.reduce((sum, current) => {
        return sum + Number(current[dataKey]);
      }, 0),
    [dataKey, otherCountries]
  );
  const topCountriesData = React.useMemo(
    () => sortedData.slice(0, TOP_COUNTRIES).concat([{ country: 'Others', [dataKey]: otherCountriesCases } as any]),
    [dataKey, otherCountriesCases, sortedData]
  );

  return {
    state,
    loading,
    topCountriesData,
    countriesData: sortedData,
    otherCountriesSum: otherCountriesCases
  };
};

const ChartMemo: React.FC<ChartProps> = (props) => {
  const { title, dataKey } = props;
  const { loading, state, topCountriesData } = useChartData(props);
  return (
    <Segment loading={loading}>
      {!state.error && (
        <>
          <H4>{title}</H4>
          <PieChart width={450} height={400}>
            <Pie
              dataKey={dataKey}
              isAnimationActive={false}
              data={topCountriesData}
              cx={200}
              cy={200}
              // tslint:disable-next-line: jsx-no-lambda
              label={(p) => (typeof p.value === 'number' ? p.value.toLocaleString() : p.value)}
              outerRadius={80}
              fill="#8884d8"
              nameKey="country"
            >
              {state.content?.map((entry, index) => (
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
