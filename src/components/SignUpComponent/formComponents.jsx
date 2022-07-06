import React from "react";

function formComponents(){

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
    
}



export default formComponents ;