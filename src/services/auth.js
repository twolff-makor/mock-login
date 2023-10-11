import axios from "axios";
const REST_URL = import.meta.env.VITE_REST_URL;

async function getAuth(username, password) {
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
					},
				}
			)
			.then((response) => {
                const token = response.data.token ? response.data.token : null;
				const twoFa = response.data.auth_parameters ? response.data.auth_parameters : null;
                if (token) {
                    localStorage.setItem('TOKEN' , token);
                    localStorage.setItem('USER_DATA', response.data);
                    resolve('authorized');
                } else if (twoFa) {
					localStorage.setItem('TWO_FA_EMAIL', twoFa.email)
					localStorage.setItem('TWO_FA_SMS', twoFa.phone)
					resolve('2fa')} 
				else {resolve('error') }
			})
			.catch((error) => {
				reject(error);
				console.log(`Auth failed with message : ${error}`);
			});
	});
}

 export { getAuth };
