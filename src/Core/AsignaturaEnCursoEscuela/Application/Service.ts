import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnCursoEscuela } from "../Domain/IAsignaturaEnCursoEscuela";
import type {
	IAsignaturaEnCursoEscuelaRepository,
	UpdateAsignaturaEnCursoEscuelaParams,
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

		return this._asignaturaEnCursoEscuelaRepository.create(dto.getData());
	}
	async updateAsignaturaEnCursoEscuelaById({
		id,
		data,
	}: UpdateAsignaturaEnCursoEscuelaParams): Promise<IAsignaturaEnCursoEscuela> {
		const dto = new UpdateAsignaturaEnCursoEscuelaDTO(data);

		const asignaturaEnCursoEscuela =
			await this._asignaturaEnCursoEscuelaRepository.getById(id);

		if (!asignaturaEnCursoEscuela) {
			throw new AsignaturaEnCursoEscuelaServiceError(
				"La asignatura en curso escuela no existe",
			);
		}

		const { profesorId, asignaturaId, modeloEvaluativoId, ...restData } =
			dto.getData();

		const newData = {
			...restData,
			profesorId:
				profesorId === asignaturaEnCursoEscuela.profesorId
					? undefined
					: profesorId,
			asignaturaId:
				asignaturaId === asignaturaEnCursoEscuela.asignaturaId
					? undefined
					: asignaturaId,
			modeloEvaluativoId:
				modeloEvaluativoId === asignaturaEnCursoEscuela.modeloEvaluativoId
					? undefined
					: modeloEvaluativoId,
		};

		return this._asignaturaEnCursoEscuelaRepository.update({
			id,
			data: newData,
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
