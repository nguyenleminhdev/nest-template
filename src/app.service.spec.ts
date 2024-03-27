import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from './app.service'

describe('AbcService', () => {
  let service: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile()

    service = module.get<AppService>(AppService)
  })

  it(
    'Kết quả phải là String',
    () => expect(typeof service.sayGreeting()).toBe('string')
  )
})
