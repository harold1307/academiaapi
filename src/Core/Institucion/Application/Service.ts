import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IInstitucionRepository } from "../Domain/IInstitucionRepository";
import type { IInstitucionService } from "../Domain/IInstitucionService";
import { CreateInstitucionDTO } from "../Infraestructure/DTOs/CreateInstitucionDTO";

@injectable()
export class InstitucionService implements IInstitucionService {
	constructor(
		@inject(TYPES.InstitucionRepository)
		private _institucionRepository: IInstitucionRepository,
	) {}

	createInstitucion(data: any) {
		const dto = new CreateInstitucionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.log("Error de validacion de institucion", validation.error);
			throw new InstitucionServiceError("Esquema de institucion invalido.");
		}

		return this._institucionRepository.create(validation.data);
	}
}

class InstitucionServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InstitucionServiceError";
	}
}
