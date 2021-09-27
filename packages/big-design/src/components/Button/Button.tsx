import React, { ButtonHTMLAttributes, forwardRef, memo, Ref } from 'react';

import { typedMemo } from 'src/utils';

import { MarginProps } from '../../mixins';
import { ProgressCircle } from '../ProgressCircle';

import { ContentWrapper, LoadingSpinnerWrapper, StyledButton } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLButtonElement>;
}

export interface ButtonProps<T extends React.ElementType> extends MarginProps {
  as?: T;
  children?: React.ReactNode;
  actionType?: 'normal' | 'destructive';
  iconLeft?: React.ReactNode;
  iconOnly?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  mobileWidth?: 'auto' | '100%';
  variant?: 'primary' | 'secondary' | 'subtle';
}

type RawButtonProps<T extends React.ElementType> = ButtonProps<T> &
  PrivateProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>;

const RawButton = typedMemo(
  <T extends React.ElementType = 'button'>({ as, forwardedRef, ...props }: RawButtonProps<T>) => {
    const Component: React.ElementType = as || 'button';

    const handleClick = (event: React.MouseEvent) => {
      const { disabled, isLoading, onClick } = props;

      if (onClick && !disabled && !isLoading) {
        onClick(event);
      }
    };

    const renderLoadingSpinner = () => {
      return (
        <LoadingSpinnerWrapper alignItems="center">
          <ProgressCircle size="xxSmall" />
        </LoadingSpinnerWrapper>
      );
    };

    return (
      <StyledButton as={Component} className="bd-button" {...props} onClick={handleClick} ref={forwardedRef}>
        {props.isLoading ? renderLoadingSpinner() : null}
        <ContentWrapper isLoading={props.isLoading}>
          {!props.iconOnly && props.iconLeft}
          {props.iconOnly}
          {!props.iconOnly && props.children}
          {!props.iconOnly && props.iconRight}
        </ContentWrapper>
      </StyledButton>
    );
  },
);

// export const StyleableButton = forwardRef<HTMLElement, ButtonProps>((props, ref) => (
export const StyleableButton = forwardRef(
  <T extends React.ElementType>(props: ButtonProps<T>, ref: Ref<HTMLButtonElement>) => (
    <RawButton {...props} forwardedRef={ref} />
  ),
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, style, ...props }, ref) => (
  <RawButton {...props} forwardedRef={ref} />
));

const defaultProps = {
  actionType: 'normal' as const,
  isLoading: false,
  mobileWidth: '100%' as const,
  variant: 'primary' as const,
};

Button.displayName = 'Button';
Button.defaultProps = { ...defaultProps };

StyleableButton.displayName = 'StyleableButton';
StyleableButton.defaultProps = { ...defaultProps };
