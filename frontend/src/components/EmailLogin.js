import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientId = "810852788214-a5mjmk908heu421jco4us44f3g90vllv.apps.googleusercontent.com"

function EmailLogin() {

  const onFailure = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
  };

  const onSuccess = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            ></GoogleLogin>
        </div>
    )
}

export default EmailLogin
