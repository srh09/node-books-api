import { Request, Response } from 'express';

export const loginUser = (req: Request, res: Response) => {
  console.log('loginUser-------');
  console.log(req);
  res.send('Logged in------');
};
