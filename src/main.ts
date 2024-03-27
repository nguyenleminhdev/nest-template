import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Logger } from './core/logger'

import { AppModule } from './app.module'

/**khởi động server */
async function bootstrap() {
  /**đối tượng đại diện cho server */
  const NEST = await NestFactory.create(AppModule, {
    // cấu hình nest sử dụng logger custom
    logger: new Logger(),
  })

  // cài đặt validate toàn bộ request
  NEST.useGlobalPipes(new ValidationPipe())

  /**lấy config tuỳ theo môi trường */
  const configService = NEST.get(ConfigService)

  // cài đặt global prefix loại trừ root path
  NEST.setGlobalPrefix(
    configService.get('NEST_PREFIX') || 'v1',
    { exclude: ['/'] }
  )

  // lắng nghe api
  await NEST.listen(configService.get('NEST_POST') || 1337)
}
bootstrap()