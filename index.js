import express from 'express';
import NodeCache from 'node-cache';

const app = express();

const history = [];

app.get('/history', async function (req, res) {
	let token = req.query.token;
	/*if (token !== 'svkj7bdikg') {
		res.status(403).send('Wrong token');
		return;
	}*/
	const str = history.map(({time, content}) => {
		const formattedTime = new Date(time).toISOString();
		const ago = (Date.now() - time) / 1000;
		return `
		<div>Time: ${formattedTime}</div>
		<div>${ago} seconds ago</div>
		<div>Content: <br><pre>${content}</pre></div>
		`;
	});
	res.send(str.join(''));
});

app.get('/record', async function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	const content = req.query.c;
	history.push({time: Date.now(), content});
	res.send('Recorded');
});

app.listen(process.env.PORT || 3000);
