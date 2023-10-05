import { createContext, useState } from 'react';

export const AuthContext = createContext();

const tokenFromLocalStorage = localStorage.getItem('TOKEN')
	? JSON.stringify(localStorage.getItem('TOKEN'))
	: null;

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(tokenFromLocalStorage);


	// const login = async (username, password) => {
    //     const authorized = await getAuth(username, password)
	// 		if (authorized) {
    //             navigate('/HomePage');
    //         }
	// };

	const logout = () => {
		localStorage.clear();
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				// login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
