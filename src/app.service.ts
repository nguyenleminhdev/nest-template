import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayGreeting(): string {
    return 'Server loading successfully!';
  }
}
