import axios from "axios";
const REST_URL = import.meta.env.VITE_REST_URL;

async function getTwoFa(username, password, type) {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${REST_URL}/auth`,
				{
					username: username,
					password: password,
				},
				{
					headers: {
						'content-Type': 'application/json',
                        type
					},
				}
			)
			.then((response) => {
                localStorage.setItem('SESSION_TOKEN', response.data.token);
				resolve(response)
			})
			.catch((error) => {
				reject(error);
				console.log(`Auth failed with message : ${error}`);
			});
	});
}


async function setTwoFa(sixDigits) {
	const SESSION_TOKEN = localStorage.getItem('SESSION_TOKEN')
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${REST_URL}/auth/register`,
				{
					six_digits: sixDigits
				},
				{
					headers: {
						'content-Type': 'application/json',
						Authorization: `Bearer ${SESSION_TOKEN}`
					},
				}
			)
			.then((response) => {
				localStorage.clear();
				localStorage.setItem('TOKEN', response.data.token)
				resolve(response.data.is_final_auth || false);
			})
			.catch((error) => {
				reject(error);
				console.log(`Auth failed with message : ${error}`);
			});
	});
}

 export { getTwoFa, setTwoFa};
