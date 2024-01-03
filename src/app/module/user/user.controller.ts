import { Controller, Get, Post, HttpCode, Param, Req, Put, Body, UseGuards, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpsertUserDto } from "./dto/upsert-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { FeatureFlagGuard } from "../../shared/feature-flags/feature-flags.guard";
import { GetAllUsersDto } from "./dto/get-all-users.dto";

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(
    private readonly userSvc: UserService
  ) { }

  @Get()
  @HttpCode(200)
  async getAll(@Query() query: GetAllUsersDto) {
    return await this.userSvc.getAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') id: string) {
    return await this.userSvc.getUserById(id);
  }

  @UseGuards(FeatureFlagGuard('add-user'))
  @Post()
  @HttpCode(200)
  async addUser(@Req() req, @Body() body: UpsertUserDto) {
    return await this.userSvc.addUser(body);
  }

  @UseGuards(FeatureFlagGuard('update-user'))
  @Put()
  @HttpCode(200)
  async updateUser(@Req() req, @Body() body: UpsertUserDto) {
    return await this.userSvc.updateUser(body);
  }
}