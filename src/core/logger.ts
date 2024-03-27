/**
 * custom lại logger mặc định của nest.js
 * - cho phép nhận cấu hình log level từ env
 * - có thể sử dụng như một module ở mọi nơi mà không cần khai báo
 */
import { ConsoleLogger, Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { LogLevel } from '@nestjs/common'

/**class custom logger từ logger mặc định của nest */
export class Logger extends ConsoleLogger {
    /**đối tượng cấu hình env */
    private readonly configService = new ConfigService()

    constructor() {
        // gọi constructor của ConsoleLogger
        super()

        // thiết lập log level
        this.setLogLevels()
    }

    /**thiết lập log level */
    setLogLevels() {
        /**các log level thoả mãn */
        const VALID_LOG_LEVEL = [
            'log', 'error', 'warn', 'debug', 'verbose', 'fatal'
        ]

        /**thiết lập log hiện tại của env */
        const NEST_LOGGER_LEVEL: string | undefined = this.configService.get('NEST_LOGGER_LEVEL')

        /**giải mã thiết lập log level */
        let log_level =
            NEST_LOGGER_LEVEL
                ?.split(',')
                ?.filter(level => VALID_LOG_LEVEL.includes(level))

        // nếu không có log level thì đặt mặc định
        if (!log_level?.length) log_level = VALID_LOG_LEVEL

        // thiết lập log level
        super.setLogLevels(log_level as LogLevel[])
    }
}

/**module cung cấp logger cho nest sử dung */
@Global() // cho phép module này sử dụng ở mọi nơi
@Module({
    providers: [Logger],
    exports: [Logger],
})
export class LoggerModule { }