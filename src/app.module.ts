import {
  MiddlewareConsumer, Module, NestModule, Controller, All, Injectable
} from '@nestjs/common'

// cấu hình serve static
import { ServeStaticModule } from '@nestjs/serve-static'

// cấu hình các biến môi trường
import { ConfigModule } from '@nestjs/config'
import constants from './configs/constants'

// cấu hình logger
import { LoggerModule } from './core/logger'

// các middleware
import { isLogin } from './apis/middlewares/isLogin'
import { isAdmin } from './apis/middlewares/isAdmin'

// custom response
import { Res, ResType } from './apis/decorators/res.decorator'

// các api module
import AbcModule from './apis/controllers/app.module'
import XxxModule from './apis/controllers/public.module'

@Injectable() export class Service {
  /**gửi lời chào hệ thống */
  pong() {
    return 'Server loading successfully!'
  }
}

@Controller() export class ApiController {
  constructor(private readonly service: Service) { }

  /**trả về thông báo khi gọi "/" */
  @All() async all(@Res() res: ResType) {
    res.ok(this.service.pong())
  }
}

@Module({
  imports: [
    // cấu hình môi trường
    ConfigModule.forRoot({
      // nhập đường dẫn tệp tin môi trường động
      envFilePath: `src/configs/envs/.${process.env.NODE_ENV || 'development'}.env`,
      // nhập đường dẫn tệp tin môi trường cố định
      load: [constants],
      // sử dụng mà không cần khai báo
      isGlobal: true,
      // tăng tốc độ đọc env
      cache: true,
    }),

    // cấu hình serve static
    ServeStaticModule.forRoot({
      // nơi chứa file static
      rootPath: `${process.cwd()}/public`,
      // file static được phục vụ ở path nào, tất cả các path không khớp sẽ bị 404
      serveRoot: '/static/'
    }),

    // cho phép logger có thể sử dụng ở mọi nơi
    LoggerModule,

    // các module api
    AbcModule,
    XxxModule,
  ],
  controllers: [ApiController],
  providers: [Service],
}) export default class ApiModule implements NestModule {
  /**cài đặt policy cho api */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isLogin, isAdmin).forRoutes('abc')
    consumer.apply(isLogin).forRoutes('xxx')
  }
}