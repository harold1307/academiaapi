import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateProgramaEnCursoEscuela } from "../Domain/ICreateProgramaEnCursoEscuela";
import type { IProgramaEnCursoEscuela } from "../Domain/IProgramaEnCursoEscuela";
import type {
	IProgramaEnCursoEscuelaRepository,
	UpdateProgramaEnCursoEscuelaParams,
} from "../Domain/IProgramaEnCursoEscuelaRepository";
import type { IProgramaEnCursoEscuelaService } from "../Domain/IProgramaEnCursoEscuelaService";
import { CreateProgramaEnCursoEscuelaDTO } from "../Infrastructure/DTOs/CreateProgramaEnCursoEscuelaDTO";
import { UpdateProgramaEnCursoEscuelaDTO } from "../Infrastructure/DTOs/UpdateProgramaEnCursoEscuelaDTO";

@injectable()
export class ProgramaEnCursoEscuelaService
	implements IProgramaEnCursoEscuelaService
{
	constructor(
		@inject(TYPES.ProgramaEnCursoEscuelaRepository)
		private _programaEnCursoEscuelaRepository: IProgramaEnCursoEscuelaRepository,
	) {}

	// getAllProgramaEnCursoEscuelas(): Promise<IProgramaEnCursoEscuela[]> {
	// 	return this._programaEnCursoEscuelaRepository.getAll();
	// }

	getProgramaEnCursoEscuelaById(
		id: string,
	): Promise<IProgramaEnCursoEscuela | null> {
		return this._programaEnCursoEscuelaRepository.getById(id);
	}

	async deleteProgramaEnCursoEscuelaById(
		id: string,
	): Promise<IProgramaEnCursoEscuela> {
		const programa = await this._programaEnCursoEscuelaRepository.getById(id);

		if (!programa) {
			throw new ProgramaEnCursoEscuelaServiceError(
				"El programa en curso escuela no existe",
			);
		}

		return this._programaEnCursoEscuelaRepository.deleteById(id);
	}

	createProgramaEnCursoEscuela(
		data: ICreateProgramaEnCursoEscuela,
	): Promise<IProgramaEnCursoEscuela> {
		const dto = new CreateProgramaEnCursoEscuelaDTO(data);

		return this._programaEnCursoEscuelaRepository.create(dto.getData());
	}
	async updateProgramaEnCursoEscuelaById({
		id,
		data,
	}: UpdateProgramaEnCursoEscuelaParams): Promise<IProgramaEnCursoEscuela> {
		const dto = new UpdateProgramaEnCursoEscuelaDTO(data);

		const programa = await this._programaEnCursoEscuelaRepository.getById(id);

		if (!programa) {
			throw new ProgramaEnCursoEscuelaServiceError(
				"El programa en curso escuela no existe",
			);
		}

		return this._programaEnCursoEscuelaRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class ProgramaEnCursoEscuelaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ProgramaEnCursoEscuelaServiceError";
	}
}
