import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Items,itemsDocument } from './schema/items.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name) private itemsModule: Model<itemsDocument>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const itemCreated = await this.itemsModule.create(createItemDto)
    return itemCreated
  }

  async findAll() {
    const list = await this.itemsModule.find({});
    return list
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
