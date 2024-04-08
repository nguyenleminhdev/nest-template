import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import type { Request } from 'express'

/**gộp toàn bộ dữ liệu truyền lên api từ đối tượng req của express */
const HANDLE_ALL_PARAMS = (data: unknown, ctx: ExecutionContext) => {
  const { body, params, query } = ctx.switchToHttp().getRequest<Request>()

  return { ...params, ...query, ...body }
}

/**
 * gộp toàn bộ dữ liệu truyền lên api
 * - sử dụng được với dto validator
 */
export const AllParams = createParamDecorator(HANDLE_ALL_PARAMS)