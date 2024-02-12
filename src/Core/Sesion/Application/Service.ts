import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateSesion } from "../Domain/ICreateSesion";
import type { ISesion } from "../Domain/ISesion";
import type {
	ISesionRepository,
	UpdateSesionParams,
} from "../Domain/ISesionRepository";
import type { ISesionService } from "../Domain/ISesionService";
import { CreateSesionDTO } from "../Infrastructure/DTOs/CreateSesionDTO";
import { SesionQueryFilterDTO } from "../Infrastructure/DTOs/SesionQueryFilterDTO";
import { UpdateSesionDTO } from "../Infrastructure/DTOs/UpdateSesionDTO";

@injectable()
export class SesionService implements ISesionService {
	constructor(
		@inject(TYPES.SesionRepository)
		private _sesionRepository: ISesionRepository,
	) {}

	getAllSesiones(filters?: Record<string, string>): Promise<ISesion[]> {
		const dto = new SesionQueryFilterDTO(filters);

		return this._sesionRepository.getAll(dto.getData());
	}

	getSesionById(id: string): Promise<ISesion | null> {
		return this._sesionRepository.getById(id);
	}

	async deleteSesionById(id: string): Promise<ISesion> {
		const sesion = await this._sesionRepository.getById(id);

		if (!sesion) throw new SesionServiceError("La sesion no existe");

		if (sesion.enUso)
			throw new SesionServiceError(
				"La sesion esta en uso, no se puede eliminar",
			);

		return this._sesionRepository.deleteById(id);
	}

	createSesion(data: ICreateSesion): Promise<ISesion> {
		const dto = new CreateSesionDTO(data);

		return this._sesionRepository.create(dto.getData());
	}

	async updateSesionById({ id, data }: UpdateSesionParams): Promise<ISesion> {
		const dto = new UpdateSesionDTO(data);

		const sesion = await this._sesionRepository.getById(id);

		if (!sesion) throw new SesionServiceError("La sesion no existe");

		return this._sesionRepository.update({ id, data: dto.getData() });
	}
}

class SesionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "SesionServiceError";
	}
}
