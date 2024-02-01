import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ISede } from "../Domain/ISede";
import type {
	ISedeRepository,
	UpdateSedeParams,
} from "../Domain/ISedeRepository";
import type { ISedeService } from "../Domain/ISedeService";
import { CreateSedeDTO } from "../Infraestructure/DTOs/CreateSedeDTO";
import { UpdateSedeDTO } from "../Infraestructure/DTOs/UpdateSedeDTO";

@injectable()
export class SedeService implements ISedeService {
	constructor(
		@inject(TYPES.SedeRepository)
		private _sedeRepository: ISedeRepository,
	) {}

	async createSede(data: any) {
		const dto = new CreateSedeDTO(data);

		return this._sedeRepository.create(dto.getData());
	}

	async getAllSedes() {
		return this._sedeRepository.getAll();
	}

	async getSedeById(id: string) {
		return this._sedeRepository.getById(id);
	}

	async updateSedeById({ id, data }: UpdateSedeParams) {
		const dto = new UpdateSedeDTO(data);

		return this._sedeRepository.update({
			id,
			data: dto.getData(),
		});
	}

	async deleteSedeById(id: string): Promise<ISede> {
		const sede = await this._sedeRepository.getById(id);

		if (!sede) throw new SedeServiceError("La sede no existe");

		if (sede.enUso)
			throw new SedeServiceError("La sede esta en uso, no se puede eliminar");

		return this._sedeRepository.deleteById(id);
	}
}

class SedeServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "SedeServiceError";
	}
}
