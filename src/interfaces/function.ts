/**kết quả trả về của hàm async await có try catch */
export interface ResultAwait<ErrorType = any, ResultType = any> {
    /**lỗi nếu có */
    e?: ErrorType
    /**kết quả trả về nếu có */
    r?: ResultType
}