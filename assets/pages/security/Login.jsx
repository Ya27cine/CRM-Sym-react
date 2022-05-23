import React, {useState} from 'react';

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handlChange =  (e) => {
        let name = e.currentTarget.name
        let value = e.currentTarget.value
        setCredentials({ ...credentials, [name]: value})
    }

    const submit = (e) => {
        e.preventDefault();
        console.log( credentials )
    }

    return ( 
        <>
          <form onSubmit={submit}>
              <h1>Login</h1>
                <div className="from-group">
                     <label className="form-label" htmlFor="_email">Email address</label>
                    <input name="email" type="email" id="_email" className="form-control"  placeholder="example@email.com" 
                        value={credentials.email}
                        onChange={handlChange}
                    />
                </div>

                <div className="from-group">
                    <label className="form-label" htmlFor="_password">Password</label>
                    <input name="password" type="password" id="_password" className="form-control"  placeholder="password ..." 
                         value={credentials.password}
                         onChange={handlChange}
                    />
                </div>

                <button type="submit"  className="btn btn-success btn-block mt-3">Sign in</button>

            </form>
        </>
     );
}
 
export default Login;
