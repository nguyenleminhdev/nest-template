import { Controller, All } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// custom response
import { Res } from './apis/decorators/res.decorator'
import type { ResType } from './apis/decorators/res.decorator'

import { Logger } from './core/logger'

// services
import { AppService } from './app.service'
import { hey, xxx } from './apis/services/crypto'

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

    hey().then((data) => {
      this.log.log('data', data)

      console.log(
        xxx(
          data.iv,
          data.key,
          data.encryptedText)
      )

    }
    ).catch((err) => {
      this.log.error('err', err)
    })

    res.ok(this.appService.sayGreeting())
  }
}