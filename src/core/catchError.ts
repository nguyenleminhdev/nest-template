import {
    Catch, ArgumentsHost, ExceptionFilter
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from './logger'

@Catch()
/**bắt lỗi 404, 500 toàn hệ thống */
export class CatchError implements ExceptionFilter {
    /**đối tượng cấu hình env */
    private readonly configService = new ConfigService()
    /**đối tượng logger */
    private readonly log = new Logger()

    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    /**viết lại phương thức xử lý khi bắt lỗi 500 */
    catch(e: Error, host: ArgumentsHost) {
        /**mã lỗi */
        const MESSAGE = e?.message || e
        /**có cho phép log kỹ không */
        const IS_LOG = this.configService.get('NEST_HTTP_500_LOGGING_VERBOSE') === 'true'
        /**có phải lỗi 404 không */
        const IS_404 = e?.name === 'NotFoundException'
        let body: any

        // xử lý lỗi 404
        if (IS_404) {
            // log lỗi
            this.log.error(MESSAGE, 404)

            /**kết quả trả về */
            body = {
                success: false,
                code: 404,
                message: MESSAGE
            }
        }
        // xử lý lỗi 500
        else {
            // log lỗi
            this.log.error(MESSAGE, 500)

            // log chi tiết lỗi 500 để debug
            if (IS_LOG) console.log(e)

            /**kết quả trả về */
            body = {
                success: false,
                code: 500,
                message: MESSAGE
            }
        }

        // trả kết quả về cho client
        this.httpAdapterHost.httpAdapter.reply(
            host.switchToHttp().getResponse(),
            body,
            500
        )
    }
}