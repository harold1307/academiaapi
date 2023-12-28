import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnMalla } from "../Domain/IAsignaturaEnMalla";
import type { IAsignaturaEnMallaRepository } from "../Domain/IAsignaturaEnMallaRepository";
import type { IAsignaturaEnMallaService } from "../Domain/IAsignaturaEnMallaService";
import type { ICreateAsignaturaEnMalla } from "../Domain/ICreateAsignaturaEnMalla";
import { CreateAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/CreateAsignaturaEnMallaDTO";

@injectable()
export class AsignaturaEnMallaService implements IAsignaturaEnMallaService {
	constructor(
		@inject(TYPES.AsignaturaEnMallaRepository)
		private _asignaturaEnMallaRepository: IAsignaturaEnMallaRepository,
	) {}

	async createAsignaturaEnMalla(
		data: any,
		mallaId: string,
		asignaturaId: string,
	): Promise<IAsignaturaEnMalla> {
		const dto = new CreateAsignaturaEnMallaDTO({
			...data,
			mallaId,
			asignaturaId,
		} as ICreateAsignaturaEnMalla);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error en la validacion del body de la peticion",
				JSON.stringify(validation.error, null, 2),
			);

			throw new AsignaturaEnMallaServiceError(
				"Error en la validacion del body de la peticion",
			);
		}

		return this._asignaturaEnMallaRepository.create(validation.data);
	}
}

class AsignaturaEnMallaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}
