import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';

import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { FileUpload } from './entities/file-upload.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}

  create(createFileUploadDto: CreateFileUploadDto) {
    return 'This action adds a new fileUpload';
  }

  findAll() {
    return `This action returns all fileUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUpload`;
  }

  update(id: number, updateFileUploadDto: UpdateFileUploadDto) {
    return `This action updates a #${id} fileUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileUpload`;
  }

  async upload(file) {
    const { originalname } = file;
    const bucketS3 = process.env.S3BUCKET;
    const uploadData = await this.uploadS3(file.buffer, bucketS3, originalname);
    return uploadData;
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    const awsData = await new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
    console.log('\n+++\tfile upload success\n');

    const data = await this.fileUploadRepository.save(awsData);

    // This block Process the file
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const getParams = {
      Bucket: data.Bucket, // your bucket name,
      Key: data.Key, // path to the object you're looking for
    };
    s3.getObject(getParams)
      .createReadStream()
      .pipe(csv())
      .on('data', async (dataRes) => {
        await timeout(3000);
        console.log(dataRes);
      });
    // This block Process the file

    return data;
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.ACCESSKEY,
      secretAccessKey: process.env.SECRETKEY,
    });
  }
}
