import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './Host/host.module';
import { HostService } from './Host/host.service';
import { HostController } from './Host/host.controller';
@Module({
  imports: [HostModule],
  controllers: [AppController,HostController],
  providers: [AppService,HostService],
})
export class AppModule {}
