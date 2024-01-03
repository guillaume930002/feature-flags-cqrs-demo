import { Exclude, Expose } from "class-transformer";
import { IsOptional, IsString, IsNumber } from "class-validator";

export class GetAllUsersDto {
  @IsOptional()
  @IsString()
  id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsNumber()
  roleId: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  status: string;
}
