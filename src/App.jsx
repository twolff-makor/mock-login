// import { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage  from './pages/homePage/HomePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import TwoFaPage from './pages/twoFaPage/TwoFaPage';

const routes = [
	{
		path: '/',
		element: <LoginPage />,
	},
	{
		path: '/TwoFaPage',
		element: <TwoFaPage />,
	},
	{
		path: '/HomePage',
		element: (
			<ProtectedRoute>
				<HomePage />
			</ProtectedRoute>
		),
	},
	// {
	//   path: '*',
	//   element: <NotFound />
	// }
];

function App() {
	const router = createBrowserRouter(routes);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
