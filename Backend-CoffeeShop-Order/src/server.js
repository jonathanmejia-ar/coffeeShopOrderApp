const app = require('./app')
const config = require('./config/default');
const MongoDB = require('./services/database');

const port = config.server.port;

//local
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} !`)
});
//db
MongoDB.mongoConnect();
