import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../../entities/users.entity";
import { EncryptService } from "../encrypt/encrypt.service";
import { LoginModel } from "../../module/login/model/login.model";
import { plainToInstance } from "class-transformer";

@Injectable()
export class AuthService {
  constructor(
    private encyptService: EncryptService,
    private jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const info = await this.userRepository.findOne({ where: { username } });
      if (info) {
        if (!info.salt) { // salt null
          return {
            id: info.id,
            salt: null
          };
        } else {
          const hashedPassword = this.encyptService.getPassword(password, info.salt);
          if (info.hashedPassword == hashedPassword) {
            console.log('info', info);
            return info;
          } else {
            return {};
          }
        }
      } else {
        return {};
      }

    } catch (error) {
      return null;
    }
  }

  generateToken(user): LoginModel {
    const payload = {
      id: user.id,
      name: user.username,
      role: user.roleId,
      status: user.status
    };
    const token = this.jwtService.sign(payload, { expiresIn: `24h` });
    const loginModel = plainToInstance(LoginModel, { ...payload, token });
    return loginModel;
  }
}
