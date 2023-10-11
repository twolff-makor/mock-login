import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getTwoFa, setTwoFa } from '../../services/twoFa';
import { InputField } from '../../components';
import './twoFaPage.css';

function TwoFaPage() {
	const [isEmailAuth, setIsEmailAuth] = useState(false);
	const [isSmsAuth, setIsSmsAuth] = useState(false);
	const [sixDigits, setSixDigits] = useState('');

	const navigate = useNavigate()

	const authEmail = localStorage.getItem('TWO_FA_EMAIL');
	const authSms = localStorage.getItem('TWO_FA_SMS');
	const authUsername = localStorage.getItem('USERNAME');
	const authPassword = localStorage.getItem('PASSWORD');

	const handleAuthEmail = (event) => {
		event.preventDefault();
		getTwoFa(authUsername, authPassword, 'email_confirm');
		setIsEmailAuth(true);
	};

	const handleAuthSms = (event) => {
		event.preventDefault();
		getTwoFa(authUsername, authPassword, 'sms_confirm');
		setIsSmsAuth(true);
	};

	const handleCodeChange = (event) => {
		const value = event.target.value;
		setSixDigits(value);
	};

	const handleSubmitCode = (event) => {
		event.preventDefault();
		const authenticated = setTwoFa(sixDigits)
		const TOKEN = localStorage.getItem('TOKEN')
		if (authenticated && TOKEN) {
			navigate('/HomePage');
		}
	};

	return (
		<div className="two-fa-container">
			<h2>2 Factor Authentication</h2>

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

			{isEmailAuth && (
				<div className="email-auth">
					<form onSubmit={handleSubmitCode}>
						<InputField type="number" value={sixDigits} onChange={handleCodeChange} />
						<input type="submit" />
					</form>
				</div>
			)}

			{isSmsAuth && (
				<div className="sms-auth">
					<form onSubmit={handleSubmitCode}>
						<InputField type="number" value={sixDigits} onChange={handleCodeChange} />
						<input type="submit" />
					</form>
				</div>
			)}
		</div>
	);
}

export default TwoFaPage;
