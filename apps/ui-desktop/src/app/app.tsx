import { Sidebar, SidebarButton, SidebarGroup } from '@rocket.chat.desktop/ui-desktop-components';
import { Box } from '@rocket.chat/fuselage';
import { FC } from 'react';

const style = {
  WebkitAppRegion: 'drag',
} as React.CSSProperties;

const SafeDragZone: FC = process.platform === 'darwin' ?
({ children }) => <>
<Box position='fixed' h='x16' width='full' style={style} />
{children}
</> :
  // eslint-disable-next-line react/jsx-no-useless-fragment
  ({ children }) => <>{children}</>;

const SafeZone: FC = process.platform === 'darwin' ?
  ({ children }) => <>
  <Box pbs='x16' mbs='neg-x16' width='full' style={style} />
  {children}
  </> :
    // eslint-disable-next-line react/jsx-no-useless-fragment
    ({ children }) => <>{children}</>;
export function App() {
  return (
    <SafeDragZone>
      <Sidebar isVisible>
        <SidebarGroup>
          { process.platform === 'darwin' && <Box h='x16' width='full' /> }
          <SidebarButton icon='plus'/>
          <SidebarButton icon='plus'/>
          <SidebarButton icon='plus'/>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarButton icon='cog'/>
          <SidebarButton icon='download'/>
        </SidebarGroup>
      </Sidebar>
      <Box is='webview' flexGrow={1} src='https://open.rocket.chat' elevation={"1"} />
    </SafeDragZone>
  );
}

export default App;
