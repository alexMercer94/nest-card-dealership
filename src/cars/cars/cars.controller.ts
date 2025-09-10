import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from '../services/cars/cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    const car = this.carsService.findOne(id);
    return { car };
  }

  @Post()
  createCar(@Body() body: any) {
    return {
      body,
      message: 'Car created successfully',
    };
  }

  @Patch(':id')
  updateCar(@Body() body: any) {
    return {
      body,
      message: 'Car updated successfully',
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
      message: 'Car updated successfully',
    };
  }
}
