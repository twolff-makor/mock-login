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
                console.log(response);
			})
			.catch((error) => {
				reject(error);
				console.log(`Auth failed with message : ${error}`);
			});
	});
}

 export { getTwoFa };
