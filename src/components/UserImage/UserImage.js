import React from 'react'
import './UserImage.scss'

function UserImage({
  src
}) {
  return (
    <div className='user-image'>
      <img src={src} alt='user pic'/>
    </div>
  )
}

export default UserImage
