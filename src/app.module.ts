import { Module } from '@nestjs/common'

// cấu hình các biến môi trường
import { ConfigModule } from '@nestjs/config'
import constants from './configs/constants'

// cấu hình gốc của ứng dụng
import { AppController } from './app.controller'
import { AppService } from './app.service'

// cấu hình logger
import { LoggerModule } from './core/logger'

// các api module
import { AbcModule } from './apis/controllers/abc/abc.module'
import { XxxModule } from './apis/controllers/xxx/xxx.module'

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
    // cho phép logger có thể sử dụng ở mọi nơi
    LoggerModule,

    // các module api
    AbcModule, 
    XxxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}