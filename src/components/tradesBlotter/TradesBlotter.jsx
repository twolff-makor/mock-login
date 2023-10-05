import { useEffect, useState } from 'react';
import './tradesBlotter.css';
import { sendWebSocketMessage, setMessageHandler } from '../../services/websocket';

function TradesBlotter() {
	const [visibleTrades, setVisibleTrades] = useState(null);

	const tradesData = {
		type: 'trades_blotter',
		id: '595e5b24-62bc-11ee-bf28-162b04727a91',
		data: {
			limit: 55,
			offset: 0,
			sort: 'DESC',
			filter_col: [
				'status',
				'id',
				'group_id',
				'date',
				'product',
				'side',
				'quantity',
				'price',
				'provider_price',
				'nominal',
				'nominal_usd',
				'p&l',
				'counterparty',
				'label',
				'service',
				'otc_type',
				'protocol',
				'type',
				'external_execution_reference',
				'comment',
				'settlement_cover',
				'enigma2_id',
				'external_id',
				'author',
				'edit_otc',
			],
			side: ['BUY', 'SELL'],
			id: '',
			csv: false,
			page_direction: 'NEXT',
			counterparty_view: false,
		},
	};

	const formatStr = (str) => {
			const strFragments = str.split('_');
            const newStr = strFragments.map((fragment)=>{
                return fragment.charAt(0).toUpperCase() + fragment.slice(1);
            }).join(' ')
			return newStr;
		}

	const handleTradesMessage = ({ content } = msg) => {
		if (!visibleTrades) {
			setVisibleTrades(content.data);
		}
	};

	useEffect(() => {
		sendWebSocketMessage(JSON.stringify(tradesData));
		setMessageHandler(handleTradesMessage, `trades_blotter`, true);
	}, []);

	const handleScroll = (event) => {
		const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
		if (bottom) {
			console.log(bottom);
		}
	};

	return (
		<div className="trades-blotter" onScroll={handleScroll}>
			<table>
				<thead>
					<tr>
						{visibleTrades &&
							Object.keys(visibleTrades[0]).map((name) => {
								return <th key={name}>{formatStr(name)}</th>;
							})}
					</tr>
				</thead>
				<tbody>
					{visibleTrades &&
						visibleTrades.map((trade) => {
							return (
								<tr key={trade.id}>
									{Object.keys(trade).map((tradeDetail, index) => {
										return <td key={index}>{trade[tradeDetail]}</td>;
									})}
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default TradesBlotter;
