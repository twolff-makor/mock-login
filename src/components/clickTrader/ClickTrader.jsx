import { useEffect, useState } from 'react';
import './clickTrader.css';
import { sendWebSocketMessage, setMessageHandler } from '../../services/websocket';

function ClickTrader( { config } ) {
	const [askPrice, setAskPrice] = useState(0);
	const [bidPrice, setBidPrice] = useState(0);
	const [spreadPrice, setSpreadPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [slippage, setSlippage] = useState(2);
	const [product, setProduct] = useState(config[0]);
    const [priceLevels, setPriceLevels] = useState([])

	const subscriptionData = JSON.stringify({
		id: '7848e25e-ceef-4716-bcf5-988960bfbce3',
		type: 'subscription',
		data: {
			products: [product],
			decimal: 3,
			quantity: 1,
			level: true,
			high: true,
			low: true,
		},
	});

	const handlePriceMessage = ({ content } = msg) => {
		setAskPrice(content[product].price.ask.price);
		setBidPrice(content[product].price.bid.price);
        setSpreadPrice(content[product].price.spread);
        setPriceLevels(content[product].level)
	};

   

	useEffect(() => {
		sendWebSocketMessage(subscriptionData);
		setMessageHandler(handlePriceMessage, `subscription`, true);
	}, [product]);

	const handleExecution = (event) => {
		const side = event.target.name;
		const price = side === `SELL` ? JSON.parse(bidPrice) : JSON.parse(askPrice);

		const executionData = JSON.stringify({
			id: '58b2a2aa-c954-4932-9051-0488bfb9a9ea',
			type: 'execution',
			data: {
				company: import.meta.env.VITE_COMPANY_CT,
				product: product,
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
        setMessageHandler(handlePriceMessage, `execution`, false);

	};

	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};

	const handleSlippageChange = (event) => {
		setSlippage(event.target.value);
	};

	const handleProductChange = (event) => {
		setProduct(event.target.value);
	};

	return (
		<div className="click-trader">
			<header>
				<select name="ct-currency" onChange={handleProductChange} className="ct-currency">
					{config.map((currency) => {
						return (
							<option key={currency} value={currency}>
								{currency}
							</option>
						);
					})}
				</select>
				<label htmlFor="ct-qty">QTY</label>
				<input
					name="ct-qty"
					type="number"
					min="0"
					value={quantity}
					onChange={(event) => {
						handleQuantityChange(event);
					}}
				/>
				<label htmlFor="ct-slippage">SLIP</label>
				<input
					name="ct-slippage"
					type="number"
					min="0"
					value={slippage}
					onChange={(event) => {
						handleSlippageChange(event);
					}}
				/>
			</header>

			<button className="btn-buy ct-btn" name="BUY" onClick={handleExecution}>
				{askPrice}
			</button>
			<button className="btn-sell ct-btn" name="SELL" onClick={handleExecution}>
				{bidPrice}
			</button>
			<div className="ct-spread">{spreadPrice}</div>

			<footer>
				<table>
					<thead>
						<tr>
							<th>QTY</th>
							<th>Bid</th>
							<th>Offer</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(priceLevels).map((level) => {
							return (
								<tr key={level}>
									<td>{level}</td>
									<td>{priceLevels[level].bid.price}</td>
									<td>{priceLevels[level].ask.price}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</footer>
		</div>
	);
}

export default ClickTrader;
