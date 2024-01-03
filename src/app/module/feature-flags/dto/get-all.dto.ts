import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllFFDto {
  @IsOptional()
  @IsNumber()
  accountId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
