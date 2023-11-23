import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from './image.model';
import { ImageService } from './images.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Image> {
    return this.imageService.uploadImage(file);
  }

  @Get()
  async getAllImages(): Promise<Image[]> {
    return this.imageService.getAllImages();
  }

  @Get('/searchByName')
  async searchImagesByName(@Query('name') name: string): Promise<any> {
    const images = await this.imageService.searchImagesByName(name);
    return { data: images };

  }

  @Get('/searchByType')
  async searchImagesByType(@Query('type') type: string): Promise<any> {
    const images = await this.imageService.searchImagesByType(type);
    return { data: images };
  }

  @Get('/searchByDate')
  async searchImagesByDate(@Query('createdAt') createdAt: Date): Promise<any> {
    const images = await this.imageService.searchImagesByDate(createdAt);
    return { data: images };
  }

  @Get('/searchByDate')
  async searchImagesByConcept(@Query('concept') concept: string): Promise<any> {
    const images = await this.imageService.searchImagesByConcept(concept);
    return { data: images };
  }
}
