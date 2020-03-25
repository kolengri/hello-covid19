import * as React from 'react';

import { Button, Divider } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

import { useCountries } from '../../../hooks';
import { Country, StoreStatus } from '../../../models';
import { Country as CountryPage } from '../../../pages/country';
import { Segment, Table, TableColumns } from '../../ui';

export type CountriesTableProps = {};

const Detail: React.FC<{ country: string }> = ({ country }) => {
  const history = useHistory();

  // tslint:disable-next-line: jsx-no-lambda
  return <Button onClick={() => history.push(CountryPage.url({ country }))}>Detail</Button>;
};

const columns: TableColumns<Country> = [
  {
    Header: 'Country',
    accessor: (c) => c.country
  },

  {
    Header: 'Total Cases',
    accessor: (c) => c.cases.toLocaleString()
  },
  {
    Header: 'New Cases',
    accessor: (c) => c.todayCases.toLocaleString()
  },
  {
    Header: 'Active Cases',
    accessor: (c) => c.active.toLocaleString()
  },
  {
    Header: 'Total Deaths',
    accessor: (c) => c.deaths.toLocaleString()
  },
  {
    Header: 'New Deaths',
    accessor: (c) => c.todayDeaths.toLocaleString()
  },
  {
    Header: 'Critical',
    accessor: (c) => c.critical.toLocaleString()
  },
  {
    Header: 'Total Recovered',
    accessor: (c) => c.recovered.toLocaleString()
  },
  {
    Header: 'Death Rate',
    accessor: (c) => {
      const { cases, deaths, active } = c;
      if (deaths === 0) {
        return '-';
      }
      return ((deaths * 100) / (cases - active)).toFixed(2) + '%';
    }
  },
  {
    Header: 'Recovery Rate',
    accessor: (c) => {
      const { cases, recovered, active } = c;
      if (recovered === 0) {
        return '-';
      }
      return ((recovered * 100) / (cases - active)).toFixed(2) + '%';
    }
  },
  {
    Header: 'Actions',

    accessor: ({ country }) => {
      // tslint:disable-next-line: react-hooks-nesting
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return <Detail country={country} />;
    }
  }
];

const CountriesTableMemo: React.FC<CountriesTableProps> = (props) => {
  const { state, fetch } = useCountries();
  const loading = state.status === StoreStatus.Fetching;

  return (
    <Segment loading={loading}>
      <Button loading={loading} onClick={() => fetch()}>
        Refresh Table
      </Button>
      <Divider />
      <Table striped interactive bordered data={state.content || []} columns={columns} />
    </Segment>
  );
};

export const CountriesTable = React.memo(CountriesTableMemo);

export default CountriesTable;
