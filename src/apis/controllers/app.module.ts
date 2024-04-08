import { Module, Injectable, Controller, All } from '@nestjs/common'
import { Ok, ResFn } from '@/apis/decorators/res.decorator'

// nested api
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

  @All() index(@Ok() ok: ResFn) {    
    ok(this.service.pong())
  }
}

@Module({
  imports: [
    UserModule
  ],
  controllers: [ApiController],
  providers: [Service],
}) export default class ApiModule { }
