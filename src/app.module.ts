import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarshipsModule } from './starships/starships.module';

@Module({
  imports: [StarshipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
