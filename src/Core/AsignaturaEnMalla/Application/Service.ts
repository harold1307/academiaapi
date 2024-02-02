import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnMalla } from "../Domain/IAsignaturaEnMalla";
import type {
	IAsignaturaEnMallaRepository,
	UpdateAsignaturaEnMallaParams,
} from "../Domain/IAsignaturaEnMallaRepository";
import type {
	CreateAnexoAsignaturaEnMallaParams,
	CreateAsignaturaEnMallaParams,
	IAsignaturaEnMallaService,
} from "../Domain/IAsignaturaEnMallaService";
import type { ICreateAsignaturaEnMalla } from "../Domain/ICreateAsignaturaEnMalla";
import type { IUpdateAnexoAsignaturaEnMalla } from "../Domain/IUpdateAnexoAsignaturaEnMalla";
import { CreateAnexoAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/CreateAnexoAsignaturaEnMallaDTO";
import { CreateAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/CreateAsignaturaEnMallaDTO";
import { UpdateAnexoAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/UpdateAnexoAsignaturaEnMallaDTO";
import { UpdateAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/UpdateAsignaturaEnMallaDTO";

@injectable()
export class AsignaturaEnMallaService implements IAsignaturaEnMallaService {
	constructor(
		@inject(TYPES.AsignaturaEnMallaRepository)
		private _asignaturaEnMallaRepository: IAsignaturaEnMallaRepository,
	) {}

	createAsignaturaEnMalla({
		data,
		mallaId,
		asignaturaId,
	}: CreateAsignaturaEnMallaParams): Promise<IAsignaturaEnMalla> {
		const dto = new CreateAsignaturaEnMallaDTO({
			...data,
			mallaId,
			asignaturaId,
		} satisfies ICreateAsignaturaEnMalla);

		return this._asignaturaEnMallaRepository.create(dto.getData());
	}

	createAnexoAsignaturaEnMalla({
		asignaturaId,
		data,
		mallaId,
	}: CreateAnexoAsignaturaEnMallaParams): Promise<IAsignaturaEnMalla> {
		const dto = new CreateAnexoAsignaturaEnMallaDTO({
			...data,
			asignaturaId,
			mallaId,
		});

		return this._asignaturaEnMallaRepository.create(dto.getData());
	}

	updateAsignaturaEnMallaById({
		id,
		data,
	}: UpdateAsignaturaEnMallaParams): Promise<IAsignaturaEnMalla> {
		const dto = new UpdateAsignaturaEnMallaDTO(data);

		return this._asignaturaEnMallaRepository.update({
			id,
			data: dto.getData(),
		});
	}

	updateAnexoAsignaturaEnMallaById({
		id,
		data,
	}: {
		id: string;
		data: IUpdateAnexoAsignaturaEnMalla;
	}) {
		const dto = new UpdateAnexoAsignaturaEnMallaDTO(data);

		return this._asignaturaEnMallaRepository.update({
			id,
			data: dto.getData(),
		});
	}

	async getAsignaturaEnMallaById(
		id: string,
	): Promise<IAsignaturaEnMalla | null> {
		return this._asignaturaEnMallaRepository.getById(id);
	}

	async deleteAsignaturaEnMallaById(id: string): Promise<IAsignaturaEnMalla> {
		return this._asignaturaEnMallaRepository.deleteById(id);
	}

	getAllAsignaturasEnMallas(): Promise<IAsignaturaEnMalla[]> {
		return this._asignaturaEnMallaRepository.getAll();
	}
}

class AsignaturaEnMallaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}
