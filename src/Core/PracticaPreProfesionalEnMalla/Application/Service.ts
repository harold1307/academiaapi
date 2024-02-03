import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreatePracticaPreProfesionalEnMalla } from "../Domain/ICreatePracticaPreProfesionalEnMalla";
import type { IPracticaPreProfesionalEnMalla } from "../Domain/IPracticaPreProfesionalEnMalla";
import type {
	IPracticaPreProfesionalEnMallaRepository,
	UpdatePracticaPreProfesionalEnMallaParams,
} from "../Domain/IPracticaPreProfesionalEnMallaRepository";
import type { IPracticaPreProfesionalEnMallaService } from "../Domain/IPracticaPreProfesionalEnMallaService";
import { CreatePracticaPreProfesionalEnMallaDTO } from "../Infrastructure/DTOs/CreatePracticaPreProfesionalEnMallaDTO";
import { UpdatePracticaPreProfesionalEnMallaDTO } from "../Infrastructure/DTOs/UpdatePracticaPreProfesionalEnMallaDTO";

@injectable()
export class PracticaPreProfesionalEnMallaService
	implements IPracticaPreProfesionalEnMallaService
{
	constructor(
		@inject(TYPES.PracticaPreProfesionalEnMallaRepository)
		private _practicaPreProfesionalEnMallaRepository: IPracticaPreProfesionalEnMallaRepository,
	) {}

	// getAllPracticaPreProfesionalEnMallas(): Promise<IPracticaPreProfesionalEnMalla[]> {
	//   return this._practicaPreProfesionalEnMallaRepository.getAll()
	// }

	getPracticaPreProfesionalEnMallaById(
		id: string,
	): Promise<IPracticaPreProfesionalEnMalla | null> {
		return this._practicaPreProfesionalEnMallaRepository.getById(id);
	}

	deletePracticaPreProfesionalEnMallaById(
		id: string,
	): Promise<IPracticaPreProfesionalEnMalla> {
		return this._practicaPreProfesionalEnMallaRepository.deleteById(id);
	}

	createPracticaPreProfesionalEnMalla(
		data: ICreatePracticaPreProfesionalEnMalla,
	): Promise<IPracticaPreProfesionalEnMalla> {
		const dto = new CreatePracticaPreProfesionalEnMallaDTO(data);

		return this._practicaPreProfesionalEnMallaRepository.create(dto.getData());
	}

	updatePracticaPreProfesionalEnMallaById({
		id,
		data,
	}: UpdatePracticaPreProfesionalEnMallaParams): Promise<IPracticaPreProfesionalEnMalla> {
		const dto = new UpdatePracticaPreProfesionalEnMallaDTO(data);

		return this._practicaPreProfesionalEnMallaRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

// class PracticaPreProfesionalEnMallaServiceError extends Error {
// 	constructor(message: string) {
// 		super();
// 		this.message = message;
// 		this.name = "PracticaPreProfesionalEnMallaServiceError";
// 	}
// }
