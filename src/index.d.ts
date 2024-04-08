/**thêm khai báo cho express */
declare namespace Express {
    /**thêm thuộc tính cho req để chuyển dữ liệu giữa các middleware */
    export interface Request {
        /**fix lỗi i18n trong req không tồn tại */
        i18nService: import('nestjs-i18n').I18nService

        /**thêm dữ liệu custom */
        customData: string;
    }
}