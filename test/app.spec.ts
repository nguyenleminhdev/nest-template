import { Test, TestingModule } from '@nestjs/testing'
import { Service } from '@/app.module'

describe('AbcService', () => {
  let service: Service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Service],
    }).compile()

    service = module.get<Service>(Service)
  })

  it(
    'Kết quả phải là String',
    () => expect(typeof service.pong()).toBe('string')
  )
})
