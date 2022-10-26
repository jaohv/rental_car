import { ICarsRepository } from "../../../cars/repositories/ICarsRepository"
import { AppError } from "../../../../shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { ISpecificationsRepository } from "../../../cars/repositories/ISpecificationsRepository"
import { Cars } from "modules/cars/infra/typeorm/entities/Car"

interface IRequest { 
    car_id: string
    specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase{
	constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
		@inject("SpecificationsRepository")
		private specificationRepository: ISpecificationsRepository
	){}

	async execute({ car_id, specifications_id}: IRequest): Promise<Cars>{
		const carExists = await this.carsRepository.findById(car_id)

		if(!carExists) throw new AppError("Car does not exists", 400)

		const specifications = await this.specificationRepository.findByIds(specifications_id)

		carExists.specifications = specifications

		await this.carsRepository.create(carExists)

		return carExists
	}
}

export { CreateCarSpecificationUseCase }
