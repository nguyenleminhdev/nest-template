import { Module, Injectable, Controller, All } from '@nestjs/common'
import { Req, ReqType } from '@/apis/decorators/req.decorator'
import { Res, ResType } from '@/apis/decorators/res.decorator'

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

  @All() all(@Req() req: ReqType, @Res() res: ResType) {
    let p = req.allParams()
    
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
