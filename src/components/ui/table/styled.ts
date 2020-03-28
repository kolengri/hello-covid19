import { Colors, HTMLTable } from '@blueprintjs/core';
import styled from 'styled-components';

export const BaseTable = styled(HTMLTable)({
  width: '100%',
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
  top: 0,
  left: '1px',
  zIndex: -2
});

export const TableWrapper = styled.div`
  /* https://www.smashingmagazine.com/2019/01/table-design-patterns-web/#style-the-scroll */
  /* position: relative;
  overflow-y: hidden;
  overflow-x: auto;
  max-width: 100%;
  margin-top: 0px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;

  background: linear-gradient(to right, white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(farthest-side at 0% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-position: 0 0, 100%, 0 0, 100%;
  background-attachment: local, local, scroll, scroll;
  && {
    > table {
      background: none;
    }
  } */
`;
