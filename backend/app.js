const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const client_id = ''
const client_secret = ''

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/translate', function (req, res) {
    console.log(req.query);

    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');
    var options = {
        url: api_url,
        form: {'source':'ko', 'target':'en', 'text':req.body.prompt},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})