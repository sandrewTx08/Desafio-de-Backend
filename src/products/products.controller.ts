import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: Prisma.ProductsCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductsUpdateInput,
  ) {
    return this.productsService.update({ id: +id }, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove({ id: +id });
  }
}
