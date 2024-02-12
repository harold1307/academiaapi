import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateUbicacion } from "../Domain/ICreateUbicacion";
import type { IUbicacion } from "../Domain/IUbicacion";
import type {
	IUbicacionRepository,
	UpdateUbicacionParams,
} from "../Domain/IUbicacionRepository";
import type { IUbicacionService } from "../Domain/IUbicacionService";
import { CreateUbicacionDTO } from "../Infrastructure/DTOs/CreateUbicacionDTO";
import { UpdateUbicacionDTO } from "../Infrastructure/DTOs/UpdateUbicacionDTO";
import { UbicacionQueryFilterDTO } from "../Infrastructure/DTOs/UbicacionQueryFilterDTO";

@injectable()
export class UbicacionService implements IUbicacionService {
	constructor(
		@inject(TYPES.UbicacionRepository)
		private _ubicacionRepository: IUbicacionRepository,
	) {}

	getAllUbicaciones(filters?: Record<string, string>): Promise<IUbicacion[]> {
		const filterDto = new UbicacionQueryFilterDTO(filters);

		return this._ubicacionRepository.getAll(filterDto.getData());
	}

	getUbicacionById(id: string): Promise<IUbicacion | null> {
		return this._ubicacionRepository.getById(id);
	}

	async deleteUbicacionById(id: string): Promise<IUbicacion> {
		const ubicacion = await this._ubicacionRepository.getById(id);

		if (!ubicacion) throw new UbicacionServiceError("La ubicacion no existe");

		if (ubicacion.enUso)
			throw new UbicacionServiceError(
				"La ubicacion esta en uso, no se puede eliminar",
			);

		return this._ubicacionRepository.deleteById(id);
	}

	createUbicacion(data: ICreateUbicacion): Promise<IUbicacion> {
		const dto = new CreateUbicacionDTO(data);

		return this._ubicacionRepository.create(dto.getData());
	}
	async updateUbicacionById({
		id,
		data,
	}: UpdateUbicacionParams): Promise<IUbicacion> {
		const dto = new UpdateUbicacionDTO(data);

		return this._ubicacionRepository.update({ id, data: dto.getData() });
	}
}

class UbicacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "UbicacionServiceError";
	}
}
