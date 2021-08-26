import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface UiDesktopComponentsProps {}

const StyledUiDesktopComponents = styled.div`
  color: pink;
`;

export function UiDesktopComponents(props: UiDesktopComponentsProps) {
  return (
    <StyledUiDesktopComponents>
      <h1>Welcome to UiDesktopComponents!</h1>
    </StyledUiDesktopComponents>
  );
}

export default UiDesktopComponents;
