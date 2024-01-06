import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAreaConocimiento } from "../Domain/IAreaConocimiento";
import type { IAreaConocimientoRepository } from "../Domain/IAreaConocimientoRepository";
import type { IAreaConocimientoService } from "../Domain/IAreaConocimientoService";
import { CreateAreaConocimientoDTO } from "../Infrastructure/DTOs/CreateAreaConocimiento";

@injectable()
export class AreaConocimientoService implements IAreaConocimientoService {
	constructor(
		@inject(TYPES.AreaConocimientoRepository)
		private _areaConocimientoRepository: IAreaConocimientoRepository,
	) {}

	getAllAreaConocimientos(): Promise<IAreaConocimiento[]> {
		return this._areaConocimientoRepository.getAll();
	}

	getAreaConocimientoById(id: string): Promise<IAreaConocimiento | null> {
		return this._areaConocimientoRepository.getById(id);
	}

	createAreaConocimiento(data: any): Promise<IAreaConocimiento> {
		const dto = new CreateAreaConocimientoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear area de conocimiento",
				validation.error,
			);
			throw new AreaConocimientoServiceError(
				"Esquema para crear area de conocimiento invalido.",
			);
		}

		return this._areaConocimientoRepository.create(validation.data);
	}
}

class AreaConocimientoServiceError extends Error {
	constructor(message: string) {
		super();
		this.name = "AreaConocimientoServiceError";
		this.message = message;
	}
}
