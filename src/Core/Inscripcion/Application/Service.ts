import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateInscripcion } from "../Domain/ICreateInscripcion";
import type { IInscripcion } from "../Domain/IInscripcion";
import type {
	IInscripcionRepository,
	UpdateInscripcionParams,
} from "../Domain/IInscripcionRepository";
import type { IInscripcionService } from "../Domain/IInscripcionService";
import { CreateInscripcionDTO } from "../Infrastructure/DTOs/CreateInscripcionDTO";
import { UpdateInscripcionDTO } from "../Infrastructure/DTOs/UpdateInscripcionDTO";

@injectable()
export class InscripcionService implements IInscripcionService {
	constructor(
		@inject(TYPES.InscripcionRepository)
		private _inscripcionRepository: IInscripcionRepository,
	) {}

	getAllInscripcions(): Promise<IInscripcion[]> {
		return this._inscripcionRepository.getAll();
	}

	getInscripcionById(id: string): Promise<IInscripcion | null> {
		return this._inscripcionRepository.getById(id);
	}

	// deleteInscripcionById(id: string): Promise<IInscripcion> {

	// }

	createInscripcion(data: ICreateInscripcion): Promise<IInscripcion> {
		const dto = new CreateInscripcionDTO(data);

		return this._inscripcionRepository.create(dto.getData());
	}

	async updateInscripcionById({
		id,
		data,
	}: UpdateInscripcionParams): Promise<IInscripcion> {
		const dto = new UpdateInscripcionDTO(data);

		const inscripcion = await this._inscripcionRepository.getById(id);

		if (!inscripcion)
			throw new InscripcionServiceError("La inscripcion no existe");

		return this._inscripcionRepository.update({ id, data: dto.getData() });
	}
}

class InscripcionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "InscripcionServiceError";
	}
}
