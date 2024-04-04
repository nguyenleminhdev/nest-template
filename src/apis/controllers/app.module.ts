import { Module, Injectable, Controller, All } from '@nestjs/common'
import { Res, ResType } from '../decorators/res.decorator'

import UserModule from '@/apis/controllers/app/user.module'

@Injectable() export class Service {
  pong() {
    return 'pong'
  }
}

@Controller('app') export class ApiController {
  constructor(
    private readonly service: Service,
  ) { }

  @All() all(@Res() res: ResType) {
    res.ok(this.service.pong())
  }
}

@Module({
  imports: [
    UserModule
  ],
  controllers: [ApiController],
  providers: [Service],
}) export default class ApiModule { }
