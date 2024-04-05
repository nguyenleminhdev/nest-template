import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto'
import { promisify } from 'util'
import { hash, compare } from 'bcrypt'

import type { ResultAwait } from '@/interfaces/function'

/**mã hoá dữ liệu đối xứng */
export async function ENCRYPT_TEXT(
    input: string,
    password: string = '123456'
): Promise<ResultAwait> {
    try {
        /**tạo ra vector khởi tạo ngẫu nhiên */
        const IV = randomBytes(16)
        /**rạo ra key random từ mật khẩu */
        const KEY = await promisify(scrypt)(password, 'salt', 32) as Buffer

        /**đối tượng mã hoá */
        const CIPHER = createCipheriv('aes-256-ctr', KEY, IV)

        /**dữ liệu được mã hoá dữ liệu */
        const ENCRYPTED_TEXT = Buffer.concat([
            CIPHER.update(input),
            CIPHER.final()
        ])

        /**kết quả trả về chuyển thành string hex */
        const RESULT = {
            key: KEY.toString('hex'),
            iv: IV.toString('hex'),
            encrypted_text: ENCRYPTED_TEXT.toString('hex')
        }

        return { r: RESULT }
    } catch (e) { return { e } }
}

/**giải mã dữ liệu đối xứng */
export function DECRIPT_TEXT(
    key: string,
    iv: string,
    encryptedText: string
): ResultAwait {
    try {
        /**chuyển iv từ hex về buffer */
        const IV = Buffer.from(iv, 'hex')
        /**chuyển key từ hex về buffer */
        const KEY = Buffer.from(key, 'hex')
        /**chuyển encryptedText từ hex về buffer */
        const ENCRYPTED_TEXT = Buffer.from(encryptedText, 'hex')

        /**đối tượng giải mã */
        const DE_CIPHER = createDecipheriv('aes-256-ctr', KEY, IV)

        /**dữ liệu được giải mã */
        const DECRYPTED_TEXT = Buffer.concat([
            DE_CIPHER.update(ENCRYPTED_TEXT),
            DE_CIPHER.final(),
        ])

        // kết quả trả về chuyển thành string
        return { r: DECRYPTED_TEXT.toString() }
    } catch (e) { return { e } }
}

/**băm dữ liệu */
export async function HASH(
    input: string,
    round: number = 6
): Promise<ResultAwait> {
    try {
        /**mã hoá dữ liệu */
        const HASH = await hash(input, round)

        return { r: HASH }
    } catch (e) { return { e } }
}

/**so sánh chuỗi gốc và mã băm */
export async function COMPARE(
    input: string,
    hash: string
): Promise<ResultAwait> {
    try {
        /**so sánh chuỗi gốc và mã băm */
        const IS_MATCH = await compare(input, hash)

        return { r: IS_MATCH }
    } catch (e) { return { e } }
}