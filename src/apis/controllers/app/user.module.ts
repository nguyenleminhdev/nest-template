import { Module, Injectable, Controller, All } from '@nestjs/common'
import { Req, ReqType } from '@/apis/decorators/req.decorator'
import { Res, ResType } from '@/apis/decorators/res.decorator'

@Injectable() export class Service {
  pong() {
    return 'pong'
  }
}

@Controller('app/user') export class ApiController {
  constructor(
    private readonly service: Service,
  ) { }

  @All() all(@Req() req: ReqType, @Res() res: ResType) {
    let p = req.allParams()
    
    res.ok(this.service.pong())
  }
}

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [Service],
}) export default class ApiModule { }
