import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICampoFormacion } from "../Domain/ICampoFormacion";
import type { ICampoFormacionRepository } from "../Domain/ICampoFormacionRepository";
import type { ICampoFormacionService } from "../Domain/ICampoFormacionService";
import { CreateCampoFormacionDTO } from "../Infrastructure/DTOs/CreateCampoFormacionDTO";

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
}

class CampoFormacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.name = "CampoFormacionServiceError";
		this.message = message;
	}
}
