'use strict';

const port = 3000,
			express = require('express'),
			app = express(),
			server = require('http').Server(app),
			cors = require('cors');


app.use(cors());

app.get('/', (req, res) => {
	console.log('test');
	res.status(200).json({ success: true });
});

app.get('/api/test', (req, res) => {
	console.log('btn clicked?');
	res.status(200).json({ success: true, message: 'Good!' });
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
});