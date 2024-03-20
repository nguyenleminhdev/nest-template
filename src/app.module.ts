import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// cấu hình gốc của ứng dụng
import { AppController } from './app.controller'
import { AppService } from './app.service'

// các api module
import { AbcModule } from './controllers/abc/abc.module'
import { XxxModule } from './controllers/xxx/xxx.module'

@Module({
  imports: [
    // cấu hình môi trường
    ConfigModule.forRoot({
      // nhập đường dẫn tệp tin môi trường động
      envFilePath: `src/envs/.${process.env.NODE_ENV || 'development'}.env`,
      // sử dụng mà không cần khai báo
      isGlobal: true,
      // tăng tốc độ đọc env
      cache: true,
    }),

    AbcModule, 
    XxxModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}