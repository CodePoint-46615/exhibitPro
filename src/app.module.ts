import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './Admin/admin/admin.controller';
import { AdminModule } from './Admin/admin/admin.module';
import { AdminService } from './Admin/admin/admin.service';

@Module({
  imports: [AdminModule],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {}
