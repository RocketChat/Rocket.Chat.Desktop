import { FC } from 'react';
import { Button, Icon } from "@rocket.chat/fuselage";

export const SidebarButton: FC<{
  icon?: string;
}> = ({ icon, ...props }) => {
  return (
    <Button
      nude
      is="button"
      size={44}
      bg='transparent'
      justifyContent='center'
      alignItems='center'
      display='flex'
      {...props}
      >
        { icon && <Icon color='surface' size='x24' name={icon} /> }
    </Button>)
}
