import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnCursoEscuela } from "../Domain/IAsignaturaEnCursoEscuela";
import type {
	IAsignaturaEnCursoEscuelaRepository,
	IUpdateAsignaturaEnCursoEscuelaParams,
} from "../Domain/IAsignaturaEnCursoEscuelaRepository";
import type { IAsignaturaEnCursoEscuelaService } from "../Domain/IAsignaturaEnCursoEscuelaService";
import type { ICreateAsignaturaEnCursoEscuela } from "../Domain/ICreateAsignaturaEnCursoEscuela";
import { CreateAsignaturaEnCursoEscuelaDTO } from "../Infrastructure/DTOs/CreateAsignaturaEnCursoEscuelaDTO";
import { UpdateAsignaturaEnCursoEscuelaDTO } from "../Infrastructure/DTOs/UpdateAsignaturaEnCursoEscuelaDTO";

@injectable()
export class AsignaturaEnCursoEscuelaService
	implements IAsignaturaEnCursoEscuelaService
{
	constructor(
		@inject(TYPES.AsignaturaEnCursoEscuelaRepository)
		private _asignaturaEnCursoEscuelaRepository: IAsignaturaEnCursoEscuelaRepository,
	) {}

	getAllAsignaturaEnCursoEscuelas(): Promise<IAsignaturaEnCursoEscuela[]> {
		return this._asignaturaEnCursoEscuelaRepository.getAll();
	}

	getAsignaturaEnCursoEscuelaById(
		id: string,
	): Promise<IAsignaturaEnCursoEscuela | null> {
		return this._asignaturaEnCursoEscuelaRepository.getById(id);
	}

	deleteAsignaturaEnCursoEscuelaById(
		id: string,
	): Promise<IAsignaturaEnCursoEscuela> {
		return this._asignaturaEnCursoEscuelaRepository.deleteById(id);
	}

	createAsignaturaEnCursoEscuela(
		data: ICreateAsignaturaEnCursoEscuela,
	): Promise<IAsignaturaEnCursoEscuela> {
		const dto = new CreateAsignaturaEnCursoEscuelaDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error en la validacion del esquema para crear asignatura en curso escuela",
				JSON.stringify(validation.error, null, 2),
			);

			throw new AsignaturaEnCursoEscuelaServiceError(
				"Error en la validacion del esquema para crear asignatura en curso escuela",
			);
		}

		return this._asignaturaEnCursoEscuelaRepository.create(data);
	}
	async updateAsignaturaEnCursoEscuelaById({
		id,
		data,
	}: IUpdateAsignaturaEnCursoEscuelaParams): Promise<IAsignaturaEnCursoEscuela> {
		const asignaturaEnCursoEscuela =
			await this._asignaturaEnCursoEscuelaRepository.getById(id);

		if (!asignaturaEnCursoEscuela) {
			throw new AsignaturaEnCursoEscuelaServiceError(
				"La asignatura en curso escuela no existe",
			);
		}

		const { profesorId, asignaturaId, ...restData } = data;

		const dto = new UpdateAsignaturaEnCursoEscuelaDTO({
			...restData,
			profesorId:
				profesorId === asignaturaEnCursoEscuela.profesorId
					? undefined
					: profesorId,
			asignaturaId:
				asignaturaId === asignaturaEnCursoEscuela.asignaturaId
					? undefined
					: asignaturaId,
		});
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error en la validacion del esquema para actualizar asignatura en curso escuela",
				JSON.stringify(validation.error, null, 2),
			);

			throw new AsignaturaEnCursoEscuelaServiceError(
				"Error en la validacion del esquema para actualizar asignatura en curso escuela",
			);
		}

		return this._asignaturaEnCursoEscuelaRepository.update({
			id,
			data: validation.data,
		});
	}
}

class AsignaturaEnCursoEscuelaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "AsignaturaEnCursoEscuelaServiceError";
	}
}
