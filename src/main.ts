import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { I18nValidationPipe } from 'nestjs-i18n'

import { readFileSync } from 'fs'

import { Logger } from '@/core/logger'
import { httpLogging } from '@/core/httpLogging'
import { CatchError } from '@/core/catchError'

import ApiModule from '@/app.module'

/**khởi động server */
async function bootstrap() {
  // xóa màn hình console
  console.clear()

  /**đối tượng logger */
  const LOGGER = new Logger()

  /**đối tượng đại diện cho server */
  const NEST = await NestFactory.create(ApiModule, {
    // cấu hình nest sử dụng logger custom
    logger: LOGGER,
  })

  // sửa lại thông báo bắt lỗi 500
  NEST.useGlobalFilters(new CatchError(NEST.get(HttpAdapterHost)))

  // cài đặt validate toàn bộ request chạy được với i18n
  NEST.useGlobalPipes(new I18nValidationPipe({
    validateCustomDecorators: true
  }))

  /**lấy config tuỳ theo môi trường */
  const configService = NEST.get(ConfigService)

  // cài đặt cors cho toàn bộ request
  NEST.enableCors({
    origin: configService.get('NEST_CORS_ORIGIN') || '*',
    methods: configService.get('NEST_CORS_METHODS') || '*',
    allowedHeaders: configService.get('NEST_CORS_ALLOWED_HEADERS') || '*',
  })

  // cài đặt global prefix loại trừ root path
  NEST.setGlobalPrefix(
    configService.get('NEST_PREFIX') || 'v1',
    { exclude: ['/'] }
  )

  // cài đặt logger cho mọi request
  NEST.use(new httpLogging().use)

  // lắng nghe api
  await NEST.listen(configService.get('NEST_POST') || 1337)

  // hiển thị hình ảnh phật tổ
  LOGGER.log(await readFileSync(`${process.cwd()}/buddha.txt`, 'utf-8'))

  // thông báo server đã khởi động
  LOGGER.log(`Server is running on: ${await NEST.getUrl()}`, '🚀 ')
}
bootstrap()