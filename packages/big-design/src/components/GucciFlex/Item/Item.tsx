import { VariantProps } from '@stitches/react';
import React, { forwardRef, useMemo } from 'react';

import { GucciBoxProps } from '../../GucciBox';

import { StyledFlexItem } from './styled';

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

export type FlexItemProps = GucciBoxProps &
  VariantProps<typeof StyledFlexItem> & {
    flexGrow?: number;
    flexOrder?: number;
    flexShrink?: number;
    flexBasis?: 'auto' | 'fill' | 'min-content' | 'max-content' | 'fit-content' | 'content' | string;
  };

const RawFlexItem: React.FC<FlexItemProps & PrivateProps> = ({
  as,
  forwardedRef,
  flexBasis,
  flexGrow,
  flexOrder,
  flexShrink,
  ...props
}) => {
  const styles = useMemo(
    () => ({
      flexGrow,
      flexOrder,
      flexShrink,
      flexBasis,
    }),
    [flexGrow, flexOrder, flexShrink, flexBasis],
  );

  return <StyledFlexItem ref={forwardedRef} as={as} styles={styles} {...props} />;
};

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => (
  <RawFlexItem {...props} forwardedRef={ref} />
));
