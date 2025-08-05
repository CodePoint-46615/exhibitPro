import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './Host/host.module';
import { HostService } from './Host/host.service';
import { HostController } from './Host/host.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [HostModule ,TypeOrmModule.forRoot(
    {
      type : 'postgres',
      host:'localhost' ,
      port : 5432 ,
      username : 'postgres' ,
      password : '1234',
      database : 'exhibitPro',
      autoLoadEntities : true,
      synchronize : true,
    }
  ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
