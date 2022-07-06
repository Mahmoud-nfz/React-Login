import React, { useEffect } from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import PropTypes from 'prop-types';
import { registerUser } from "../../services/SignUp";
import { validateEmail, validatePass } from "../../services/validators";

import './style.css';

function SignUpComponent ({fields,setToken,loginUrl,callbackOnSignIn}){
    const [errorMessages, setErrorMessages] = useState({});
    // const errorMessagesRef = useRef(errorMessages) ;
    // const setErrorMessages = data => {
    //     errorMessages = data;
    //     _setErrorMessages(data);
    // };

    const [formComponents,setFormComponents] = useState([]) ;
    const [inputFields,setInputFields] = useState({});
    const [ee,setee] = useState() ;
    const [submitError,setSubmitError] = useState() ;

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
        setErrorMessages(errors) ;
        setee(Math.random()) ;
        if(submitError){
            setSubmitError(null) ;
        }
    }

    useEffect(() => {
        for(let [fieldName,validator] of Object.entries(fields)){

            let temp = inputFields ;
            temp[fieldName] = {
                "name" : fieldName,
                "value" : "",
                "validator" : validator 
            }
            setInputFields(temp);            
        }
        setee(Math.random()) ;
    },[])

    useEffect(() => {
        const tempFormComponents = []
        let i = 0 ;
        for(let [fname, field] of Object.entries(inputFields)){

            const res = field.validator(field.value) ;
            let e = errorMessages ;
            e[field.name] = [] ;
            for(let check in res.checks){
                e[field.name].push(renderDiv(check,res.checks[check]))
            }
            setErrorMessages(e) ;

            tempFormComponents.push(
                <div key={i++}>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor={field.name}> {field.name} </label>
                        <input type={(["password","confirmPassword"].includes(field.name) ) ? "password" : "text"} name={field.name} id={field.name} className="form-control" onChange={(event) => {handleChangeField(event,field.name)}} />
                    </div>
                    {errorMessages[field.name]}
                </div>
            )
            
        }
        setFormComponents(tempFormComponents)
    },[ee])
    
    // const salt = bcrypt.genSaltSync(10);

    const handleSubmit = async (  ) => {
        console.log("submitted")

        // // event.preventDefault();
        
        const data = {} ;

        console.log(inputFields) ;


        for(let [fname,field] of Object.entries(inputFields)){
            if(!field.validator(field.value).verdict){
                setSubmitError(renderDiv("invalid field responses",false)) ;
                return ;
            }
            data[fname] = field.value ;
        }

        // const hashedPass = bcrypt.hashSync(pass, salt)
        // console.log(hashedPass)
        
        const token = await registerUser(data,loginUrl);
        setToken(token);
        
        // if(!token){
        //     setErrorMessages({name:"pass",message:"invalid pass"});
        // }
        // else{
        //     console.log(token) ;
        //     callbackOnSignIn() ;
        // }      
    }
    
    
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

                {submitError}

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
        "password" : validatePass,
        "confirmPassword" : (input) => ({verdict : true, cheks : {}}),
        "ddzcxasdsasdas" : (input) => ({verdict : true, cheks : {}}),
        "etwyut" : (input) => ({verdict : true, cheks : {}}) 
    }
}

export default SignUpComponent;

SignUpComponent.propTypes = {
    setToken: PropTypes.func.isRequired
}