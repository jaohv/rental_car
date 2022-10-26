import { ICreateCarDTO } from "modules/cars/dtos/ICreateCarDTO"
import { Cars } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../ICarsRepository"

class CarsRepositoryInMemory implements ICarsRepository{
	cars: Cars[] = []

	async create(data: ICreateCarDTO): Promise<Cars> {
		const {brand, category_id, daily_rate, description, fine_amount, name, license_plate} = data
		const newCar = new Cars()

		Object.assign(newCar, {
			brand, 
			category_id, 
			daily_rate, 
			description, 
			fine_amount, 
			name, 
			license_plate
		})

		this.cars.push(newCar)
		return newCar
	}

	async findByLicensePlate(license_plate: string): Promise<Cars> {
		return this.cars.find(cars => cars.license_plate === license_plate)
	}

	async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Cars[]> {
		const cars = this.cars.filter((car) => {
			if(car.available === true || (brand && car.brand === brand) || (category_id && car.category_id === category_id) || (name && car.name === name )){
				return car
			}

			return null
		})
 
		return cars
	}

	async findById(id: string): Promise<Cars> {
		return this.cars.find(car => car.id === id)
	}
}

export {CarsRepositoryInMemory}