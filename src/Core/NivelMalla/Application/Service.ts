import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { INivelMalla } from "../Domain/INivelMalla";
import type {
	INivelMallaRepository,
	UpdateNivelMallaParams,
} from "../Domain/INivelMallaRepository";
import type { INivelMallaService } from "../Domain/INivelMallaService";
import { UpdateNivelMallaDTO } from "../Infrastructure/DTOs/UpdateNivelMallaDTO";

@injectable()
export class NivelMallaService implements INivelMallaService {
	constructor(
		@inject(TYPES.NivelMallaRepository)
		private _nivelMallaRepository: INivelMallaRepository,
	) {}

	getAllNivelMallas(): Promise<INivelMalla[]> {
		return this._nivelMallaRepository.getAll();
	}

	getNivelMallaById(id: string): Promise<INivelMalla | null> {
		return this._nivelMallaRepository.getById(id);
	}
	updateNivelMallaById({
		id,
		data,
	}: UpdateNivelMallaParams): Promise<INivelMalla> {
		const dto = new UpdateNivelMallaDTO(data);
		return this._nivelMallaRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class NivelMallaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "NivelMallaServiceError";
	}
}
