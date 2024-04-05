import {
  MiddlewareConsumer, Module, NestModule, Controller, All, Injectable
} from '@nestjs/common'

// cấu hình serve static
import { ServeStaticModule } from '@nestjs/serve-static'

import { HeaderResolver, I18nModule } from 'nestjs-i18n'

// cấu hình các biến môi trường
import { ConfigModule } from '@nestjs/config'
import constants from '@/configs/constants'

// cấu hình logger
import { LoggerModule } from '@/core/logger'

// các middleware
import { isLogin } from '@/apis/middlewares/isLogin'
import { isAdmin } from '@/apis/middlewares/isAdmin'

// custom response request
import { Req, ReqType } from '@/apis/decorators/req.decorator'
import { Res, ResType } from '@/apis/decorators/res.decorator'

// i18n context
import { I18nService } from 'nestjs-i18n'
import type { I18nTranslations } from '@/langs/interface'

// cronjob
import { ScheduleModule } from '@nestjs/schedule'
import CronModule from '@/apis/schedules/cron.module'

// các api module
import AbcModule from '@/apis/controllers/app.module'
import XxxModule from '@/apis/controllers/public.module'

@Injectable() export class Service {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  /**gửi lời chào hệ thống */
  pong() {
    return this.i18n.t('COMMON.PONG')
  }
}

@Controller() export class ApiController {
  constructor(private readonly service: Service) { }

  /**trả về thông báo khi gọi "/" */
  @All() async all(
    @Req() req: ReqType,
    @Res() res: ResType
  ) {
    let p = req.allParams()

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

    // cấu hình i18n
    I18nModule.forRoot({
      // ngôn ngữ mặc định
      fallbackLanguage: 'vn',
      loaderOptions: {
        path: 'src/langs/',
        watch: true,
      },
      resolvers: [
        // cấu hình header để xác định ngôn ngữ
        new HeaderResolver(['locale'])
      ],
      // tạo interface cho các ngôn ngữ tự động
      typesOutputPath: 'src/langs/interface.ts',
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

    // cấu hình cronjob
    ScheduleModule.forRoot(), 
    CronModule,

    // các module api
    AbcModule,
    XxxModule,
  ],
  controllers: [ApiController],
  providers: [Service],
}) export default class ApiModule implements NestModule {
  /**cài đặt policy cho api */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isLogin, isAdmin).forRoutes('admin')
    consumer.apply(isLogin).forRoutes('app')
  }
}