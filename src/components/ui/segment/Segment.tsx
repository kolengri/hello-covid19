import * as React from 'react';

import { Card, ICardProps } from '@blueprintjs/core';

import { Outer, Spinner } from './styled';

export type SegmentProps = {
  loading?: boolean;
  simple?: boolean;
  disabled?: boolean;
} & ICardProps;

const SegmentMemo: React.FC<SegmentProps> = (props) => {
  const { loading, children, simple, disabled, className, ...otherProps } = props;

  return (
    <Outer loading={loading}>
      {loading && <Spinner size={Spinner.SIZE_SMALL} />}
      {simple && <div>{children}</div>}
      {!simple && <Card {...otherProps}>{children}</Card>}
    </Outer>
  );
};

export const Segment = React.memo(SegmentMemo);

export default Segment;
