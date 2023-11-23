import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.model';

@Injectable()
export class ImageService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) { }

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const imageData = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      createdDate: Date.now(),
    };

    const newImage = new this.imageModel(imageData);
    return await newImage.save();
  }

  async getAllImages(): Promise<Image[]> {
    return await this.imageModel.find().exec();
  }

  async searchImagesByName(name: string): Promise<Image[]> {
    const images = await this.imageModel.find({ name: { $regex: name, $options: 'i' } }).exec();
    return images;
  }

  async searchImagesByType(type: string): Promise<Image[]> {
    const images = await this.imageModel.find({ type: { $regex: type, $options: 'i' } }).exec();
    return images;
  }

  async searchImagesByDate(createdAt: Date): Promise<Image[]> {
    const images = await this.imageModel.find({ createdAt }).exec();
    return images;
  }

  async searchImagesByConcept(concept: string): Promise<Image[]> {
    const images = await this.imageModel.find({ concept: { $regex: concept, $options: 'i' } }).exec();
    return images;
  }
}