import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesModule } from './Classes/classes.module';
import { StudentModule } from './Students/students.module';

const DB_CONNECTION_STRING = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/?ssl=${process.env.DB_SSL}&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${process.env.DB_USERNAME}@`

@Module({
  imports: [ClassesModule,
    StudentModule,
    MongooseModule.forRoot(
    DB_CONNECTION_STRING,
    { dbName: process.env.DB_NAME })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
