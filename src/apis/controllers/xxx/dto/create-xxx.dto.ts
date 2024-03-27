import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateXxxDto {
    @IsEmail()
    name: string;

    @IsNotEmpty()
    age: number;
    
    breed: string;
}
