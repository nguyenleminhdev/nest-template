import { Request, Response, NextFunction } from 'express'

/**kiểm tra người dùng có phải là admin không */
export function isAdmin(req: Request, res: Response, next: NextFunction) {
    next()
}