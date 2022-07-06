import React from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import PropTypes from 'prop-types';
import { loginUser } from "../../services/Login";

import './style.css';

function LoginComponent ({setToken, loginUrl,callbackOnSignIn}){
    const [email,setEmail] = useState("") ;
    const [pass,setPass] = useState("") ;
    const [errorMessages, setErrorMessages] = useState({});
    const salt = bcrypt.genSaltSync(10);

    const handleSubmit = async (  ) => {
        // event.preventDefault();
        console.log(email,pass) ;
        // const hashedPass = bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        // console.log(hashedPass)
        
        const token = await loginUser({
            "email" : email,
            "password" : pass
          },loginUrl);
          setToken(token);
        if(!token){
            setErrorMessages({name:"pass",message:"invalid pass"});
        }
        else{
            console.log(token) ;
            callbackOnSignIn() ;
        }
      
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value) ;
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(res.test(String(email).toLowerCase())) ;
        if(!res.test(String(email).toLowerCase()))
            setErrorMessages({name:"email",message:"email invalid"});
        else
            setErrorMessages({})
    }

    const handleChangePass = (event) => {
        setPass(event.target.value) ;
    }
    
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error alert-danger">{errorMessages.message}</div>
        );
    


    return (
        <div className="container p-3">
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">Email address : </label>
                    <input value={email} type="email" name="email" id="form2Example1" className="form-control" onChange={handleChangeEmail} />
                </div>
                {renderErrorMessage("email")}

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">Password : </label>
                    <input value={pass} type="password" name="pass" id="form2Example2" className="form-control" onChange={handleChangePass} />
                </div>
                
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div>
                    </div>

                    <div className="col">
                    <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>

                <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}


LoginComponent.defaultProps = {
    title:"Home Title"
}

export default LoginComponent;

LoginComponent.propTypes = {
    setToken: PropTypes.func.isRequired
}