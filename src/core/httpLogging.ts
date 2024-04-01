/**
 * middleware tự động log lại toàn bộ http request
 * - cho phép nhận cấu hình từ env
 */
import { Injectable, NestMiddleware, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger } from './logger'

import type { Request, Response } from 'express'

/**middleware tự động log lại toàn bộ http request */
@Injectable()
export class httpLogging implements NestMiddleware {
  /**đối tượng cấu hình env */
  private readonly configService = new ConfigService()
  /**đối tượng logger */
  private readonly log = new Logger()

  constructor() {
    // đặt nhãn cho logger
    this.log.setContext('httpLogging')

    // vì express không bind this nên phải bind lại, để use có thể dùng được
    this.use = this.use.bind(this)
  }

  /**phương thức được gọi mỗi khi có phát sinh http request */
  use(req: Request, res: Response, next: Function) {
    /**có cho phép log không */
    const IS_LOG = this.configService.get('NEST_HTTP_LOGGING') === 'true'

    // nếu cho phép log request
    if (IS_LOG) this.log.debug(`${req.method} ${req.url}`)

    next()
  }
}

/**module cung cấp httpLogging cho nest sử dung */
@Module({
  providers: [httpLogging],
  exports: [httpLogging],
})
export class HttpLoggingModule { }