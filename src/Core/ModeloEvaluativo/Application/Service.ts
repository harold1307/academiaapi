import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateModeloEvaluativo } from "../Domain/ICreateModeloEvaluativo";
import type { IModeloEvaluativo } from "../Domain/IModeloEvaluativo";
import type {
	IModeloEvaluativoRepository,
	IUpdateModeloEvaluativoParams,
} from "../Domain/IModeloEvaluativoRepository";
import type { IModeloEvaluativoService } from "../Domain/IModeloEvaluativoService";
import { CreateModeloEvaluativoDTO } from "../Infrastructure/DTOs/CreateModeloEvaluativoDTO";
import { UpdateModeloEvaluativoDTO } from "../Infrastructure/DTOs/UpdateModeloEvaluativoDTO";

@injectable()
export class ModeloEvaluativoService implements IModeloEvaluativoService {
	constructor(
		@inject(TYPES.ModeloEvaluativoRepository)
		private _modeloEvaluativoRepository: IModeloEvaluativoRepository,
	) {}

	getAllModeloEvaluativos(): Promise<IModeloEvaluativo[]> {
		return this._modeloEvaluativoRepository.getAll();
	}

	getModeloEvaluativoById(id: string): Promise<IModeloEvaluativo | null> {
		return this._modeloEvaluativoRepository.getById(id);
	}

	async deleteModeloEvaluativoById(id: string): Promise<IModeloEvaluativo> {
		const modelo = await this._modeloEvaluativoRepository.getById(id);

		if (!modelo)
			throw new ModeloEvaluativoServiceError("Modelo evaluativo no encontrado");

		if (modelo.enUso)
			throw new ModeloEvaluativoServiceError(
				"El modelo evaluativo esta en uso, no se puede eliminar",
			);

		return this._modeloEvaluativoRepository.deleteById(id);
	}

	createModeloEvaluativo(
		data: ICreateModeloEvaluativo,
	): Promise<IModeloEvaluativo> {
		const dto = new CreateModeloEvaluativoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear modelo evaluativo",
				JSON.stringify(validation.error, null, 2),
			);
			throw new ModeloEvaluativoServiceError(
				"Esquema para crear modelo evaluativo invalido",
			);
		}

		return this._modeloEvaluativoRepository.create(validation.data);
	}

	async updateModeloEvaluativoById({
		id,
		data,
	}: IUpdateModeloEvaluativoParams): Promise<IModeloEvaluativo> {
		const modelo = await this._modeloEvaluativoRepository.getById(id);

		if (!modelo)
			throw new ModeloEvaluativoServiceError("Modelo evaluativo no encontrado");

		if (modelo.enUso)
			throw new ModeloEvaluativoServiceError(
				"El modelo evaluativo esta en uso, no se puede actualizar",
			);

		const dto = new UpdateModeloEvaluativoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar modelo evaluativo",
				JSON.stringify(validation.error, null, 2),
			);
			throw new ModeloEvaluativoServiceError(
				"Esquema para actualizar modelo evaluativo invalido",
			);
		}

		return this._modeloEvaluativoRepository.update({
			id,
			data: validation.data,
		});
	}
}

class ModeloEvaluativoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ModeloEvaluativoServiceError";
	}
}
