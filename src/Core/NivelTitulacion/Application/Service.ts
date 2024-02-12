import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateNivelTitulacion } from "../Domain/ICreateNivelTitulacion";
import type { INivelTitulacion } from "../Domain/INivelTitulacion";
import type {
	INivelTitulacionRepository,
	UpdateNivelTitulacionParams,
} from "../Domain/INivelTitulacionRepository";
import type { INivelTitulacionService } from "../Domain/INivelTitulacionService";
import { CreateNivelTitulacionDTO } from "../Infrastructure/DTOs/CreateNivelTitulacionDTO";
import { UpdateNivelTitulacionDTO } from "../Infrastructure/DTOs/UpdateNivelTitulacionDTO";

@injectable()
export class NivelTitulacionService implements INivelTitulacionService {
	constructor(
		@inject(TYPES.NivelTitulacionRepository)
		private _nivelTitulacionRepository: INivelTitulacionRepository,
	) {}

	getAllNivelesTitulacion(): Promise<INivelTitulacion[]> {
		return this._nivelTitulacionRepository.getAll();
	}

	getNivelTitulacionById(id: string): Promise<INivelTitulacion | null> {
		return this._nivelTitulacionRepository.getById(id);
	}

	async deleteNivelTitulacionById(id: string): Promise<INivelTitulacion> {
		const nivel = await this._nivelTitulacionRepository.getById(id);

		if (!nivel)
			throw new NivelTitulacionServiceError("El nivel de titulacion no existe");

		if (nivel.enUso)
			throw new NivelTitulacionServiceError(
				"El nivel de titulacion esta en uso, no se puede eliminar",
			);

		return this._nivelTitulacionRepository.deleteById(id);
	}

	createNivelTitulacion(
		data: ICreateNivelTitulacion,
	): Promise<INivelTitulacion> {
		const dto = new CreateNivelTitulacionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear nivel de titulacion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new NivelTitulacionServiceError(
				"Esquema para crear nivel de titulacion invalido",
			);
		}

		return this._nivelTitulacionRepository.create(validation.data);
	}

	async updateNivelTitulacionById({
		id,
		data,
	}: UpdateNivelTitulacionParams): Promise<INivelTitulacion> {
		const dto = new UpdateNivelTitulacionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar nivel de titulacion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new NivelTitulacionServiceError(
				"Esquema para actualizar nivel de titulacion invalido",
			);
		}

		const nivel = await this._nivelTitulacionRepository.getById(id);

		if (!nivel)
			throw new NivelTitulacionServiceError("El nivel de titulacion no existe");

		if (nivel.enUso)
			throw new NivelTitulacionServiceError(
				"El nivel de titulacion esta en uso, no se puede actualizar",
			);

		return this._nivelTitulacionRepository.update({ id, data });
	}
}

class NivelTitulacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "NivelTitulacionServiceError";
	}
}
