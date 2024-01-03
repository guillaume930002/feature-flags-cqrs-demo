import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, Req, ValidationPipe } from "@nestjs/common";
import { FeatureFlagsService } from "./feature-flags.service";
import { AddFlagDto } from "./dto/add-flag.dto";
import { UpdateFlagDto } from "./dto/update-flag.dto";
import { GetAllFFDto } from "./dto/get-all.dto";

@Controller('ff')
export class FeatureFlagsController {
  constructor(
    private readonly ffSvc: FeatureFlagsService
  ) { }

  @Get()
  @HttpCode(200)
  async getAll(@Query(new ValidationPipe({
    transform: true,

  })) query: GetAllFFDto) {
    return await this.ffSvc.getAllFFlags(query);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return await this.ffSvc.getFlag(+id);
  }

  @Post()
  @HttpCode(200)
  async add(@Req() req, @Body() body: AddFlagDto) {
    return await this.ffSvc.addFlag(body);
  }

  @Put()
  @HttpCode(200)
  async update(@Req() req, @Body() body: UpdateFlagDto) {
    return await this.ffSvc.updateFlag(body);
  }
}
