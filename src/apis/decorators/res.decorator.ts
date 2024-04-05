import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import type { Response } from 'express'

/**hàm tuỳ chỉnh lại response của API */
type ResponseFn = (data?: any, code?: number) => void

/**tuỳ chỉnh ressponse */
export interface ResType {
  /**trả kết quả về khi thành công */
  ok: ResponseFn
  /**trả kết quả về khi thất bại */
  err: ResponseFn
}

/**Decorator tuỳ chỉnh response */
export const Res = createParamDecorator((
  data: unknown,
  ctx: ExecutionContext
): ResType => ({
  ok(data?: any, code = 200) {
    ctx
      .switchToHttp()
      .getResponse<Response>()
      .status(code)
      .json({ success: true, code, data })
  },
  err(message: string, code = 403) {
    ctx
      .switchToHttp()
      .getResponse<Response>()
      .status(code)
      .json({ success: false, code, message })
  }
}))