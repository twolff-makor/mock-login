import { useEffect, useState } from 'react';
import './clickTrader.css';
import { sendWebSocketMessage, setMessageHandler } from '../../services/websocket';

function ClickTrader() {
	const [askPrice, setAskPrice] = useState(0);
	const [bidPrice, setBidPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [slippage, setSlippage] = useState(2);

    const subscriptionData = JSON.stringify({
			id: '7848e25e-ceef-4716-bcf5-988960bfbce3',
			type: 'subscription',
			data: {
				products: ['BTC-USD'],
				decimal: 3,
				quantity: 1,
				level: true,
				high: true,
				low: true,
			},
		});

    const handlePriceMessage = ({ content } = msg) => {
			const currency = `BTC-USD`;
			setAskPrice(content[currency].price.ask.price);
			setBidPrice(content[currency].price.bid.price);
		};

	useEffect(() => {
		sendWebSocketMessage(subscriptionData);
		setMessageHandler(handlePriceMessage, `subscription`, true);
	}, []);

	const handleExecution = (event) => {
        const side = event.target.name;
        const price = side === `SELL` ? JSON.parse(bidPrice) : JSON.parse(askPrice);
        
        const executionData = JSON.stringify({
					id: 'dc7d7e2c-2155-475b-b31f-76dbced95c6b',
					type: 'execution',
					data: {
						company: import.meta.env.VITE_COMPANY_CT,
						product: 'BTC-USD',
						side: side,
						quantity: quantity,
						price: price,
						type: 'LIMIT',
						time_in_force: 'FOK',
						slippage: slippage,
						retries: 3,
					},
				});
        
        sendWebSocketMessage(executionData);
    };

	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};

	const handleSlippageChange = (event) => {
		setSlippage(event.target.value);
	};

	return (
		<div className="click-trader">
			<header className="ct-currency">BTC-USD</header>
			<button className="btn-buy ct-btn" name="BUY" onClick={handleExecution}>
				{askPrice}
			</button>
			<button className="btn-sell ct-btn" name="SELL" onClick={handleExecution}>
				{bidPrice}
			</button>
			<footer>
				<label htmlFor="ct-slippage">Slippage</label>
				<input
					name="ct-slippage"
					type="number"
					min="0"
					onChange={(event) => {
						handleSlippageChange(event);
					}}
				/>
				<label htmlFor="ct-qty">QTY</label>
				<input
					name="ct-qty"
					type="number"
					min="0"
					onChange={(event) => {
						handleQuantityChange(event);
					}}
				/>
			</footer>
		</div>
	);
}

export default ClickTrader;
