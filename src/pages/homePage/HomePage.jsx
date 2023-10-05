import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { closeWebSocket, openWebSocket } from '../../services/websocket';
import { ClickTrader, SpotBalance, TradesBlotter } from '../../components/';
import './homePage.css';

function HomePage() {
	const navigate = useNavigate();
	const [connection, setConnection] = useState(false);

	const createWebSocketConnection = async () => {
		await openWebSocket(localStorage.getItem(`TOKEN`));
		setConnection(true);
	};

	useEffect(() => {
		createWebSocketConnection();
	}, []);

	function handleLogout() {
		localStorage.removeItem('TOKEN');
		closeWebSocket();
		navigate('/');
	}

	return (
		<>
			<button className="logout-btn" onClick={handleLogout}>
				log out
			</button>
			{
				connection && (
					<>
						<ClickTrader />
						<SpotBalance />
						<TradesBlotter/>
					</>
				)

			}
		</>
	);
}

export default HomePage;
