import { FC, ComponentProps, forwardRef } from 'react';
import { Button, Icon } from "@rocket.chat/fuselage";

export const SidebarButton = forwardRef<unknown, {
  icon?: string;
} & ComponentProps<typeof Button>>(({ icon, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      nude
      is="a"
      size={44}
      bg='transparent'
      justifyContent='center'
      alignItems='center'
      display='flex'
      {...props}
      >
        { icon && <Icon color='surface' size='x24' name={icon} /> }
    </Button>)
});
