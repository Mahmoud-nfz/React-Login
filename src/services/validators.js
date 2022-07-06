function validateEmail(input){
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checks = {} ;
    checks["is a valid email adress"] =  res.test(String(input).toLowerCase()) ;
    let verdict = res.test(String(input).toLowerCase()) ;
    return {
        verdict,
        checks 
    } ;
}

function validatePass(input){
    const checks = {} ;
    checks["minimum 8 characters"] = input.length >= 8 ;
    checks["at least one lowercase letter"] = input.toUpperCase() !== input ;
    checks["at least one uppercase letter"] = input.toLowerCase() !== input ;
    checks["at least one number"] = /\d/.test(input) ;

    let verdict = true ;
    for (let key in verdict) {
        verdict &= checks[key] ;
    }
    return {
        verdict,
        checks
    } ;
}

module.exports = {
    validateEmail,
    validatePass
}