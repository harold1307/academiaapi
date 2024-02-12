import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICoordinacion } from "../Domain/ICoordinacion";
import type {
	ICoordinacionRepository,
	UpdateCoordinacionParams,
} from "../Domain/ICoordinacionRepository";
import type { ICoordinacionService } from "../Domain/ICoordinacionService";
import type { ICreateCoordinacion } from "../Domain/ICreateCoordinacion";
import { CreateCoordinacionDTO } from "../Infrastructure/DTOs/CreateCoordinacionDTO";
import { UpdateCoordinacionDTO } from "../Infrastructure/DTOs/UpdateCoordinacionDTO";

@injectable()
export class CoordinacionService implements ICoordinacionService {
	constructor(
		@inject(TYPES.CoordinacionRepository)
		private _coordinacionRepository: ICoordinacionRepository,
	) {}

	getAllCoordinacions(): Promise<ICoordinacion[]> {
		return this._coordinacionRepository.getAll();
	}

	getCoordinacionById(id: string): Promise<ICoordinacion | null> {
		return this._coordinacionRepository.getById(id);
	}

	async deleteCoordinacionById(id: string): Promise<ICoordinacion> {
		const coordinacion = await this._coordinacionRepository.getById(id);

		if (!coordinacion)
			throw new CoordinacionServiceError("La coordinacion no existe");

		if (coordinacion.enUso)
			throw new CoordinacionServiceError(
				"La coordinacion esta en uso, no se puede eliminar",
			);

		return this._coordinacionRepository.deleteById(id);
	}

	createCoordinacion(data: ICreateCoordinacion): Promise<ICoordinacion> {
		const dto = new CreateCoordinacionDTO(data);

		return this._coordinacionRepository.create(dto.getData());
	}
	async updateCoordinacionById({
		id,
		data,
	}: UpdateCoordinacionParams): Promise<ICoordinacion> {
		const dto = new UpdateCoordinacionDTO(data);

		const coordinacion = await this._coordinacionRepository.getById(id);

		if (!coordinacion)
			throw new CoordinacionServiceError("La coordinacion no existe");

		return this._coordinacionRepository.update({ id, data: dto.getData() });
	}
}

class CoordinacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CoordinacionServiceError";
	}
}
