import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      model: 'Car 1',
      brand: 'Brand 1',
    },
    {
      id: 2,
      model: 'Car 2',
      brand: 'Brand 2',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with ID ${id} not found`);

    return car;
  }
}
