import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  @IsOptional()
  readonly jwtExpireIn: number;
}
