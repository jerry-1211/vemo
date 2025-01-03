import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMemosDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;
}