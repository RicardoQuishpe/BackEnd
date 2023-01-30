import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VentaModule } from './modules-sv/venta.module';

@Module({
  imports: [VentaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
