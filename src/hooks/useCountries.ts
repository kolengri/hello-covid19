import { useEffect } from 'react';

import { hooks } from '../store';

const { useStoreActions, useStoreState } = hooks;

export const useCountries = () => {
  const state = useStoreState((s) => s.countries);
  const { fetch } = useStoreActions((s) => s.countries);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    state,
    fetch
  };
};
