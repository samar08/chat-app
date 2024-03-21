import React from 'react'
import { Avatar } from 'rsuite'
import UserIcon from '@rsuite/icons/legacy/User';
const ProfileAvatar = ({...avatarProps}) => {
  return (
   <Avatar circle {...avatarProps}>
    <UserIcon/>
   </Avatar>
  )
}

export default ProfileAvatar
