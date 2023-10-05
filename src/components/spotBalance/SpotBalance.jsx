import { useEffect, useState } from 'react';
import './spotBalance.css';
import { sendWebSocketMessage, setMessageHandler } from '../../services/websocket';

function SpotBalance() {
	const [balance, setBalance] = useState(null)

    const balanceData = JSON.stringify({
			id: '457abb21-d9e9-47aa-a389-392fdf12f581',
			type: 'balance',
			data: {
				show_empty: true,
				order_by: 'amount',
				sort: 'DESC',
				date: '',
			},
		});

	const handleBalanceMessage = ({ content } = msg) => {
		setBalance(content.balance);
	};

	useEffect(() => {
		sendWebSocketMessage(balanceData);
		setMessageHandler(handleBalanceMessage, `balance`, true);
	}, []);

	return (
		<div className="spot-balance">
			<table>
				<thead>
					<tr>
						<th>Asset</th>
						<th>Quantity</th>
						<th>Notional(US$)</th>
					</tr>
				</thead>
				<tbody>
					{balance &&
						Object.keys(balance).map((currency) => {
							return (
								<tr key={currency}>
									<td>{currency}</td>
									<td>{balance[currency].amount}</td>
									<td>{balance[currency].nlv}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default SpotBalance;
