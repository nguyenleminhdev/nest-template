import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto'
import { promisify } from 'util'

export async function ENCRYPT_TEXT(input: string, password: string = '123456') {
    /**tạo ra vector khởi tạo ngẫu nhiên */
    const IV = randomBytes(16)

    // console.log(iv.toString('hex'))

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, IV);


    const encryptedText = Buffer.concat([
        cipher.update(input),
        cipher.final(),
    ])

    return {
        key,
        IV,
        password,
        encryptedText
    };
}


export function xxx(
    iv: Buffer,
    key: Buffer,
    encryptedText: Buffer) {


    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    // const decipher = createDecipheriv('aes-256-ctr', key, null);
    const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);

    return decryptedText.toString()

}

