import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaModuloEnMalla } from "../Domain/IAsignaturaModuloEnMalla";
import type {
	IAsignaturaModuloEnMallaRepository,
	UpdateAsignaturaModuloEnMallaParams,
} from "../Domain/IAsignaturaModuloEnMallaRepository";
import type { IAsignaturaModuloEnMallaService } from "../Domain/IAsignaturaModuloEnMallaService";
import type { ICreateAsignaturaModuloEnMalla } from "../Domain/ICreateAsignaturaModuloEnMalla";
import { CreateAsignaturaModuloEnMallaDTO } from "../Infrastructure/DTOs/CreateAsignaturaModuloEnMallaDTO";
import { UpdateAsignaturaModuloEnMallaDTO } from "../Infrastructure/DTOs/UpdateAsignaturaModuloEnMallaDTO";

@injectable()
export class AsignaturaModuloEnMallaService
	implements IAsignaturaModuloEnMallaService
{
	constructor(
		@inject(TYPES.AsignaturaModuloEnMallaRepository)
		private _asignaturaModuloEnMallaRepository: IAsignaturaModuloEnMallaRepository,
	) {}

	getAllAsignaturaModuloEnMallas(): Promise<IAsignaturaModuloEnMalla[]> {
		return this._asignaturaModuloEnMallaRepository.getAll();
	}

	getAsignaturaModuloEnMallaById(
		id: string,
	): Promise<IAsignaturaModuloEnMalla | null> {
		return this._asignaturaModuloEnMallaRepository.getById(id);
	}

	deleteAsignaturaModuloEnMallaById(
		id: string,
	): Promise<IAsignaturaModuloEnMalla> {
		return this._asignaturaModuloEnMallaRepository.deleteById(id);
	}

	createAsignaturaModuloEnMalla(
		data: ICreateAsignaturaModuloEnMalla,
	): Promise<IAsignaturaModuloEnMalla> {
		const dto = new CreateAsignaturaModuloEnMallaDTO(data);

		return this._asignaturaModuloEnMallaRepository.create(dto.getData());
	}
	async updateAsignaturaModuloEnMallaById({
		id,
		data,
	}: UpdateAsignaturaModuloEnMallaParams): Promise<IAsignaturaModuloEnMalla> {
		const dto = new UpdateAsignaturaModuloEnMallaDTO(data);

		const asignatura =
			await this._asignaturaModuloEnMallaRepository.getById(id);

		if (!asignatura)
			throw new AsignaturaModuloEnMallaServiceError("La asignatura no existe");

		return this._asignaturaModuloEnMallaRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class AsignaturaModuloEnMallaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "AsignaturaModuloEnMallaServiceError";
	}
}
