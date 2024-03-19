import { Controller, All } from '@nestjs/common'
import { AppService } from './app.service'
import { Res } from './decorators/res.decorator'

import type { ResType } from './decorators/res.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @All()
  sayGreeting(@Res() res: ResType) {
    res.ok(this.appService.sayGreeting())
  }
}