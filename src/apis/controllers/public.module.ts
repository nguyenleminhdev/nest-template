import { Module, Controller, Injectable, All } from '@nestjs/common'
import { Res, ResType } from '../decorators/res.decorator'

@Injectable() export class Service {
  pong() {
    return 'pong'
  }
}

@Controller('public') export class ApiController {
  constructor(private readonly service: Service) { }

  @All() all(@Res() res: ResType) {
    res.ok(this.service.pong())
  }
}

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [Service],
}) export default class ApiModule { }