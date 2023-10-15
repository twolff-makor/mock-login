import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components";
import { getAuth } from "../../services/auth";
import './loginPage.css'; 

function LoginPage () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username : '',
        password : '',
    })
    const [passwordError, setPasswordError] = useState(false)

    const handleInputChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData (prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleSubmit = async (event) => {
			event.preventDefault();
      const authorized = await getAuth(formData.username, formData.password)
			if (authorized === 'authorized') {
                navigate('/HomePage');
          } 
      else if (authorized === '2fa') {
                localStorage.setItem('USERNAME', formData.username)
                localStorage.setItem('PASSWORD', formData.password)
                navigate('/TwoFaPage')
      } else {
        setPasswordError(true);
      }
		};

    return (
        <div className="form-container">
      <form onSubmit={handleSubmit}>
        <InputField 
          label="Username" 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleInputChange} 
        />
        
        <InputField 
          label="Password" 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleInputChange} 
        />
        <input type="submit" value="Submit" className="submit-btn"/>
      </form>
      <div className={passwordError ? "password-alert" : "password-alert-hidden"}>
        Wrong Credentials
      </div>
    </div>
    )
}

export default LoginPage;
