import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalAuthContext } from '../../hooks/useGlobalAuthContext';

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
    const { token } = useGlobalAuthContext();

	useEffect(() => {
		if (!token) {
			navigate('/');
		}
	}, [navigate, token]);

	return children;
};

export default ProtectedRoute;
