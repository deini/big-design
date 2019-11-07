import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { memo, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { ProgressCircle } from '../ProgressCircle';

import { ContentWrapper, LoadingSpinnerWrapper, StyledButton } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLButtonElement>;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, MarginProps {
  actionType?: 'normal' | 'destructive';
  iconLeft?: React.ReactChild;
  iconOnly?: React.ReactChild;
  iconRight?: React.ReactChild;
  isLoading?: boolean;
  theme?: ThemeInterface;
  variant?: 'primary' | 'secondary' | 'subtle';
}

const RawButton: React.FC<ButtonProps & PrivateProps> = /*#__PURE__*/ memo(({ forwardedRef, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { disabled, isLoading, onClick } = props;

    if (onClick && !disabled && !isLoading) {
      onClick(event);
    }
  };

  const renderLoadingSpinner = () => {
    return (
      <LoadingSpinnerWrapper alignItems="center">
        <ProgressCircle size="xSmall" />
      </LoadingSpinnerWrapper>
    );
  };

  return (
    <StyledButton className="bd-button" role="button" tabIndex={0} {...props} onClick={handleClick} ref={forwardedRef}>
      {props.isLoading ? renderLoadingSpinner() : null}
      <ContentWrapper isLoading={props.isLoading} theme={props.theme}>
        {!props.iconOnly && props.iconLeft}
        {props.iconOnly}
        {!props.iconOnly && props.children}
        {!props.iconOnly && props.iconRight}
      </ContentWrapper>
    </StyledButton>
  );
});

const defaultProps = {
  actionType: 'normal' as 'normal',
  isLoading: false,
  variant: 'primary' as 'primary',
};

export const StyleableButton = /*#__PURE__*/ (() => {
  const InternalStyleableButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <RawButton {...props} forwardedRef={ref} />
  ));

  InternalStyleableButton.displayName = 'StyleableButton';
  InternalStyleableButton.defaultProps = { ...defaultProps };

  return InternalStyleableButton;
})();

export const Button = /*#__PURE__*/ (() => {
  const InternalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, style, ...props }, ref) => (
    <RawButton {...props} forwardedRef={ref} />
  ));

  InternalButton.displayName = 'Button';
  InternalButton.defaultProps = { ...defaultProps };

  return InternalButton;
})();
