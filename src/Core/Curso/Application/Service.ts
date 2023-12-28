import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICurso } from "../Domain/ICurso";
import type { ICursoRepository } from "../Domain/ICursoRepository";
import type { ICursoService } from "../Domain/ICursoService";
import { CreateCursoDTO } from "../Infrastructure/DTOs/CreateCursoDTO";
import { UpdateCursoDTO } from "../Infrastructure/DTOs/UpdateCursoDTO";

@injectable()
export class CursoService implements ICursoService {
	constructor(
		@inject(TYPES.CursoRepository) private _cursoRepository: ICursoRepository,
	) {}

	async createCurso(data: any): Promise<ICurso> {
		const curso = new CreateCursoDTO(data);

		const validation = curso.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CursoServiceError("Esquema para crear curso invalido.");
		}

		return this._cursoRepository.create(validation.data);
	}

	async getAllCursos(): Promise<ICurso[]> {
		return this._cursoRepository.getAll();
	}

	async getCursoById(id: string): Promise<ICurso | null> {
		return this._cursoRepository.getById(id);
	}

	async deleteCursoById(id: string): Promise<ICurso> {
		return this._cursoRepository.deleteById(id);
	}

	async updateCursoById(params: { id: string; curso: any }): Promise<ICurso> {
		const dto = new UpdateCursoDTO(params.curso);

		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CursoServiceError("Esquema para actualizar curso invalido.");
		}

		return this._cursoRepository.update({
			id: params.id,
			curso: validation.data,
		});
	}
}

class CursoServiceError extends Error {
	constructor(message: string) {
		super();

		this.message = message;
	}
}
