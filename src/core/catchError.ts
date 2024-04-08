import { Catch, ExceptionFilter, ExecutionContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@/core/logger'
import { HANDLE_RES_ERR } from '@/apis/decorators/res.decorator'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
/**bắt lỗi 404, 500, lỗi validator toàn hệ thống */
export class CatchError implements ExceptionFilter {
    /**đối tượng cấu hình env */
    // private readonly configService = new ConfigService()
    /**đối tượng logger */
    // private readonly log = new Logger()

    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    /**viết lại phương thức xử lý khi bắt lỗi 500 */
    catch(e: Error, ctx: ExecutionContext) {
        /**mã lỗi */
        // const MESSAGE = e?.message || e
        // /**có cho phép log kỹ không */
        // const IS_LOG = this.configService.get('NEST_HTTP_500_LOGGING_VERBOSE') === 'true'
        // /**có phải lỗi 404 không */
        // const IS_404 = e?.name === 'NotFoundException'
        /**http code */
        let code = 500

        console.log(
            'name', e.name, '\n',
            'message', e.message, '\n',
            // e.stack
        )

        // // xử lý lỗi 404
        // if (IS_404) {
        //     // log lỗi
        //     this.log.error(MESSAGE, 404)

        //     code = 404
        // }
        // // xử lý lỗi 500
        // else {
        //     // log lỗi
        //     this.log.error(MESSAGE, 500)

        //     // log chi tiết lỗi 500 để debug
        //     if (IS_LOG) console.log(e)
        // }

        // trả kết quả về cho client bằng custom decorator
        // HANDLE_RES_ERR(undefined, ctx)(MESSAGE, code)
        HANDLE_RES_ERR(undefined, ctx)(e, code)
    }
}