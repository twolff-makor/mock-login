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
                if (token) {
                    localStorage.setItem('TOKEN' , token);
                    localStorage.setItem('USER_DATA', response.data);
                    resolve(true);
                } else {resolve(false)}
			})
			.catch((error) => {
				reject(error);
				console.log(`Auth failed with message : ${error}`);
			});
	});
}

 export { getAuth };
