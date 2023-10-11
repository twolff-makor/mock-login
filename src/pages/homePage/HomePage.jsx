import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	closeWebSocket,
	openWebSocket,
	sendWebSocketMessage,
	setMessageHandler,
} from '../../services/websocket';
import { ClickTrader, SpotBalance, TradesBlotter } from '../../components/';
import './homePage.css';

function HomePage() {
	const navigate = useNavigate();
	const [connection, setConnection] = useState(false);
	const [ctConfig, setCtConfig] = useState(null);
	const [TOKEN, setTOKEN] = useState(localStorage.getItem('TOKEN'));

	const ctConfigMsg = JSON.stringify({
		type: 'get_product_config',
		id: import.meta.env.VITE_COMPANY_CT,
		data: {
			company: import.meta.env.VITE_COMPANY_CT,
		},
	});

	const createWebSocketConnection = async () => {
		await openWebSocket(TOKEN);
		setConnection(true);
		getConfig();
	};

	const getConfig = async () => {
		sendWebSocketMessage(ctConfigMsg);
		await setMessageHandler(handleConfigMessage, `get_product_config`, false);
	};

	useEffect(() => {
		createWebSocketConnection();
	}, []);

	const handleConfigMessage = ({ content }) => {
		setCtConfig(content);
	};

	function handleLogout() {
		localStorage.clear();
		closeWebSocket();
		navigate('/');
	}

	return (
		<>
			<button className="logout-btn" onClick={handleLogout}>
				Log Out
			</button>
			{connection && ctConfig && TOKEN && (
				<>
					<ClickTrader config={ctConfig.map((obj) => obj.name)} />
					<SpotBalance />
					<TradesBlotter />
				</>
			)}
		</>
	);
}

export default HomePage;
