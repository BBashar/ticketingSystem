import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import { corsOptions } from './database/cors-options.js'
import { environment } from './environment/environment.js';
import websiteRouterV1 from './api/routes/webiste-main-routes.js';
import adminMainRoutes from './api/routes/admin-main-routes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions))

app.use("/api/", websiteRouterV1, adminMainRoutes);
// app.use("/api/v1/admin", adminRouterV1);

const server = app.listen(environment.PORT, () => {
    console.log(`Express server is running at port no ${environment.PORT}`);
});


console.log('running');