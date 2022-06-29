import React from 'react'
import { GoogleLogout } from 'react-google-login'

const clientId = "810852788214-a5mjmk908heu421jco4us44f3g90vllv.apps.googleusercontent.com"

function EmailLogout() {

    const onSuccess = () => {
        console.log("Log out successful!")
    }

  return (
    <div id="signOutButton">
      <GoogleLogout 
      clientId={clientId}
      buttonText={"Logout"}
      onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default EmailLogout
