import {IsString, IsOptional} from 'class-validator';

export class CreateClientDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    picture?: string;
}