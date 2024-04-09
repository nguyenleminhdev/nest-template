import { BadRequestException, Catch, ExceptionFilter, ExecutionContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@/core/logger'
import { HANDLE_RES_ERR } from '@/apis/decorators/res.decorator'
import { HttpAdapterHost } from '@nestjs/core'
import { ValidationError } from 'class-validator'
import { I18nValidationException } from 'nestjs-i18n'

@Catch()
/**bắt lỗi 404, 500, lỗi validator toàn hệ thống */
export class CatchError implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    /**viết lại phương thức xử lý khi bắt lỗi 500 */
    catch(e: I18nValidationException, ctx: ExecutionContext) {
        const { code, message } = new ErrorHandle(e).handle()

        // trả kết quả về cho client bằng custom decorator
        HANDLE_RES_ERR(undefined, ctx)(message!, code)
    }
}

/**xử lý mã lỗi trả về */
class ErrorHandle {
    /**tên của lỗi */
    private err_name?: string
    /**dữ liệu lỗi của i18n */
    private fist_i18n_err?: ValidationError
    /**lỗi trả về sau khi được xử lý */
    private result_err?: I18nValidationException | string
    /**http code */
    private code = 500

    constructor(e: I18nValidationException) {
        this.err_name = e?.name
        this.fist_i18n_err = e?.errors?.[0]
        this.result_err = e
    }

    /**trả về code và mã lỗi đã được xử lys */
    public handle() {
        // xử lý lỗi của validator
        if (
            this.err_name === 'I18nValidationException' &&
            this.fist_i18n_err
        ) this.formatI18nError()

        return {
            code: this.code,
            message: this.result_err
        }
    }

    /**xử lý tự động mã lỗi dto */
    private formatI18nError() {
        /**danh sách các lỗi của field đầu tiên */
        const ERR_LIST = this.fist_i18n_err?.constraints || {}
        /**tên của lỗi đầu tiên trong các lỗi */
        const ERR_NAME = Object.keys(this.fist_i18n_err?.constraints || {})?.[0]

        // nếu không có lỗi thì bỏ qua
        if (!ERR_NAME) return

        // trả về lỗi Bad Request
        this.code = 400

        // chuyển đổi thành mã lỗi của i18n
        switch (ERR_NAME) {
            case 'isNotEmpty': this.result_err = 'VALIDATOR.IS_NOT_EMPTY'
                break
            case 'isEmail': this.result_err = 'VALIDATOR.IS_EMAIL'
                break
            // nếu chưa định nghĩa thì trả về lỗi mặc định của validator
            default: this.result_err = ERR_LIST?.[ERR_NAME]
        }
    }
}




/**đối tượng cấu hình env */
// private readonly configService = new ConfigService()
/**đối tượng logger */
// private readonly log = new Logger()
/**mã lỗi */
// const MESSAGE = e?.message || e
// /**có cho phép log kỹ không */
// const IS_LOG = this.configService.get('NEST_HTTP_500_LOGGING_VERBOSE') === 'true'
// /**có phải lỗi 404 không */
// const IS_404 = e?.name === 'NotFoundException'
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