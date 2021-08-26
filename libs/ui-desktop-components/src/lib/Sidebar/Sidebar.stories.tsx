import { Story, Meta } from '@storybook/react';
import {
  Sidebar,
  SidebarProps
} from '.';

import { SidebarButton } from './SidebarButton';

export default {
  component: Sidebar,
  title: 'Sidebar',
} as Meta;

export const Default: Story<SidebarProps> = (args) => (
  <Sidebar {...args} isVisible>
    <SidebarButton icon='plus'/>
    <SidebarButton icon='plus'/>
    <SidebarButton icon='plus'/>
  </Sidebar>
);
