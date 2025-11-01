import { IsOptional, IsString, IsInt, Min, Max} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UpdateAuthorDto{
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}

export class GetAuthorsDto{
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
