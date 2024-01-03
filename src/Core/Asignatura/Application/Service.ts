import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaRepository } from "../Domain/IAsignaturaRepository";
import type { IAsignaturaService } from "../Domain/IAsignaturaService";
import type { IAsignatura, IAsignaturaWithIsUsed } from "../Domain/IAsignatura";
import { CreateAsignaturaDTO } from "../Infrastructure/DTOs/CreateAsignaturaDTO";
import { UpdateAsignaturaDTO } from "../Infrastructure/DTOs/UpdateAsignaturaDTO";

@injectable()
export class AsignaturaService implements IAsignaturaService {
	constructor(
		@inject(TYPES.AsignaturaRepository)
		private _asignaturaRepository: IAsignaturaRepository,
	) {}

	async createAsignatura(data: any): Promise<IAsignatura> {
		const dto = new CreateAsignaturaDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear de asignatura",
				validation.error,
			);
			throw new AsignaturaServiceError(
				"Esquema para crear de asignatura invalido.",
			);
		}

		return this._asignaturaRepository.create(validation.data);
	}

	async getAllAsignaturas(): Promise<IAsignaturaWithIsUsed[]> {
		return this._asignaturaRepository.getAll();
	}

	async getAsignaturaById(id: string): Promise<IAsignatura | null> {
		return this._asignaturaRepository.getById(id);
	}

	async deleteAsignaturaById(id: string): Promise<IAsignatura> {
		return this._asignaturaRepository.deleteById(id);
	}

	async updateAsignaturaById(params: {
		id: string;
		asignatura: any;
	}): Promise<IAsignatura> {
		const dto = new UpdateAsignaturaDTO(params.asignatura);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar asignatura",
				JSON.stringify(validation.error),
			);
			throw new AsignaturaServiceError(
				"Esquema para actualizar asignatura invalido.",
			);
		}

		return this._asignaturaRepository.update({
			id: params.id,
			asignatura: validation.data,
		});
	}
}

class AsignaturaServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AsignaturaServiceError";
	}
}
