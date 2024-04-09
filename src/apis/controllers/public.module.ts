import {
    Module, Controller, Injectable, All, UseInterceptors, UploadedFile, UseGuards
} from '@nestjs/common'
import { I18n, I18nContext } from 'nestjs-i18n'
import { AllParams } from '@/apis/decorators/req.decorator'
import { Ok, Err, ResFn } from '@/apis/decorators/res.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'

import type { I18nTranslations } from '@/langs/interface'

import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator'

/**dto validator test */
class TestDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNumber()
    xxx: string
}

@Injectable() export class Service {
    pong() {
        return 'pong'
    }
}

@Controller('public')
export class ApiController {
    constructor(private readonly service: Service) { }

    @All()
    @UseGuards(ThrottlerGuard)
    @UseInterceptors(FileInterceptor('file'))
    index(
        @UploadedFile() file: Express.Multer.File,
        @Ok() ok: ResFn,
        @I18n() i18n: I18nContext<I18nTranslations>
    ) {
        console.log(
            i18n.t('COMMON.PONG')

        )

        ok(this.service.pong())
    }

    @All('test')
    async test(
        @AllParams() p: TestDto,
        @Ok() ok: ResFn,
        @Err() err: ResFn,
        @I18n() i18n: I18nContext
    ) {
        // console.log('all :', p)

        throw new Error('123123123')

        // ok(p)
        err('COMMON.PONG')
    }
}

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 1000 * 30, // 30s
            limit: 3,
        }]),
    ],
    controllers: [ApiController],
    providers: [Service],
}) export default class ApiModule { }