import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ISesion } from "../Domain/ISesion.ts";
import type { ISesionRepository } from "../Domain/ISesionRepository.ts";
import type { ISesionService } from "../Domain/ISesionService.ts";
import type { ICreateSesion } from "../Domain/ICreateSesion";
import { CreateSesionDTO } from "../Infrastructure/DTOs/CreateSesionDTO";

@injectable()
export class SesionService implements ISesionService {
	constructor(
		@inject(TYPES.SesionRepository)
		private _sesionRepository: ISesionRepository,
	) {}

	getAllSesiones(): Promise<ISesion[]> {
		return this._sesionRepository.getAll();
	}

	getSesionById(id: string): Promise<ISesion | null> {
		return this._sesionRepository.getById(id);
	}

	async deleteSesionById(id: string): Promise<ISesion> {
		const sesion = await this._sesionRepository.getById(id);

		if (!sesion) throw new SesionServiceError("La sesion no existe");

		if (sesion.enUso) throw new SesionServiceError("La sesion esta en uso");

		return this._sesionRepository.deleteById(id);
	}

	createSesion(data: ICreateSesion): Promise<ISesion> {
		const dto = new CreateSesionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear sesion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new SesionServiceError("Esquema para crear sesion invalido");
		}

		return this._sesionRepository.create(validation.data);
	}

	// updateSesionById(params: IUpdateSesionParams): Promise<ISesion> {}
}

class SesionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "SesionServiceError";
	}
}
