const Validation = (values) => {
    let error = {};
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!values.email) {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email.trim())) {
      error.email = "Invalid email format";
    }
  
    if (!values.password) {
      error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      error.password = "Password credentials do not match the required format";
    }
  
    return error;
  };
  
  export default Validation;
  