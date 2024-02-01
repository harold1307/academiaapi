import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateParalelo } from "../Domain/ICreateParalelo";
import type { IParalelo } from "../Domain/IParalelo";
import type {
	IParaleloRepository,
	UpdateParaleloParams,
} from "../Domain/IParaleloRepository";
import type { IParaleloService } from "../Domain/IParaleloService";
import { CreateParaleloDTO } from "../Infrastructure/DTOs/CreateParaleloDTO";
import { UpdateParaleloDTO } from "../Infrastructure/DTOs/UpdateParaleloDTO";

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

		return this._paraleloRepository.create(dto.getData());
	}

	async deleteParaleloById(id: string): Promise<IParalelo> {
		const paralelo = await this._paraleloRepository.getById(id);

		if (!paralelo) throw new ParaleloServiceError("El paralelo no existe");

		if (paralelo.enUso)
			throw new ParaleloServiceError(
				"El paralelo esta en uso, no se puede eliminar",
			);

		return this._paraleloRepository.deleteById(id);
	}

	async updateParaleloById({
		id,
		data,
	}: UpdateParaleloParams): Promise<IParalelo> {
		const dto = new UpdateParaleloDTO(data);

		const paralelo = await this._paraleloRepository.getById(id);

		if (!paralelo) throw new ParaleloServiceError("El paralelo no existe");

		return this._paraleloRepository.update({ id, data: dto.getData() });
	}
}

class ParaleloServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ParaleloServiceError";
	}
}
