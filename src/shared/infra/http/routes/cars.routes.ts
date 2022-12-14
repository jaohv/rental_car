import { Router } from "express"
import multer from "multer"
import uploadConfig from "../../../../config/upload"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailable/ListAvailableCarsController"
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadImages/UploadCarImagesController"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarsImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id/", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id/", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarsImagesController.handle)

export { carsRoutes }