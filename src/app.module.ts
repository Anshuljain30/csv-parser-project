import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    FileUploadModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
