import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFlagDto {
  @IsNumber()
  id: number;

  @IsString()
  accountId: string;

  @IsString()
  name: string;

  @IsBoolean()
  isEnabled: boolean;
}
