import React from 'react';


const Field = ({name, label, type='text', value,placeholder, onChange, errors = '', required="" }) => {
    return ( 
    <>
        <div className="from-group">
            <label className="form-label" htmlFor={name}>{label}</label>
            <input 
                name={name} 
                type={type} 
                id={name}
                className={"form-control "+ ( errors && "is-invalid") }  
                placeholder={placeholder || label }
                value={value}
                required={required}
                onChange={onChange}
            />
            { errors &&  <p className="invalid-feedback"> {errors} </p>}              
        </div>
    </> 
    );
}
 
export default Field;