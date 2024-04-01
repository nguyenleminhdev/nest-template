import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  /**gửi lời chào hệ thống */
  sayGreeting(): string {
    return 'Server loading successfully!'
  }
}
