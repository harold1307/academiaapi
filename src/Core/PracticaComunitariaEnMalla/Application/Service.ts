import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreatePracticaComunitariaEnMalla } from "../Domain/ICreatePracticaComunitariaEnMalla";
import type { IPracticaComunitariaEnMalla } from "../Domain/IPracticaComunitariaEnMalla";
import type {
	IPracticaComunitariaEnMallaRepository,
	UpdatePracticaComunitariaEnMallaParams,
} from "../Domain/IPracticaComunitariaEnMallaRepository";
import type { IPracticaComunitariaEnMallaService } from "../Domain/IPracticaComunitariaEnMallaService";
import { CreatePracticaComunitariaEnMallaDTO } from "../Infrastructure/DTOs/CreatePracticaComunitariaEnMallaDTO";
import { UpdatePracticaComunitariaEnMallaDTO } from "../Infrastructure/DTOs/UpdatePracticaComunitariaEnMallaDTO";

@injectable()
export class PracticaComunitariaEnMallaService
	implements IPracticaComunitariaEnMallaService
{
	constructor(
		@inject(TYPES.PracticaComunitariaEnMallaRepository)
		private _practicaComunitariaEnMallaRepository: IPracticaComunitariaEnMallaRepository,
	) {}

	// getAllPracticaComunitariaEnMallas(): Promise<IPracticaComunitariaEnMalla[]> {
	//   return this._practicaComunitariaEnMallaRepository.getAll()
	// }

	getPracticaComunitariaEnMallaById(
		id: string,
	): Promise<IPracticaComunitariaEnMalla | null> {
		return this._practicaComunitariaEnMallaRepository.getById(id);
	}

	deletePracticaComunitariaEnMallaById(
		id: string,
	): Promise<IPracticaComunitariaEnMalla> {
		return this._practicaComunitariaEnMallaRepository.deleteById(id);
	}

	createPracticaComunitariaEnMalla(
		data: ICreatePracticaComunitariaEnMalla,
	): Promise<IPracticaComunitariaEnMalla> {
		const dto = new CreatePracticaComunitariaEnMallaDTO(data);

		return this._practicaComunitariaEnMallaRepository.create(dto.getData());
	}
	updatePracticaComunitariaEnMallaById({
		id,
		data,
	}: UpdatePracticaComunitariaEnMallaParams): Promise<IPracticaComunitariaEnMalla> {
		const dto = new UpdatePracticaComunitariaEnMallaDTO(data);

		return this._practicaComunitariaEnMallaRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class PracticaComunitariaEnMallaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "PracticaComunitariaEnMallaServiceError";
	}
}
