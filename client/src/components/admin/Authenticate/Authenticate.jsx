import React , {useEffect} from 'react'
import jwt_decode from 'jwt-decode'

import Logo from './gymkhana.png'
import './Authenticate.css'

import { useDispatch } from "react-redux";
import { googlelogin } from '../../../api';
import { loginAdmin } from '../../../redux/actions/adminAuth';

export default function Authenticate() {

    const dispatch = useDispatch()

    function handleCallbackResponse(response){

        var userObject = jwt_decode(response.credential)
        console.log(userObject)

        googlelogin({
            emailId : userObject.email
        }).then(response => {
            console.log(response)
            if (response.status === 201) {
                localStorage.setItem('token', response.data.authData.token)
                dispatch(loginAdmin())
            }
        })
    }

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id:"687468938838-qv69j02oai1engmjkd6el428ui4uquom.apps.googleusercontent.com",
            callback : handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme : "outline" , size : "large"}
        )
    },[])


    console.log(window.location.origin)

    return (
        <div className="bggg">
            <div className="wrapper fadeInDown">
            <div id="formContent">

                <div className="fadeIn first">
                    <img src={Logo} alt="Logo" height={90}/>
                </div>
                <br></br>

                <h4 className="fadeIn second">Hey, good to see you again!</h4>
                <p className="fadeIn third">Login to get going.</p>
                <br></br>
                <div id="signInDiv"></div>
                <br/><br/>
                <p className="fadeIn fourth">Please Use College ID</p>

            </div>
            </div>

        </div>
    )
}
