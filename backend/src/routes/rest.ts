import  {Router} from 'express';

const restRouter : Router = Router();

// Quizzes
restRouter.use('/quizzes', require('./rest/quizzes'));

export = restRouter
