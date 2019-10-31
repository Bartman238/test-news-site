'use strict';

const port = 3000,
			express = require('express'),
			app = express(),
			server = require('http').Server(app),
			request = require('request'),
			cors = require('cors');


app.use(cors());



app.get('/xml', (req, res) => {
	function httpReq(url) {
		let p = new Promise( (resolve, reject) => {
			request.get({ 
				url
			 }, async (err, resp, body) => {
				if (!err && resp.statusCode === 200) {
					resolve(body);
				} else {
					reject(new Error(` Error ${resp.statusCode}`));
				}
			});
		});
		return p;
	};

	httpReq('http://news.google.com/rss?hl=en-US&gl=US&ceid=US:en')
		.then( (body) => {
			res.status(200).json({ success: true, message: 'Connected', body }) })
		.catch( (err) => {
			res.status(503).json({ success: false, message: err.message });
			console.log(err.message);
		});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
});