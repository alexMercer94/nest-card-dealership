import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from 'src/cars/dto';
import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      model: 'Car 1',
      brand: 'Brand 1',
    },
    {
      id: uuid(),
      model: 'Car 2',
      brand: 'Brand 2',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car?.id === id);

    if (!car) throw new NotFoundException(`Car with ID ${id} not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOne(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(
        `Car with ID ${updateCarDto.id} is not valid inside body`,
      );

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...car,
          ...updateCarDto,
          id,
        };

        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const carDB = this.findOne(id);

    if (!carDB) throw new NotFoundException(`Car with ID ${id} is not valid`);

    this.cars = this.cars.filter((car) => car.id !== id);

    return {
      id,
      message: 'Car deleted successfully',
    };
  }
}
