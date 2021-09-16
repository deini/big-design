import { styled } from '@bigcommerce/big-design-theme/stitches';

import { GucciBox } from '../../GucciBox';

export const StyledFlexItem = styled(GucciBox, {
  variants: {
    alignSelf: {
      auto: { alignSelf: 'auto' },
      baseline: { alignSelf: 'baseline' },
      center: { alignSelf: 'center' },
      normal: { alignSelf: 'normal' },
      stretch: { alignSelf: 'stretch' },
      'flex-end': { alignSelf: 'flex-end' },
      'flex-start': { alignSelf: 'flex-start' },
      'self-end': { alignSelf: 'self-end' },
      'self-start': { alignSelf: 'self-start' },
    },
  },
});
