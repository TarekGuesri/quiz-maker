import {Request, Response, Router} from 'express'

const quizzesRouter : Router = Router();

// Quizzes
quizzesRouter.get('/' , (req: Request, res: Response) => {
  res.json('test2')
})

export = quizzesRouter;