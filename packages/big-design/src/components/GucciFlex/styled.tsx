import { styled } from '@bigcommerce/big-design-theme/stitches';

import { displayVariants } from '../../variants';
import { GucciBox } from '../GucciBox';

export const StyledFlex = styled(
  GucciBox,
  {
    display: 'flex',

    variants: {
      alignContent: {
        baseline: { alignContent: 'baseline' },
        center: { alignContent: 'center' },
        end: { alignContent: 'end' },
        normal: { alignContent: 'normal' },
        start: { alignContent: 'start' },
        stretch: { alignContent: 'stretch' },
        'flex-end': { alignContent: 'flex-end' },
        'flex-start': { alignContent: 'flex-start' },
        'space-around': { alignContent: 'space-around' },
        'space-between': { alignContent: 'space-between' },
        'space-evenly': { alignContent: 'space-evenly' },
      },
      alignItems: {
        baseline: { alignItems: 'baseline' },
        center: { alignItems: 'center' },
        end: { alignItems: 'end' },
        normal: { alignItems: 'normal' },
        start: { alignItems: 'start' },
        stretch: { alignItems: 'stretch' },
        'flex-end': { alignItems: 'flex-end' },
        'flex-start': { alignItems: 'flex-start' },
        'self-end': { alignItems: 'self-end' },
        'self-start': { alignItems: 'self-start' },
      },
      flexDirection: {
        column: { flexDirection: 'column' },
        columnReverse: { flexDirection: 'column-reverse' },
        row: { flexDirection: 'row' },
        rowReverse: { flexDirection: 'row-reverse' },
      },
      flexWrap: {
        nowrap: { flexWrap: 'nowrap' },
        wrap: { flexWrap: 'wrap' },
        wrapReverse: { flexWrap: 'wrap-reverse' },
      },
      justifyContent: {
        baseline: { justifyContent: 'baseline' },
        center: { justifyContent: 'center' },
        end: { justifyContent: 'flex-end' },
        left: { justifyContent: 'left' },
        normal: { justifyContent: 'normal' },
        right: { justifyContent: 'right' },
        start: { justifyContent: 'flex-start' },
        stretch: { justifyContent: 'stretch' },
        'flex-end': { justifyContent: 'flex-end' },
        'flex-start': { justifyContent: 'flex-start' },
        'space-around': { justifyContent: 'space-around' },
        'space-between': { justifyContent: 'space-between' },
        'space-evenly': { justifyContent: 'space-evenly' },
      },
    },
  },
  displayVariants,
);
