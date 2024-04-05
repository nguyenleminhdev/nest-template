import { Request, Response, NextFunction } from 'express'

/**kiểm tra người dùng đã đăng nhập chưa */
export function isLogin(req: Request, res: Response, next: NextFunction) {
    next()
}