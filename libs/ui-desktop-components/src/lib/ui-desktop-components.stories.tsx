import { Story, Meta } from '@storybook/react';
import {
  UiDesktopComponents,
  UiDesktopComponentsProps,
} from './ui-desktop-components';

export default {
  component: UiDesktopComponents,
  title: 'UiDesktopComponents',
} as Meta;

const Template: Story<UiDesktopComponentsProps> = (args) => (
  <UiDesktopComponents {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
