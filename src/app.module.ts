import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './app/module/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './ormconfig';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),

    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
