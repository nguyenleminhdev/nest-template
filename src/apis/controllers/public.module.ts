import {
    Module, Controller, Injectable, All, UseInterceptors, UploadedFile, Req as RawReq, UseGuards
} from '@nestjs/common'
import { I18n, I18nContext } from 'nestjs-i18n'
import { Req, ReqType } from '@/apis/decorators/req.decorator'
import { Res, ResType } from '@/apis/decorators/res.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { Request } from 'express'

import type { I18nTranslations } from '@/langs/interface'

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
    all(
        @UploadedFile() file: Express.Multer.File,
        @RawReq() raw_req: Request,
        @Req() req: ReqType,
        @Res() res: ResType,
        @I18n() i18n: I18nContext<I18nTranslations>
    ) {
        let p = req.allParams()

        res.ok(this.service.pong())
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