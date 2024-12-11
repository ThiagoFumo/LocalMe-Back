import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction, Router } from 'express';
import logger from 'jet-logger';
import 'express-async-errors';
import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';
import Paths from './constants/Paths';
import Api from './routes/Api';

//variables
const app = express();
const cors = require('cors');


//setup

app.use(express.json());

//basic middleware

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(EnvVars.CookieProps.Secret));

//permite que se manden datos desde el front al back sin problemas de CORS
app.use(cors({
  origin: 'http://localhost:4200'
}));

//show routes called in console during development

if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

//security

if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

//add APIs, must be after middleware

const apiRouter = Router();
apiRouter.use(Paths.Users.Base, Api.UserRouter);
apiRouter.use(Paths.Posts.Base, Api.PostRouter);


app.use(Paths.Base, apiRouter);

//add error handler

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  res.status(status).send(err.message);
});

// export default //

export default app;