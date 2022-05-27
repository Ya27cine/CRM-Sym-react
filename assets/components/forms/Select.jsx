import React from 'react';


const Select = ({name,required ='', label = name, children, errors= '', onChange, value}) => {
    return ( <>
            <div className="form-group">
                <label htmlFor="status">{label}</label>
                <select 
                    onChange={onChange}
                    value={value}
                    required={required}
                    name={name} 
                    id={name} 
                    className={"form-control" + (errors && " is-invalid") } >
                        { children }
                </select>
                { errors &&  <p className="invalid-feedback"> {errors} </p>}  
            </div>
    </> );
}
export default Select;
