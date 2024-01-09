import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICampoFormacion } from "../Domain/ICampoFormacion";
import type { ICampoFormacionRepository } from "../Domain/ICampoFormacionRepository";
import type { ICampoFormacionService } from "../Domain/ICampoFormacionService";
import { CreateCampoFormacionDTO } from "../Infrastructure/DTOs/CreateCampoFormacionDTO";
import { UpdateCampoFormacionDTO } from "../Infrastructure/DTOs/UpdateCampoFormacionDTO";

@injectable()
export class CampoFormacionService implements ICampoFormacionService {
	constructor(
		@inject(TYPES.CampoFormacionRepository)
		private _campoFormacionRepository: ICampoFormacionRepository,
	) {}

	createCampoFormacion(data: any): Promise<ICampoFormacion> {
		const dto = new CreateCampoFormacionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear de campo de formacion",
				validation.error,
			);
			throw new CampoFormacionServiceError(
				"Esquema para crear campo de formacion invalido.",
			);
		}

		return this._campoFormacionRepository.create(validation.data);
	}

	getCampoFormacionById(id: string): Promise<ICampoFormacion | null> {
		return this._campoFormacionRepository.getById(id);
	}

	getAllCampoFormacions(): Promise<ICampoFormacion[]> {
		return this._campoFormacionRepository.getAll();
	}

	async deleteCampoFormacionById(id: string): Promise<ICampoFormacion> {
		const campo = await this._campoFormacionRepository.getById(id);

		if (!campo)
			throw new CampoFormacionServiceError(
				"El campo de formacion a eliminar no existe",
			);

		if (campo.enUso)
			throw new CampoFormacionServiceError(
				"El campo de formacion a eliminar esta en uso",
			);

		return this._campoFormacionRepository.deleteById(id);
	}

	async updateCampoFormacionById(params: {
		id: string;
		campoFormacion: unknown;
	}): Promise<ICampoFormacion> {
		const campo = await this._campoFormacionRepository.getById(params.id);

		if (!campo)
			throw new CampoFormacionServiceError(
				"El campo de formacion a eliminar no existe",
			);

		if (campo.enUso)
			throw new CampoFormacionServiceError(
				"El campo de formacion a eliminar esta en uso",
			);

		const dto = new UpdateCampoFormacionDTO(params.campoFormacion);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar de campo de formacion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CampoFormacionServiceError(
				"Esquema para actualizar campo de formacion invalido.",
			);
		}

		return this._campoFormacionRepository.update({
			id: params.id,
			campoFormacion: validation.data,
		});
	}
}

class CampoFormacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.name = "CampoFormacionServiceError";
		this.message = message;
	}
}
