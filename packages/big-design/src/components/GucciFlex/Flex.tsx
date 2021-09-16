import { VariantProps } from '@stitches/react';
import React, { forwardRef } from 'react';

import { GucciBoxProps } from '../GucciBox/GucciBox';

import { StyledFlex } from './styled';

export type FlexProps = GucciBoxProps & VariantProps<typeof StyledFlex>;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawFlex: React.FC<FlexProps & PrivateProps> = ({ as, forwardedRef, ...rest }) => (
  <StyledFlex as={as} ref={forwardedRef} {...rest} />
);

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => <RawFlex {...props} forwardedRef={ref} />);
