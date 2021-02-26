const app = require('./app')
const config = require('./config/default');
const MongoDB = require('./services/database');

const port = config.server.port;

//db
MongoDB.mongoConnect();
//local
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port} !`)
});
