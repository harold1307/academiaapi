import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICampoProyectoIntegrador } from "../Domain/ICampoProyectoIntegrador";
import type {
	ICampoProyectoIntegradorRepository,
	IUpdateCampoProyectoIntegradorParams,
} from "../Domain/ICampoProyectoIntegradorRepository";
import type { ICampoProyectoIntegradorService } from "../Domain/ICampoProyectoIntegradorService";
import type { ICreateCampoProyectoIntegrador } from "../Domain/ICreateCampoProyectoIntegrador";
import { CreateCampoProyectoIntegradorDTO } from "../Infrastructure/DTOs/CreateCampoProyectoIntegradorDTO";
import { UpdateCampoProyectoIntegradorDTO } from "../Infrastructure/DTOs/UpdateCampoProyectoIntegradorDTO";

@injectable()
export class CampoProyectoIntegradorService
	implements ICampoProyectoIntegradorService
{
	constructor(
		@inject(TYPES.CampoProyectoIntegradorRepository)
		private _campoProyectoIntegradorRepository: ICampoProyectoIntegradorRepository,
	) {}

	getAllCampoProyectosIntegradores(): Promise<ICampoProyectoIntegrador[]> {
		return this._campoProyectoIntegradorRepository.getAll();
	}

	getCampoProyectoIntegradorById(
		id: string,
	): Promise<ICampoProyectoIntegrador | null> {
		return this._campoProyectoIntegradorRepository.getById(id);
	}

	deleteCampoProyectoIntegradorById(
		id: string,
	): Promise<ICampoProyectoIntegrador> {
		return this._campoProyectoIntegradorRepository.deleteById(id);
	}

	createCampoProyectoIntegrador(
		data: ICreateCampoProyectoIntegrador,
	): Promise<ICampoProyectoIntegrador> {
		const dto = new CreateCampoProyectoIntegradorDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear campo de proyecto integrador",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CampoProyectoIntegradorServiceError(
				"Esquema para crear campo de proyecto integrador invalido",
			);
		}

		return this._campoProyectoIntegradorRepository.create(validation.data);
	}
	updateCampoProyectoIntegradorById({
		id,
		data,
	}: IUpdateCampoProyectoIntegradorParams): Promise<ICampoProyectoIntegrador> {
		const dto = new UpdateCampoProyectoIntegradorDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear campo de proyecto integrador",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CampoProyectoIntegradorServiceError(
				"Esquema para crear campo de proyecto integrador invalido",
			);
		}

		return this._campoProyectoIntegradorRepository.update({
			id,
			data: validation.data,
		});
	}
}

class CampoProyectoIntegradorServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CampoProyectoIntegradorServiceError";
	}
}
