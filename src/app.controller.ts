import { Controller, All } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// custom response
import { Res } from './decorators/res.decorator'
import type { ResType } from './decorators/res.decorator'

// services
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) { }

  @All()
  sayGreeting(@Res() res: ResType) {
    console.log('hey:', this.configService.get('NEST_POST'))

    res.ok(this.appService.sayGreeting())
  }
}