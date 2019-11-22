import React, { useState, useEffect } from 'react'
import './style.scss'
import Button from './components/Button/Button';
import UserImage from './components/UserImage/UserImage';

function App() {
  useEffect(() => {
    gapi.load('auth2', function() {
      gapi.auth2.init({
        client_id: '696884255433-2bqml3sef1stao3j378ao0mutb1l2k42.apps.googleusercontent.com'
      }).then(() => {
        getUserSigned()
      }, () => console.log('err'))
    });
  }, [])

  const [signed, setSigned] = useState(false)
  const [user, setUser] = useState({
    name: null,
    imageUrl: null
  })

  const getUserSigned = function() {
    const googleAuthInstance = gapi.auth2.getAuthInstance()
    const isSigned = googleAuthInstance.isSignedIn.get()
    if (isSigned) {
      const basicProfile = googleAuthInstance.currentUser.get().getBasicProfile()
      setSigned(true)
      setUserInfo(basicProfile)
    }
  }

  const setUserInfo = function(basicProfile) {
    setUser({
      name: basicProfile.getName(),
      imageUrl: basicProfile.getImageUrl()
    })
  }

  const clearUserInfo = function() {
    setUser({
      name: null,
      imageUrl: null
    })
  }

  const auth = function() {
    const googleAuthInstance = gapi.auth2.getAuthInstance()

    if (signed) {
      googleAuthInstance.signOut()
        .then(() => {
          setSigned(false)
          clearUserInfo()
        }, () => console.log('Err'))
    } else {
      googleAuthInstance.signIn()
        .then((googleUser) => {
          const basicProfile = googleUser.getBasicProfile()
          setSigned(true)
          setUserInfo(basicProfile)
        }, () => console.log('err'))
    }
  }

  const userImage = user.imageUrl && <UserImage src={user.imageUrl}/>
  const userName = user.name && <h2>{user.name}</h2>

  return (
    <>
      {userImage}
      {userName}
      <Button onClick={auth}>
        {signed ? 'Logout' : 'Login'}
      </Button>
    </>
  )
}

export default App
