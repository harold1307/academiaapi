import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import { type ICreateModeloNivelacion } from "../Domain/ICreateModeloNivelacion";
import type { IModeloNivelacion } from "../Domain/IModeloNivelacion";
import type {
	IModeloNivelacionRepository,
	IUpdateModeloNivelacionParams,
} from "../Domain/IModeloNivelacionRepository";
import type { IModeloNivelacionService } from "../Domain/IModeloNivelacionService";
import { CreateModeloNivelacionDTO } from "../Infrastructure/DTOs/CreateModeloNivelacionDTO";
import { UpdateModeloNivelacionDTO } from "../Infrastructure/DTOs/UpdateModeloNivelacionDTO";

@injectable()
export class ModeloNivelacionService implements IModeloNivelacionService {
	constructor(
		@inject(TYPES.ModeloNivelacionRepository)
		private _modeloNivelacionRepository: IModeloNivelacionRepository,
	) {}

	getAllModelosNivelacion(): Promise<IModeloNivelacion[]> {
		return this._modeloNivelacionRepository.getAll();
	}

	getModeloNivelacionById(id: string): Promise<IModeloNivelacion | null> {
		return this._modeloNivelacionRepository.getById(id);
	}

	async deleteModeloNivelacionById(id: string): Promise<IModeloNivelacion> {
		const modelo = await this._modeloNivelacionRepository.getById(id);

		if (!modelo)
			throw new ModeloNivelacionServiceError(
				"Modelo de nivelacion no encontrado",
			);

		if (modelo.enUso)
			throw new ModeloNivelacionServiceError(
				"El modelo de nivelacion esta en uso, no se puede eliminar",
			);

		return this._modeloNivelacionRepository.deleteById(id);
	}

	createModeloNivelacion(
		data: ICreateModeloNivelacion,
	): Promise<IModeloNivelacion> {
		const dto = new CreateModeloNivelacionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear modelo de nivelacion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new ModeloNivelacionServiceError(
				"Esquema para crear modelo de nivelacion invalido",
			);
		}

		return this._modeloNivelacionRepository.create(validation.data);
	}
	async updateModeloNivelacionById({
		data,
		id,
	}: IUpdateModeloNivelacionParams): Promise<IModeloNivelacion> {
		const nivelacion = await this._modeloNivelacionRepository.getById(id);

		if (!nivelacion)
			throw new ModeloNivelacionServiceError(
				"Modelo de nivelacion no encontrado",
			);

		if (nivelacion.enUso)
			throw new ModeloNivelacionServiceError(
				"El modelo de nivelacion esta en uso, no se puede actualizar",
			);

		const dto = new UpdateModeloNivelacionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar modelo de nivelacion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new ModeloNivelacionServiceError(
				"Esquema para actualizar modelo de nivelacion invalido",
			);
		}

		return this._modeloNivelacionRepository.update({
			id,
			data: validation.data,
		});
	}
}

class ModeloNivelacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ModeloNivelacionServiceError";
	}
}
