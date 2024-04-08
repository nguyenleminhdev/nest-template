import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import type { Request, Response } from 'express'

/**hàm tuỳ chỉnh lại response của API */
export type ResFn = (data?: any, code?: number) => void

/**trả về kết quả thành công */
const HANDLE_RES_OK = (
  p: unknown, ctx: ExecutionContext
) => (
  data?: any, code = 200
) => ctx
  .switchToHttp()
  .getResponse<Response>()
  .status(code)
  .json({ success: true, code, data })

/**trả về kết quả thành công */
export const Ok = createParamDecorator(HANDLE_RES_OK)

/**trả về kết quả thất bại */
export const HANDLE_RES_ERR = (
  p: unknown, ctx: ExecutionContext
) => (
  message: Error | string, code = 403
) => ctx
  .switchToHttp()
  .getResponse<Response>()
  .status(code)
  .json({
    success: false,
    code,
    message,
    // nếu message là string thì dịch nó ra
    mean: typeof message === 'string' ?
      ctx
        .switchToHttp()
        .getRequest<Request>()
        .i18nService
        .t(message) :
      undefined
  })

/**trả về kết quả thất bại */
export const Err = createParamDecorator(HANDLE_RES_ERR)