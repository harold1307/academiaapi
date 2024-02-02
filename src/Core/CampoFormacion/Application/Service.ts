import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICampoFormacion } from "../Domain/ICampoFormacion";
import type {
	ICampoFormacionRepository,
	UpdateCampoFormacionParams,
} from "../Domain/ICampoFormacionRepository";
import type { ICampoFormacionService } from "../Domain/ICampoFormacionService";
import { CreateCampoFormacionDTO } from "../Infrastructure/DTOs/CreateCampoFormacionDTO";
import { UpdateCampoFormacionDTO } from "../Infrastructure/DTOs/UpdateCampoFormacionDTO";

@injectable()
export class CampoFormacionService implements ICampoFormacionService {
	constructor(
		@inject(TYPES.CampoFormacionRepository)
		private _campoFormacionRepository: ICampoFormacionRepository,
	) {}

	createCampoFormacion(data: any): Promise<ICampoFormacion> {
		const dto = new CreateCampoFormacionDTO(data);

		return this._campoFormacionRepository.create(dto.getData());
	}

	getCampoFormacionById(id: string): Promise<ICampoFormacion | null> {
		return this._campoFormacionRepository.getById(id);
	}

	getAllCampoFormacions(): Promise<ICampoFormacion[]> {
		return this._campoFormacionRepository.getAll();
	}

	async deleteCampoFormacionById(id: string): Promise<ICampoFormacion> {
		const campo = await this._campoFormacionRepository.getById(id);

		if (!campo)
			throw new CampoFormacionServiceError("El campo de formacion no existe");

		if (campo.enUso)
			throw new CampoFormacionServiceError(
				"El campo de formacion esta en uso, no se puede eliminar",
			);

		return this._campoFormacionRepository.deleteById(id);
	}

	async updateCampoFormacionById({
		id,
		data,
	}: UpdateCampoFormacionParams): Promise<ICampoFormacion> {
		const dto = new UpdateCampoFormacionDTO(data);

		const campo = await this._campoFormacionRepository.getById(id);

		if (!campo)
			throw new CampoFormacionServiceError("El campo de formacion no existe");

		if (campo.enUso)
			throw new CampoFormacionServiceError(
				"El campo de formacion esta en uso, no se puede actualizar",
			);

		return this._campoFormacionRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class CampoFormacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.name = "CampoFormacionServiceError";
		this.message = message;
	}
}
