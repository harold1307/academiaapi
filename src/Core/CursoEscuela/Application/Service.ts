import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateCursoEscuela } from "../Domain/ICreateCursoEscuela";
import type { ICursoEscuela } from "../Domain/ICursoEscuela";
import type { ICursoEscuelaRepository } from "../Domain/ICursoEscuelaRepository";
import type { ICursoEscuelaService } from "../Domain/ICursoEscuelaService";
import { CreateCursoEscuelaDTO } from "../Infrastructure/DTOs/CreateCursoEscuelaDTO";

@injectable()
export class CursoEscuelaService implements ICursoEscuelaService {
	constructor(
		@inject(TYPES.CursoEscuelaRepository)
		private _cursoEscuelaRepository: ICursoEscuelaRepository,
	) {}

	getAllCursoEscuelas(): Promise<ICursoEscuela[]> {
		return this._cursoEscuelaRepository.getAll();
	}

	getCursoEscuelaById(id: string): Promise<ICursoEscuela | null> {
		return this._cursoEscuelaRepository.getById(id);
	}

	createCursoEscuela(data: ICreateCursoEscuela): Promise<ICursoEscuela> {
		const dto = new CreateCursoEscuelaDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear curso escuela",
				validation.error,
			);
			throw new CursoEscuelaServiceError(
				"Esquema para crear curso escuela invalido.",
			);
		}

		return this._cursoEscuelaRepository.create(validation.data);
	}

	deleteCursoEscuelaById(id: string): Promise<ICursoEscuela> {
		return this._cursoEscuelaRepository.deleteById(id);
	}
}

class CursoEscuelaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CursoEscuelaServiceError";
	}
}
