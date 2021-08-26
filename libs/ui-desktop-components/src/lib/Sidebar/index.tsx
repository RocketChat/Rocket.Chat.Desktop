import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
export * from './SidebarButton';
export * from './SidebarFooter';

export interface SidebarProps {
  isVisible?: boolean;
  color?: string;
  background?: string;
  size?: number;
}

export const Sidebar = styled.div<SidebarProps>`

  display: flex;
  align-items: center;
  ${({ size = 68 }) =>
    css`
      flex: 0 0 ${size}px;
      max-width: ${size}px;
    `}
  display: flex;
  flex-direction: column;

  padding-block: 16px;

  user-select: none;
  -webkit-app-region: drag;

  justify-content: space-between;

  border-right: 1px solid ${({ color = '#black' }) => color};

  transition: margin-inline-start 230ms ease-in-out,
    visibility 230ms ease-in-out;

  ${({ background }) =>
    css`
      background: ${background ?? '#2f343d'};
    `}
  ${({ color }) =>
    css`
      color: ${color ?? '#ffffff'};
    `}
	${({ isVisible }) =>
    !isVisible &&
    css`
      margin-inline-start: -68px;
      visibility: hidden;
    `}
`;
