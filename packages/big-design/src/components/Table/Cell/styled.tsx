import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { CellProps } from './Cell';

interface SharedCellProps extends CellProps {
  stickyHeader?: boolean;
}

// Applied to all cells
const SharedCellStyles = css<SharedCellProps>`
  box-sizing: border-box;

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      vertical-align: ${verticalAlign};
    `};

  ${({ width }) =>
    width !== undefined &&
    css`
      width: ${typeof width === 'string' ? width : width + 'px'};
    `};
`;

// Applied to all default cells (used when passing content as string)
const SharedDefaultCellStyles = css<SharedCellProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  line-height: ${({ theme }) => theme.lineHeight.small};
  min-height: ${({ theme }) => theme.spacing.xxxLarge};
  padding: ${({ theme }) => theme.spacing.small};

  ${props =>
    props.isCheckbox &&
    css`
      width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
      white-space: nowrap;
    `};
`;

export const StyledDefaultTableHeader = styled.th<SharedCellProps>`
  ${SharedCellStyles}
  ${SharedDefaultCellStyles}

  background-color: ${({ theme }) => theme.colors.secondary10};
  box-shadow: ${({ theme }) =>
    `inset 0px -1px 0px ${theme.colors.secondary30}, inset 0px 1px 0px ${theme.colors.secondary30}`};
  color: ${({ theme }) => theme.colors.secondary60};
  white-space: nowrap;

  ${props =>
    props.stickyHeader &&
    css`
      position: sticky;
      top: 0;
    `}
`;

export const StyledDefaultTableCell = styled.td<SharedCellProps>`
  ${SharedCellStyles}
  ${SharedDefaultCellStyles}

  color: ${({ theme }) => theme.colors.secondary70};
`;

export const StyledCustomTableCell = styled.td<SharedCellProps>`
  ${SharedCellStyles}
`;
export const StyledCustomTableHead = styled.th<SharedCellProps>`
  ${SharedCellStyles}
`;

StyledDefaultTableHeader.defaultProps = { theme: defaultTheme };
StyledDefaultTableCell.defaultProps = { theme: defaultTheme };
StyledCustomTableCell.defaultProps = { theme: defaultTheme };
StyledCustomTableHead.defaultProps = { theme: defaultTheme };
