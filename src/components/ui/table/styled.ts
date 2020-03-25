import { Colors, HTMLTable } from '@blueprintjs/core';
import styled from 'styled-components';

export const BaseTable = styled(HTMLTable)({
  width: '100%',
  position: 'relative',
  borderCollapse: 'collapse'
});

export const TH = styled.th({
  top: 0,
  userSelect: 'none',
  cursor: 'pointer',
  position: 'sticky'
});

export const THBackground = styled.div({
  backgroundColor: Colors.WHITE,
  position: 'absolute',
  width: 'calc(100% - 1px)',
  height: 'calc(100% - 1px)',
  top: '1px',
  left: '1px',
  zIndex: -2
});
