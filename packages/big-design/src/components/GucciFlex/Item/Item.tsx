import { VariantProps } from '@stitches/react';
import React, { forwardRef } from 'react';

import { responsiveHelper, StitchesResponsiveProps } from '../../../utils/stitchesResponsive';
import { GucciBoxProps } from '../../GucciBox';

import { StyledFlexItem } from './styled';

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

export type FlexItemProps = GucciBoxProps &
  VariantProps<typeof StyledFlexItem> & {
    flexGrow?: StitchesResponsiveProps<'flexGrow'>;
    flexOrder?: StitchesResponsiveProps<'order'>;
    flexShrink?: StitchesResponsiveProps<'flexShrink'>;
    flexBasis?: StitchesResponsiveProps<'flexBasis'>;
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
  const className = responsiveHelper({
    flexGrow,
    flexShrink,
    flexBasis,
    order: flexOrder,
  });

  return <StyledFlexItem ref={forwardedRef} className={className} as={as} {...props} />;
};

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => (
  <RawFlexItem {...props} forwardedRef={ref} />
));
