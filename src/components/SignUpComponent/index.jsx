import React, { useEffect } from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import PropTypes from 'prop-types';
import { loginUser } from "../../services/Login";
import { validateEmail, validatePass } from "../../services/validators";

import './style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/fontawesome-free-6.1.1-web/css/all.css'

function SignUpComponent ({fields,setToken,loginUrl,callbackOnSignIn}){
    const [errorMessages, setErrorMessages] = useState({});
    const [formComponents,setFormComponents] = useState([]) ;
    const [inputFields,setInputFields] = useState({})

    const renderDiv = (msg,condition) => {
        return <div className={condition?"alert alert-success" :"alert alert-danger"}>{condition ? "✓ "+msg : "❌ " +msg}</div>
    };

    const handleChangeField = (event,fieldName) => {
        let temp = inputFields ;
        temp[fieldName].value = event.target.value ;
        setInputFields(temp);

        const res = inputFields[fieldName].validator(event.target.value) ;

        const errors = errorMessages ;
        errors[fieldName] = [] ;
        for(let check in res.checks){
            errors[fieldName].push(renderDiv(check,res.checks[check]))
        }
        console.log(res.checks) ;
        console.log(errorMessages[fieldName]) ;
        console.log(errors[fieldName]) ;
        console.log(formComponents) ;
        setErrorMessages(errors) ;
    }


    useEffect(() => {
        let i = 0 ;
        const tempFormComponents = [] ;
        for(let [fieldName,validator] of Object.entries(fields)){

            let temp = inputFields ;
            temp[fieldName] = {
                "name" : fieldName,
                "value" : "",
                "validator" : validator 
            }
            setInputFields(temp);
            tempFormComponents.push(
                <div key={i++}>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor={fieldName}> {fieldName} </label>
                        <input type="text" name={fieldName} id={fieldName} className="form-control" onChange={(event) => {handleChangeField(event,fieldName)}} />
                    </div>
                    {errorMessages[fieldName]}
                </div>
            )
            
        }
        setFormComponents(tempFormComponents)
    },[])

    

    // const [isValidEmail,setIsValidEmail] = useState(false) ;
    // const [isValidPass,setIsValidPass] = useState(false) ;

    // const salt = bcrypt.genSaltSync(10);

    const handleSubmit = async (  ) => {
        // // event.preventDefault();
        // console.log(email,pass) ;
        // const hashedPass = bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        // console.log(hashedPass)
        
        // const token = await loginUser({
        //     "email" : email,
        //     "password" : pass
        //   },loginUrl);
        //   setToken(token);
        // if(!token){
        //     setErrorMessages({name:"pass",message:"invalid pass"});
        // }
        // else{
        //     console.log(token) ;
        //     callbackOnSignIn() ;
        // }
      
    }

    // const handleChangeEmail = (event) => {
    //     setEmail(event.target.value) ;
    //     const res = validateEmail(event.target.value) ;
    //     setIsValidEmail(res.verdict) ;
        
    //     if(!res.verdict)
    //         setErrorMessages({name:"email",message:"email invalid"});
    //     else
    //         setErrorMessages({})
    // }

    // const handleChangePass = (event) => {
    //     setPass(event.target.value) ;

    //     console.log(event.target.value)
    //     console.log(/\d/.test(event.target.value)) ;
    // }
    
    console.log(formComponents) ;
    
    return (
        <div className="container p-3">
            <form onSubmit={handleSubmit}>
                <div>
                    {formComponents}
                </div>
        
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked onChange={()=>{}} />
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