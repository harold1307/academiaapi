import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateParalelo } from "../Domain/ICreateParalelo";
import type { IParalelo } from "../Domain/IParalelo";
import type { IParaleloRepository } from "../Domain/IParaleloRepository";
import type { IParaleloService } from "../Domain/IParaleloService";
import { CreateParaleloDTO } from "../Infrastructure/DTOs/CreateParaleloDTO";

@injectable()
export class ParaleloService implements IParaleloService {
	constructor(
		@inject(TYPES.ParaleloRepository)
		private _paraleloRepository: IParaleloRepository,
	) {}

	getAllParalelos(): Promise<IParalelo[]> {
		return this._paraleloRepository.getAll();
	}

	getParaleloById(id: string): Promise<IParalelo | null> {
		return this._paraleloRepository.getById(id);
	}

	createParalelo(data: ICreateParalelo): Promise<IParalelo> {
		const dto = new CreateParaleloDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para paralelo",
				JSON.stringify(validation.error, null, 2),
			);
			throw new ParaleloServiceError("Esquema para paralelo invalido");
		}

		return this._paraleloRepository.create(validation.data);
	}

	async deleteParaleloById(id: string): Promise<IParalelo> {
		const paralelo = await this._paraleloRepository.getById(id);

		if (!paralelo) throw new ParaleloServiceError("El paralelo no existe");

		if (paralelo.enUso)
			throw new ParaleloServiceError("El paralelo esta en uso");

		return this._paraleloRepository.deleteById(id);
	}
}

class ParaleloServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ParaleloServiceError";
	}
}
