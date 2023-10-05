import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../inputField/InputField";
import { getAuth } from "../../services/auth";
import './loginForm.css'; 

function LoginForm () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username : '',
        password : '',
    })

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
			if (authorized) {
                navigate('/HomePage');
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
    </div>
    )
}

export default LoginForm;