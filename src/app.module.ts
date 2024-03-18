import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbcModule } from './abc/abc.module';
import { XxxModule } from './xxx/xxx.module';

@Module({
  imports: [AbcModule, XxxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
