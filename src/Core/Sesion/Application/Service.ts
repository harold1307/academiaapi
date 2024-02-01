import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateSesion } from "../Domain/ICreateSesion";
import type { ISesion } from "../Domain/ISesion.ts";
import type {
	ISesionRepository,
	UpdateSesionParams,
} from "../Domain/ISesionRepository.ts";
import type { ISesionService } from "../Domain/ISesionService.ts";
import { CreateSesionDTO } from "../Infrastructure/DTOs/CreateSesionDTO";
import { UpdateSesionDTO } from "../Infrastructure/DTOs/UpdateSesionDTO";

@injectable()
export class SesionService implements ISesionService {
	constructor(
		@inject(TYPES.SesionRepository)
		private _sesionRepository: ISesionRepository,
	) {}

	getAllSesiones(): Promise<ISesion[]> {
		return this._sesionRepository.getAll();
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
