import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnMalla } from "../Domain/IAsignaturaEnMalla";
import type { IAsignaturaEnMallaRepository } from "../Domain/IAsignaturaEnMallaRepository";
import type {
	IAsignaturaEnMallaService,
	ICreateAnexoAsignaturaEnMallaParams,
} from "../Domain/IAsignaturaEnMallaService";
import type { ICreateAsignaturaEnMalla } from "../Domain/ICreateAsignaturaEnMalla";
import { CreateAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/CreateAsignaturaEnMallaDTO";
import { CreateAnexoAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/CreateAnexoAsignaturaEnMallaDTO";

@injectable()
export class AsignaturaEnMallaService implements IAsignaturaEnMallaService {
	constructor(
		@inject(TYPES.AsignaturaEnMallaRepository)
		private _asignaturaEnMallaRepository: IAsignaturaEnMallaRepository,
	) {}

	createAsignaturaEnMalla(
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

	createAnexoAsignaturaEnMalla({
		asignaturaId,
		data,
		mallaId,
	}: ICreateAnexoAsignaturaEnMallaParams): Promise<IAsignaturaEnMalla> {
		const dto = new CreateAnexoAsignaturaEnMallaDTO({
			...data,
			asignaturaId,
			mallaId,
		});
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error en la validacion del esquema para crear anexo de asignatura en malla.",
				JSON.stringify(validation.error, null, 2),
			);

			throw new AsignaturaEnMallaServiceError(
				"Error en la validacion del esquema para crear anexo de asignatura en malla.",
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
