import { Spinner as BaseSpinner } from '@blueprintjs/core';
import styled, { CSSObject } from 'styled-components';

const disabled: CSSObject = {
  opacity: '.5',
  cursor: 'default',
  ':after': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100
  }
};

export const Outer = styled.div<{ loading?: boolean }>((props) => ({
  position: 'relative',
  ...(props.loading && disabled)
}));

export const Spinner = styled(BaseSpinner)({
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate( - 50%,  - 50%)',
  zIndex: 100
});
