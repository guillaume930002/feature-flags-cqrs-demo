import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../../entities/users.entity";
import { ILike, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { EncryptService } from "../../../shared/encrypt/encrypt.service";
import { UserModel } from "../models/user.model";
import { GetAllUsersDto } from "../dto/get-all-users.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    private readonly encryptSvc: EncryptService
  ) { }

  async addUser(body): Promise<any> {
    const { password } = body;
    if (password) {
      const passObj = this.encryptSvc.generatePassword(password);
      body.hashedPassword = passObj.hashedPassword;
      body.salt = passObj.salt;
    }

    const data = plainToInstance(Users, body);
    const result = await this.userRepo.save(data);
    // const userModel = plainToInstance(UserModel, result);
    return result;
  }

  async updateUser(id, body): Promise<any> {
    const { password = '' } = body;
    if (password) {
      const passObj = this.encryptSvc.generatePassword(password);
      body.hashedPassword = passObj.hashedPassword;
      body.salt = passObj.salt;
    }

    const data = plainToInstance(Users, body, { excludeExtraneousValues: true });
    const result = await this.userRepo.update(id, data);
    // const userModel = plainToInstance(UserModel, result);
    return result;
  }

  async getAll(query: GetAllUsersDto): Promise<any> {
    const { id, username, roleId, email, phone, status } = query;
    const userInfo = await this.userRepo.find({
      where: {
        id: id ? id : undefined,
        username: username ? ILike('%' + username + '%') : undefined,
        roleId: roleId ? roleId : undefined,
        email: email ? ILike('%' + email + '%') : undefined,
        phone: phone ? ILike('%' + phone + '%') : undefined,
        status: status ? ILike('%' + status + '%') : undefined,
      }
    });
    return userInfo;
  }

  async getUserById(id): Promise<any> {
    const userInfo = await this.userRepo.findOne({ where: { id } });
    return userInfo;
  }
}
