import * as React from 'react';

import { Button, Callout } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

import { useCountries } from '../../../hooks';
import { StoreStatus } from '../../../models';
import { Country as CountryPage } from '../../../pages/country';
import { Item as StoreItem } from '../../../store/countriesStore';
import { Segment, Table, TableColumns } from '../../ui';
import { Danger, Success, Warning } from './style';

export type CountriesTableProps = {};

const Detail: React.FC<{ country: string }> = ({ country }) => {
  const history = useHistory();

  // tslint:disable-next-line: jsx-no-lambda
  return <Button onClick={() => history.push(CountryPage.url({ country }))}>Detail</Button>;
};

const columns: TableColumns<StoreItem> = [
  {
    Header: 'Country',
    accessor: (c) => c.country
  },
  {
    Header: 'Total Cases',
    id: 'totalCases',
    accessor: (c) => c.cases,
    Cell: ({ cell }) => cell.value.toLocaleString()
  },
  {
    Header: 'Alive Cases',
    columns: [
      {
        Header: 'Active Cases',
        id: 'totalActive',
        accessor: (c) => c.active,
        Cell: ({ cell }) => cell.value.toLocaleString()
      },

      {
        Header: 'New Cases',
        id: 'totalNew',
        accessor: (c) => c.todayCases,
        Cell: ({ cell }) => {
          return cell.value > 0 ? <Warning>+{cell.value.toLocaleString()}</Warning> : cell.value;
        }
      },

      {
        Header: 'Critical Cases',
        id: 'totalCritical',
        accessor: (c) => c.critical,
        Cell: ({ cell }) => cell.value.toLocaleString()
      },
      {
        Header: 'Recovered Cases',
        id: 'totalRecovery',
        accessor: (c) => c.recovered,
        Cell: ({ cell }) => {
          return cell.value > 0 ? <Success>{cell.value.toLocaleString()}</Success> : cell.value;
        }
      }
    ]
  },

  {
    Header: 'Death Cases',
    columns: [
      {
        Header: 'Total Deaths',
        id: 'totalDeaths',
        accessor: (c) => c.deaths,
        Cell: ({ cell }) => cell.value.toLocaleString()
      },
      {
        Header: 'New Deaths',
        id: 'newDeaths',
        accessor: (c) => c.todayDeaths,
        Cell: ({ cell }) => {
          return cell.value > 0 ? <Danger>+{cell.value.toLocaleString()}</Danger> : cell.value;
        }
      }
    ]
  },
  {
    Header: 'Recovery/Death',
    accessor: (c) => {
      const { recoveryRate, deathRate } = c;

      return `${recoveryRate}/${deathRate}`;
    }
  },
  {
    Header: 'Success Rating',
    accessor: (c) => {
      const { rating } = c;

      return rating;
    },
    Cell: ({ cell }) => cell.value.toFixed(2).toLocaleString()
  },
  {
    Header: 'Actions',
    accessor: ({ country }) => country,
    Cell: ({ cell }) => <Detail country={cell.value} />
  }
];

const CountriesTableMemo: React.FC<CountriesTableProps> = (props) => {
  const { state, fetch } = useCountries();
  const loading = state.status === StoreStatus.Fetching;

  return (
    <>
      <Segment loading={loading} style={{ padding: 0 }}>
        {state.error && (
          <Callout
            intent="danger"
            // tslint:disable-next-line: jsx-no-lambda
            onClick={() => fetch()}
          >
            {state.error}
          </Callout>
        )}
        {!state.error && <Table striped interactive bordered data={state.content || []} columns={columns} />}
      </Segment>
    </>
  );
};

export const CountriesTable = React.memo(CountriesTableMemo);

export default CountriesTable;
