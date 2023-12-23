import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IInstitucion } from "../Domain/IInstitucion";
import type { IInstitucionRepository } from "../Domain/IInstitucionRepository";
import type { IInstitucionService } from "../Domain/IInstitucionService";
import { CreateInstitucionDTO } from "../Infraestructure/DTOs/CreateInstitucionDTO";
import { UpdateInstitucionDTO } from "../Infraestructure/DTOs/UpdateInstitucionDTO";

@injectable()
export class InstitucionService implements IInstitucionService {
	constructor(
		@inject(TYPES.InstitucionRepository)
		private _institucionRepository: IInstitucionRepository,
	) {}

	async createInstitucion(data: any) {
		const dto = new CreateInstitucionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear de institucion",
				validation.error,
			);
			throw new InstitucionServiceError(
				"Esquema para crear de institucion invalido.",
			);
		}

		return this._institucionRepository.create(validation.data);
	}

	async getAllInstituciones() {
		return this._institucionRepository.getAll();
	}

	async getInstitucionById(id: string) {
		return this._institucionRepository.getById(id);
	}

	async updateInstitucionById({
		id,
		institucion,
	}: {
		id: string;
		institucion: any;
	}) {
		const dto = new UpdateInstitucionDTO(institucion);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar institucion",
				JSON.stringify(validation.error),
			);
			throw new InstitucionServiceError(
				"Esquema para actualizar institucion invalido.",
			);
		}

		return this._institucionRepository.update({
			id,
			institucion: validation.data,
		});
	}

	async deleteInstitucionById(id: string): Promise<IInstitucion> {
		return this._institucionRepository.deleteById(id);
	}
}

class InstitucionServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InstitucionServiceError";
	}
}
