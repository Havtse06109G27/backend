import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.module';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
  create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: number, user: User) {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }
}
