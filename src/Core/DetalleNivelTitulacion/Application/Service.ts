import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateDetalleNivelTitulacion } from "../Domain/ICreateDetalleNivelTitulacion";
import type { IDetalleNivelTitulacion } from "../Domain/IDetalleNivelTitulacion";
import type {
	IDetalleNivelTitulacionRepository,
	UpdateDetalleNivelTitulacionParams,
} from "../Domain/IDetalleNivelTitulacionRepository";
import type { IDetalleNivelTitulacionService } from "../Domain/IDetalleNivelTitulacionService";
import { CreateDetalleNivelTitulacionDTO } from "../Infrastructure/DTOs/CreateDetalleNivelTitulacionDTO";
import { UpdateDetalleNivelTitulacionDTO } from "../Infrastructure/DTOs/UpdateDetalleNivelTitulacionDTO";

@injectable()
export class DetalleNivelTitulacionService
	implements IDetalleNivelTitulacionService
{
	constructor(
		@inject(TYPES.DetalleNivelTitulacionRepository)
		private _detalleNivelTitulacionRepository: IDetalleNivelTitulacionRepository,
	) {}

	getAllDetallesNivelTitulacion(): Promise<IDetalleNivelTitulacion[]> {
		return this._detalleNivelTitulacionRepository.getAll();
	}

	getDetalleNivelTitulacionById(
		id: string,
	): Promise<IDetalleNivelTitulacion | null> {
		return this._detalleNivelTitulacionRepository.getById(id);
	}

	async deleteDetalleNivelTitulacionById(
		id: string,
	): Promise<IDetalleNivelTitulacion> {
		const detalle = await this._detalleNivelTitulacionRepository.getById(id);

		if (!detalle)
			throw new DetalleNivelTitulacionServiceError(
				"El detalle de nivel de titulacion no existe",
			);

		if (detalle.enUso)
			throw new DetalleNivelTitulacionServiceError(
				"El detalle de nivel de titulacion esta en uso, no se puede eliminar",
			);

		return this._detalleNivelTitulacionRepository.deleteById(id);
	}

	createDetalleNivelTitulacion(
		data: ICreateDetalleNivelTitulacion,
	): Promise<IDetalleNivelTitulacion> {
		const dto = new CreateDetalleNivelTitulacionDTO(data);

		return this._detalleNivelTitulacionRepository.create(dto.getData());
	}

	async updateDetalleNivelTitulacionById({
		id,
		data,
	}: UpdateDetalleNivelTitulacionParams): Promise<IDetalleNivelTitulacion> {
		const detalle = await this._detalleNivelTitulacionRepository.getById(id);

		if (!detalle)
			throw new DetalleNivelTitulacionServiceError(
				"El detalle de nivel de titulacion no existe",
			);

		if (detalle.enUso)
			throw new DetalleNivelTitulacionServiceError(
				"El detalle de nivel de titulacion esta en uso, no se puede actualizar",
			);

		const dto = new UpdateDetalleNivelTitulacionDTO(data);

		return this._detalleNivelTitulacionRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class DetalleNivelTitulacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "DetalleNivelTitulacionServiceError";
	}
}
