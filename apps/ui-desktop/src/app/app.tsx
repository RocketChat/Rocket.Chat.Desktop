import { HashRouter, Route, Switch, useHistory, Link } from "react-router-dom";
import { Sidebar, SidebarButton, SidebarGroup } from '@rocket.chat.desktop/ui-desktop-components';
import { Box } from '@rocket.chat/fuselage';
import { FC } from 'react';

import { IpcStateRenderer } from '@rocket.chat.desktop/ipc-state';
import { forwardRef } from "react";

const state = new IpcStateRenderer<{
  servers: unknown[];
}>('servers', new Map(Object.entries({'servers': [] })) as any);

state.on('change', (state: any) => {
  console.log(state);
});


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


const SidebarLink = forwardRef((props, ref) => (
  <SidebarButton ref={ref} {...props} />
))
export function App() {
  return (
    <HashRouter>
      <SafeDragZone>
        <Sidebar isVisible>
          <SidebarGroup>
            { process.platform === 'darwin' && <Box h='x16' width='full' /> }
            <Link component={SidebarLink} { ...{ icon: 'plus' } as any } to='/add'/>
          </SidebarGroup>
          <SidebarGroup>
            <Link component={SidebarLink} { ...{ icon:'cog'} as any} to='/settings' />
            <Link component={SidebarLink} { ...{ icon:'download'} as any} to='/downloads'/>
          </SidebarGroup>
        </Sidebar>
        <Box display='flex' flexGrow={1} elevation={"1"}>
          <Box is='webview' flexGrow={1}  src='https://open.rocket.chat' />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/settings" component={Settings}/>
            <Route exact path="/downloads" component={Downloads}/>
          </Switch>
        </Box>
      </SafeDragZone>
    </HashRouter>
  );
}


function Home() {
  return <Box position='fixed' width='100%' height='100%'>Home</Box>;
}

function Settings() {
  return <Box position='fixed' width='100%' height='100%'>Settings</Box>;
}

function Downloads() {
  return <Box position='fixed' width='100%' height='100%'>Downloads</Box>;
}

export default App;
