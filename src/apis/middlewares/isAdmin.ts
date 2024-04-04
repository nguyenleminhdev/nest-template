import { Request, Response, NextFunction } from 'express'

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    console.log(
        `isAdmin...`,
        req.customData
    )

    next()
}