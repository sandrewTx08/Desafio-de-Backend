import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { Prisma } from '@prisma/client';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  create(@Body() createProductTypeDto: Prisma.ProductTypesCreateInput) {
    return this.productTypesService.create(createProductTypeDto);
  }

  @Get()
  findAll() {
    return this.productTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productTypesService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductTypeDto: Prisma.ProductTypesUpdateInput,
  ) {
    return this.productTypesService.update({ id }, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productTypesService.remove({ id });
  }
}
