import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/?ssl=${process.env.DB_SSL}&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${process.env.DB_USERNAME}@`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
