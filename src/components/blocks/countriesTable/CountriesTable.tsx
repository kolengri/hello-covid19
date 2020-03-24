import * as React from 'react';

import { useCountries } from '../../../hooks';
import { Country, StoreStatus } from '../../../models';
import { Segment, Table, TableColumns } from '../../ui';

export type CountriesTableProps = {};

const columns: TableColumns<Country> = [
  {
    Header: 'Country',
    accessor: (c) => c.country
  },

  {
    Header: 'Total Cases',
    accessor: (c) => c.cases
  },
  {
    Header: 'New Cases',
    accessor: (c) => c.todayCases
  },
  {
    Header: 'Active Cases',
    accessor: (c) => c.active
  },
  {
    Header: 'Total Deaths',
    accessor: (c) => c.deaths
  },
  {
    Header: 'New Deaths',
    accessor: (c) => c.todayDeaths
  },
  {
    Header: 'Critical',
    accessor: (c) => c.critical
  },
  {
    Header: 'Total Recovered',
    accessor: (c) => c.recovered
  },
  {
    Header: 'Death Rate',
    accessor: (c) => {
      const { cases, deaths, active } = c;
      return ((deaths * 100) / (cases - active)).toFixed(2) + '%';
    }
  },
  {
    Header: 'Recovery Rate',
    accessor: (c) => {
      const { cases, recovered, active } = c;
      return ((recovered * 100) / (cases - active)).toFixed(2) + '%';
    }
  }
];

const CountriesTableMemo: React.FC<CountriesTableProps> = (props) => {
  const { state } = useCountries();

  return (
    <Segment loading={state.status === StoreStatus.Fetching}>
      <Table striped interactive bordered data={state.content || []} columns={columns} />
    </Segment>
  );
};

export const CountriesTable = React.memo(CountriesTableMemo);

export default CountriesTable;
