// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "../../services/auth";
// import { InputField } from "../../components";
import { useState } from 'react';
import './twoFaPage.css';
import { getTwoFa } from '../../services/twoFa';

function TwoFaPage() {
	const [isEmailAuth, setIsEmailAuth] = useState(false);
	const [isSmsAuth, setIsSmsAuth] = useState(false);
	const authEmail = localStorage.getItem('TWO_FA_EMAIL');
	const authSms = localStorage.getItem('TWO_FA_SMS');
    const authUsername = localStorage.getItem('USERNAME')
    const authPassword = localStorage.getItem('PASSWORD')

    const handleAuthEmail = (event) => {
        console.log(authUsername);
        console.log(authPassword);
        event.preventDefault()
        // getTwoFa(authUsername, authPassword, 'email_confirm')
        setIsEmailAuth(true)
    }

    const handleAuthSms = (event) => {
        event.preventDefault()
        getTwoFa(authUsername, authPassword, 'sms_confirm')
        setIsSmsAuth(true)
    }


	return (
		<div className="two-fa-container">
			<title>
				<h3>Authentication</h3>
			</title>
			{!isEmailAuth && !isSmsAuth && (
				<>
					<button className="two-fa-btn" onClick={handleAuthEmail}>
						Via email <br />
						{authEmail}
					</button>
					<button className="two-fa-btn" onClick={handleAuthSms}>
						Via SMS <br />
						{authSms}
					</button>
				</>
			)}
            {isEmailAuth && 
                <div className="email-auth"></div>
            }
            {isSmsAuth && 
                <div className='sms-auth'></div>
            }
		</div>
	);
}

export default TwoFaPage;
