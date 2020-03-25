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
  position: 'sticky',
  backgroundColor: Colors.WHITE,
  boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.1) !important'
});
