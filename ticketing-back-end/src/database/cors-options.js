import { environment } from '../environment/environment.js';
export const corsOptions = {
    origin: (origin, callback) => {
        if (environment.whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization', 'AuthorizationRoute'],
    credentials: true,
};

