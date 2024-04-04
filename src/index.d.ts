/**thêm khai báo cho express */
declare namespace Express {
    /**thêm thuộc tính cho req để chuyển dữ liệu giữa các middleware */
    export interface Request {
        /**hoặc kiểu dữ liệu phù hợp với nhu cầu của bạn */
        customData: string; 
    }
}