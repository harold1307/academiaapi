import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnNivelMalla } from "../Domain/IAsignaturaEnNivelMalla";
import type {
	IAsignaturaEnNivelMallaRepository,
	UpdateAsignaturaEnNivelMallaParams,
} from "../Domain/IAsignaturaEnNivelMallaRepository";
import type { IAsignaturaEnNivelMallaService } from "../Domain/IAsignaturaEnNivelMallaService";
import type { ICreateAsignaturaEnNivelMalla } from "../Domain/ICreateAsignaturaEnNivelMalla";
import { CreateAsignaturaEnNivelMallaDTO } from "../Infrastructure/DTOs/CreateAsignaturaEnNivelMallaDTO";
import { UpdateAsignaturaEnNivelMallaDTO } from "../Infrastructure/DTOs/UpdateAsignaturaEnNivelMallaDTO";

@injectable()
export class AsignaturaEnNivelMallaService
	implements IAsignaturaEnNivelMallaService
{
	constructor(
		@inject(TYPES.AsignaturaEnNivelMallaRepository)
		private _asignaturaEnNivelMallaRepository: IAsignaturaEnNivelMallaRepository,
	) {}

	getAllAsignaturaEnNivelMallas(): Promise<IAsignaturaEnNivelMalla[]> {
		return this._asignaturaEnNivelMallaRepository.getAll();
	}

	getAsignaturaEnNivelMallaById(
		id: string,
	): Promise<IAsignaturaEnNivelMalla | null> {
		return this._asignaturaEnNivelMallaRepository.getById(id);
	}

	deleteAsignaturaEnNivelMallaById(
		id: string,
	): Promise<IAsignaturaEnNivelMalla> {
		const asignaturaEnNivelMalla =
			this._asignaturaEnNivelMallaRepository.getById(id);

		if (!asignaturaEnNivelMalla)
			throw new AsignaturaEnNivelMallaServiceError(
				"La asignatura en nivel de malla no existe",
			);

		return this._asignaturaEnNivelMallaRepository.deleteById(id);
	}

	createAsignaturaEnNivelMalla(
		data: ICreateAsignaturaEnNivelMalla,
	): Promise<IAsignaturaEnNivelMalla> {
		const dto = new CreateAsignaturaEnNivelMallaDTO(data);

		return this._asignaturaEnNivelMallaRepository.create(dto.getData());
	}

	updateAsignaturaEnNivelMallaById({
		id,
		data,
	}: UpdateAsignaturaEnNivelMallaParams): Promise<IAsignaturaEnNivelMalla> {
		const dto = new UpdateAsignaturaEnNivelMallaDTO(data);

		const asignaturaEnNivelMalla =
			this._asignaturaEnNivelMallaRepository.getById(id);

		if (!asignaturaEnNivelMalla)
			throw new AsignaturaEnNivelMallaServiceError(
				"La asignatura en nivel de malla no existe",
			);

		return this._asignaturaEnNivelMallaRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class AsignaturaEnNivelMallaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "AsignaturaEnNivelMallaServiceError";
	}
}
