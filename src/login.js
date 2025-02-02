import React from 'react'
import { useState } from 'react'
import axios from 'axios';


const Login = () => {

    const [values,setvalues] = useState({
        email : "",
        password : ""
    });
    const[apiMessage,setApiMessage]=useState("");
    const handleInputs = (eve)=>{
        setvalues({...values,[eve.target.name]:eve.target.value})
    };
    
 
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:1234/trylogin",values)
            console.log(response.data);
            setApiMessage("Login Successfull...")
            // setTimeout(()=>navigate("/dashboard"),1000)
    
        }catch(err){
            console.error("API error:",err.message);
            setApiMessage(
                err.message?.data?.message || "An Error Occurred During Login"
            )
        }
    
    }
  return (
    <>

<div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleInputs}
                    value={values.email}
                  />
                  {/* {errors.email && <span className="text-danger">{errors.email}</span>} */}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputs}
                    value={values.password}
                  />
                  {/* {errors.password && <span className="text-danger">{errors.password}</span>} */}
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              {apiMessage && <p className="text-center mt-3">{apiMessage}</p>}
              <div className="mt-3 text-center">
                <button
                  className="btn btn-link"
                //   onClick={() => navigate("/signup")}
                >
                  Don't have an account? Signup here.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Login