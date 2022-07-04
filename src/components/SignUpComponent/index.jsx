import React from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import PropTypes from 'prop-types';
import { loginUser } from "../../services/Login";
import { validateEmail, validatePass } from "../../services/validators";

import './style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/fontawesome-free-6.1.1-web/css/all.css'

function SignUpComponent ({fields,setToken, loginUrl,callbackOnSignIn}){
    const [email,setEmail] = useState("") ;
    const [pass,setPass] = useState("") ;
    const [errorMessages, setErrorMessages] = useState({});
    const [isValidEmail,setIsValidEmail] = useState(false) ;
    const [isValidPass,setIsValidPass] = useState(false) ;

    const salt = bcrypt.genSaltSync(10);

    const handleSubmit = async (  ) => {
        // event.preventDefault();
        console.log(email,pass) ;
        const hashedPass = bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        console.log(hashedPass)
        
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
        const res = validateEmail(event.target.value) ;
        setIsValidEmail(res.verdict) ;
        
        if(!res.test(String(email).toLowerCase()))
            setErrorMessages({name:"email",message:"email invalid"});
        else
            setErrorMessages({})
    }

    const handleChangePass = (event) => {
        setPass(event.target.value) ;

        console.log(event.target.value)
        console.log(/\d+/.test(event.target.value)) ;
    }
    
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error alert-danger">{errorMessages.message}</div>
        );
    
    const renderDiv = (msg,condition,pass) =>{
        if(pass !== "")
            return <div className={condition?"alert alert-success" :"alert alert-danger"}>{condition ? "✓ "+msg : "❌ " +msg}</div>
        return <div></div>
    };


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
                {renderDiv("minimum 8 characters",passLenValid,pass)}
                {renderDiv("at least one uppercase letter",passUpperValid,pass)}
                {renderDiv("at least one lowercase letter",passLowerValid,pass)}
                {renderDiv("at least one number",passNumValid,pass)}
                {renderErrorMessage("pass")}
                
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


SignUpComponent.defaultProps = {
    fields : {
        "email" : validateEmail,
        "password" : validatePass
    }
}

export default SignUpComponent;

SignUpComponent.propTypes = {
    setToken: PropTypes.func.isRequired
}