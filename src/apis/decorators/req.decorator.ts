import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import type { Request } from 'express'

/**hàm tuỳ chỉnh lại response của API */
type RequestFn = () => Record<string, any>

/**tuỳ chỉnh request */
export interface ReqType {
  /**gộp toàn bộ body, query, param của request */
  allParams: RequestFn
}

/**Decorator tuỳ chỉnh request */
export const Req = createParamDecorator((
  data: unknown,
  ctx: ExecutionContext
): ReqType => ({
  allParams() {
    const { body, params, query } = ctx.switchToHttp().getRequest<Request>()

    return { ...params, ...query, ...body }
  },
}))