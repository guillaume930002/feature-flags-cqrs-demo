import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AddFlagDto {
  @IsNumber()
  accountId: number;

  @IsString()
  name: string;

  @IsBoolean()
  isEnabled: boolean;
}
