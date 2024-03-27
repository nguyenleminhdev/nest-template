import { Controller, All } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// custom response
import { Res } from './apis/decorators/res.decorator'
import type { ResType } from './apis/decorators/res.decorator'

import { Logger } from './core/logger'

// services
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly log: Logger,
  ) { 
    // đặt nhãn cho logger
    log.setContext('AppController')
  }

  @All()
  sayGreeting(@Res() res: ResType) {

    this.log.log('log')
    this.log.error('error')
    this.log.warn('warn')
    this.log.debug('debug')
    this.log.verbose('verbose')
    this.log.fatal('fatal')

    console.log(
      'hey:',
      this.configService.get('test'),
      this.configService.get('NEST_POST')
    )

    res.ok(this.appService.sayGreeting())
  }
}