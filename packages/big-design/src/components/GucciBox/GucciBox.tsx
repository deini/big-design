import { VariantProps } from '@stitches/react';
import React, { forwardRef, HTMLAttributes, memo } from 'react';

import { StyledGucciBox } from './styled';

type StyledVariants = VariantProps<typeof StyledGucciBox>;

export interface GucciBoxProps extends HTMLAttributes<HTMLDivElement>, StyledVariants {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawBox: React.FC<GucciBoxProps & PrivateProps> = ({ forwardedRef, ...props }) => (
  <StyledGucciBox ref={forwardedRef} {...props} />
);

export const GucciBox = memo(
  forwardRef<HTMLDivElement, GucciBoxProps>((props, ref) => <RawBox {...props} forwardedRef={ref} />),
);

GucciBox.displayName = 'GucciBox';
