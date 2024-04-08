import { Module, Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ConfigService } from '@nestjs/config'

@Injectable() class AService {
    @Cron(CronExpression.EVERY_10_SECONDS, {
        timeZone: 'Asia/Ho_Chi_Minh',
        disabled: true
    }) cron() {
        console.log('mỗi 10s')
    }
}

@Injectable() class BService {
    constructor(private readonly configService: ConfigService) { }

    @Cron('* * * * * *', {
        timeZone: 'Asia/Ho_Chi_Minh',
        disabled: true
    }) test() {
        console.log('mỗi 1s', this.configService.get('NEST_TIMEZONE'))
    }
}

@Module({
    providers: [AService, BService]
}) export default class CronModule { }