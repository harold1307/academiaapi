import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICorte } from "../Domain/ICorte";
import type {
	ICorteRepository,
	UpdateCorteParams,
} from "../Domain/ICorteRepository";
import type { ICorteService } from "../Domain/ICorteService";
import type { ICreateCorte } from "../Domain/ICreateCorte";
import { CreateCorteDTO } from "../Infrastructure/DTOs/CreateCorteDTO";
import { UpdateCorteDTO } from "../Infrastructure/DTOs/UpdateCorteDTO";

@injectable()
export class CorteService implements ICorteService {
	constructor(
		@inject(TYPES.CorteRepository) private _corteRepository: ICorteRepository,
	) {}

	getAllCortes(): Promise<ICorte[]> {
		return this._corteRepository.getAll();
	}

	getCorteById(id: string): Promise<ICorte | null> {
		return this._corteRepository.getById(id);
	}

	async deleteCorteById(id: string): Promise<ICorte> {
		const corte = await this._corteRepository.getById(id);

		if (!corte) throw new CorteServiceError("El corte no existe");

		if (corte.enUso)
			throw new CorteServiceError("El corte esta en uso, no se puede eliminar");

		return this._corteRepository.deleteById(id);
	}

	createCorte(data: ICreateCorte): Promise<ICorte> {
		const dto = new CreateCorteDTO(data);

		return this._corteRepository.create(dto.getData());
	}
	updateCorteById({ id, data }: UpdateCorteParams): Promise<ICorte> {
		const dto = new UpdateCorteDTO(data);

		return this._corteRepository.update({ id, data: dto.getData() });
	}
}

class CorteServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CorteServiceError";
	}
}
