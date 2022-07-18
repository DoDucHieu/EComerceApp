import express from 'express'
import config from 'config'
import connect from './src/utils/connect';
import logger from './src/utils/logger';
import routes from './src/route';


const app = express();


const PORT =config.get<number>("port");


app.listen(PORT, async() => {
    logger.info(`App is running at http://localhost:${PORT}`);
    await connect();

    routes(app);
});
