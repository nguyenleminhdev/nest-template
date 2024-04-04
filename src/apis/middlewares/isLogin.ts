import { Request, Response, NextFunction } from 'express'

export function isLogin(req: Request, res: Response, next: NextFunction) {
    console.log(`isLogin...`)

    req.customData = 'Some data'

    next()
}