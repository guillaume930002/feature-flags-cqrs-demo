import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertUserDto {
  @Expose()
  @IsOptional()
  @IsString()
  id: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  roleId: number;

  @Exclude()
  @IsOptional()
  @IsString()
  password: string;

  @Expose()
  @IsOptional()
  @IsString()
  email: string;

  @Expose()
  @IsOptional()
  @IsString()
  phone: string;

  @Expose()
  @IsOptional()
  @IsString()
  status: string;
}


