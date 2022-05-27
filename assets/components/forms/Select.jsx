import React from 'react';


const Select = ({name, label = name, children, errors, onChange, value}) => {
    return ( <>
            <div className="form-group">
                <label htmlFor="status">{label}</label>
                <select 
                    onChange={onChange}
                    value={value}
                    name={name} 
                    id={name} 
                    className={"form-control" + (errors && " is-valide") } >
                        { children }
                </select>
                { errors &&  <p className="invalid-feedback"> {errors} </p>}  
            </div>
    </> );
}
export default Select;
