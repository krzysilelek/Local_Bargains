const app = require('./app.js');

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${server.address().port}`);
});

