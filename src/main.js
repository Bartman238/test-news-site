'use strict';

const port = 3000,
			express = require('express'),
			app = express(),
			server = require('http').Server(app),
			request = require('request'),
			cors = require('cors');


app.use(cors());



app.get('/', (req, res) => {
	console.log('test');
	request.get({ 
		url: 'http://news.google.com/rss?hl=en-US&gl=US&ceid=US:en'
	 }, (err, resp, body) => {
		if (!err && resp.statusCode === 200) {
			res.status(200).json({ success: true, message: 'Connected', body });
		} else {
			res.status(503).json({ success: false, message: `Error 503: ${err}` });
		}
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
});