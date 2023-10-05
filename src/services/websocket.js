let ws = null;
const WS_URL = import.meta.env.VITE_WS_URL;


async function openWebSocket(token) {
	const tokenizedUrl = `${WS_URL}/?token=${token}`;
	return new Promise((resolve, reject) => {
		if (!ws) {
			ws = new WebSocket(tokenizedUrl);
			ws.addEventListener('open', (event) => {
				console.log('WebSocket connection opened:', event);
				setTimeout(() => {
					// if (ws.readyState === 1) {
						console.log('WebSocket connection established.');
						resolve(ws);
					// }
				}, 1000);
			});

			ws.addEventListener('close', (event) => {
				 console.log('WebSocket connection closed:', event);
                 ws = null;
			});

			ws.addEventListener('error', (error) => {
				console.error('WebSocket error:', error);
                reject(error);
			});
		}
	});
}

async function setMessageHandler(onMessage, requestType, isSubscription) {
	return new Promise(async (resolve, reject) => {
		const messageListener = (event) => {
			const data = JSON.parse((event.data).toString('utf8'));
			const responseType = data.type;
			if (responseType === requestType) {
				const messageHandled = onMessage(data);
				if (messageHandled && !isSubscription) {
					ws.removeEventListener('message', messageListener);
				}
				resolve(messageHandled);
			} else {
				// console.log(`this is type sent: ${requestType} and this is type received: ${responseType}`);
			}
		};

		if (ws) {
			ws.addEventListener('message', messageListener);
		}
	});
}

function closeWebSocket() {
	if (ws) {
		ws.close();
	}
}

function sendWebSocketMessage(message) {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(message);
	}
}

export { openWebSocket, setMessageHandler, closeWebSocket, sendWebSocketMessage };
