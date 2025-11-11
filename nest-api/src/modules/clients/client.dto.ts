import {IsString, IsOptional, Min, Max, IsInt} from 'class-validator';

export class CreateClientDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email?: string;

    @IsString()
    @IsOptional()
    picture?: string;
}

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    picture?: string;
}

export class GetClientDto {
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number;

    @IsInt()
    @Min(0)
    offset: number;

    @IsString()
    @IsOptional()

    sort?: string;
}