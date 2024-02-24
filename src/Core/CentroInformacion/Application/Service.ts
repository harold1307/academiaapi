import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICentroInformacion } from "../Domain/ICentroInformacion";
import type {
	ICentroInformacionRepository,
	UpdateCentroInformacionParams,
} from "../Domain/ICentroInformacionRepository";
import type { ICentroInformacionService } from "../Domain/ICentroInformacionService";
import type { ICreateCentroInformacion } from "../Domain/ICreateCentroInformacion";
import { CreateCentroInformacionDTO } from "../Infrastructure/DTOs/CreateCentroInformacionDTO";
import { UpdateCentroInformacionDTO } from "../Infrastructure/DTOs/UpdateCentroInformacionDTO";

@injectable()
export class CentroInformacionService implements ICentroInformacionService {
	constructor(
		@inject(TYPES.CentroInformacionRepository)
		private _centroInformacionRepository: ICentroInformacionRepository,
	) {}

	getAllCentroInformacions(): Promise<ICentroInformacion[]> {
		return this._centroInformacionRepository.getAll();
	}

	getCentroInformacionById(id: string): Promise<ICentroInformacion | null> {
		return this._centroInformacionRepository.getById(id);
	}

	async deleteCentroInformacionById(id: string): Promise<ICentroInformacion> {
		const centro = await this._centroInformacionRepository.getById(id);

		if (!centro)
			throw new CentroInformacionServiceError(
				"El centro de informacion no existe",
			);

		if (centro.enUso)
			throw new CentroInformacionServiceError(
				"El centro de informacion esta en uso, no se puede eliminar",
			);

		return this._centroInformacionRepository.deleteById(id);
	}

	createCentroInformacion(
		data: ICreateCentroInformacion,
	): Promise<ICentroInformacion> {
		const dto = new CreateCentroInformacionDTO(data);

		return this._centroInformacionRepository.create(dto.getData());
	}

	async updateCentroInformacionById({
		id,
		data,
	}: UpdateCentroInformacionParams): Promise<ICentroInformacion> {
		const dto = new UpdateCentroInformacionDTO(data);

		const centro = await this._centroInformacionRepository.getById(id);

		if (!centro)
			throw new CentroInformacionServiceError(
				"El centro de informacion no existe",
			);

		if (centro.enUso)
			throw new CentroInformacionServiceError(
				"El centro de informacion esta en uso, no se puede actualizar",
			);

		return this._centroInformacionRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class CentroInformacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CentroInformacionServiceError";
	}
}
