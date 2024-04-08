import { Module, Injectable, Controller, All } from '@nestjs/common'
import { Ok, ResFn } from '@/apis/decorators/res.decorator'

@Injectable() export class Service {
  pong() {
    return 'pong'
  }
}

@Controller('app/user') export class ApiController {
  constructor(
    private readonly service: Service,
  ) { }

  @All() index(@Ok() ok: ResFn) {
    ok(this.service.pong())
  }
}

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [Service],
}) export default class ApiModule { }
