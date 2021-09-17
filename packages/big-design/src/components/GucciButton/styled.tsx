import { remCalc } from '@bigcommerce/big-design-theme';
import { styled } from '@bigcommerce/big-design-theme/stitches';

import { marginVariants } from '../../variants';

export const StyledButton = styled('button', marginVariants, {
  $$color: '$colors$white',
  $$backgroundColor: '$colors$primary',
  $$borderColor: '$colors$primary',
  $$boxShadowColor: '$colors$primary20',
  $$disabledBgColor: '$colors$primary30',
  $$comboMarginTop: '$space$xSmall',
  $$comboMarginLeft: '$space$xSmall',
  $$width: '100%',
  alignItems: 'center',
  appearance: 'none',
  backgroundColor: '$$backgroundColor',
  border: '$box',
  borderColor: '$$borderColor',
  borderRadius: '$normal',
  color: '$$color',
  cursor: 'pointer',
  display: 'inline-flex',
  flex: 'none',
  fontSize: '$medium',
  fontWeight: '$regular',
  height: remCalc(36),
  justifyContent: 'center',
  lineHeight: '$xLarge',
  outline: 'none',
  padding: '0 $medium',
  position: 'relative',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 150ms ease-out',
  transitionProperty: 'background-color, border-color, box-shadow, color',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  width: '$$width',
  '&:focus': {
    boxShadow: '0 0 0 $space$xxSmall $$boxShadowColor',
    outline: 'none',
  },
  '&[disabled]': {
    pointerEvents: 'none',
  },
  '& + &': {
    marginLeft: '$$comboMarginLeft',
    marginTop: '$$comboMarginTop',
  },
  '@tablet': {
    width: 'auto',
    '& + &': {
      $$comboMarginLeft: '$space$xSmall',
      $$comboMarginTop: '$space$none',
    },
  },
  variants: {
    actionType: {
      normal: {},
      destructive: {},
    },
    iconOnly: {
      true: {
        padding: '0 $xSmall',
      },
    },
    iconLeft: {
      true: {
        paddingLeft: '$xSmall',
      },
    },
    iconRight: {
      true: {
        paddingRight: '$xSmall',
      },
    },
    isLoading: {
      true: {
        pointerEvents: 'none',
      },
      false: {
        pointerEvents: 'auto',
      },
    },
    mobileWidth: {
      auto: {
        $$width: 'auto',
        '& + &': {
          $$comboMarginTop: '$space$none',
          $$comboMarginLeft: '$space$xSmall',
        },
      },
      '100%': {
        '& + &': {
          $$comboMarginTop: '$space$xSmall',
        },
      },
    },
    variant: {
      primary: {
        fontWeight: '$semiBold',
        '&:active': {
          $$backgroundColor: '$colors$primary60',
        },
        '&:hover:not(:active)': {
          $$backgroundColor: '$colors$primary50',
        },
        '&[disabled]': {
          $$backgroundColor: '$colors$secondary30',
          $$borderColor: '$colors$secondary30',
        },
      },
      secondary: {
        $$backgroundColor: '$colors$transparent',
        $$borderColor: '$colors$primary',
        $$color: '$colors$primary',
        '&:active': {
          $$backgroundColor: '$colors$primary20',
        },
        '&:hover:not(:active)': {
          $$backgroundColor: '$colors$primary10',
        },
        '&[disabled]': {
          $$borderColor: '$colors$secondary30',
          $$color: '$colors$secondary30',
        },
      },
      subtle: {
        $$backgroundColor: '$colors$transparent',
        $$borderColor: '$colors$transparent',
        $$color: '$colors$primary',
        '&:active': {
          $$backgroundColor: '$colors$primary20',
        },
        '&:hover:not(:active)': {
          $$backgroundColor: '$colors$primary10',
        },
        '&[disabled]': {
          $$borderColor: '$colors$transparent',
          $$color: '$colors$secondary30',
        },
      },
    },
  },
  compoundVariants: [
    {
      actionType: 'destructive',
      variant: 'primary',
      css: {
        $$backgroundColor: '$colors$danger',
        $$borderColor: '$colors$danger',
        '&:active': {
          $$backgroundColor: '$colors$danger60',
        },
        '&:focus': {
          $$boxShadowColor: '$colors$danger20',
        },
        '&:hover:not(:active)': {
          $$backgroundColor: '$colors$danger50',
        },
      },
    },
    {
      actionType: 'destructive',
      variant: 'secondary',
      css: {
        $$borderColor: '$colors$danger',
        $$color: '$colors$danger',
        '&:active': {
          $$backgroundColor: '$colors$danger20',
        },
        '&:focus': {
          $$boxShadowColor: '$colors$danger20',
        },
        '&:hover:not(:active)': {
          $$backgroundColor: '$colors$danger10',
        },
      },
    },
    {
      actionType: 'destructive',
      variant: 'subtle',
      css: {
        $$color: '$colors$danger',
        '&:active': {
          $$backgroundColor: '$colors$danger20',
        },
        '&:focus': {
          $$boxShadowColor: '$colors$danger20',
        },
        '&:hover:not(:active)': {
          $$backgroundColor: '$colors$danger10',
        },
      },
    },
  ],
  defaultVariants: {
    actionType: 'normal',
    isLoading: false,
    mobileWidth: '100%',
    variant: 'primary',
  },
});

export const ContentWrapper = styled('span', {
  alignContent: 'center',
  alignItems: 'center',
  display: 'inline-grid',
  gridAutoFlow: 'column',
  gridGap: '$xSmall',
  variants: {
    isLoading: {
      true: {
        visibility: 'hidden',
      },
      false: {
        visibility: 'visible',
      },
    },
  },
});

// TODO: Convert to Flex
export const LoadingSpinnerWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  position: 'absolute',
});
