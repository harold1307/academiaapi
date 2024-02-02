import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAreaConocimiento } from "../Domain/IAreaConocimiento";
import type {
	IAreaConocimientoRepository,
	UpdateAreaConocimientoParams,
} from "../Domain/IAreaConocimientoRepository";
import type { IAreaConocimientoService } from "../Domain/IAreaConocimientoService";
import { CreateAreaConocimientoDTO } from "../Infrastructure/DTOs/CreateAreaConocimiento";
import { UpdateAreaConocimientoDTO } from "../Infrastructure/DTOs/UpdateAreaConocimientoDTO";

@injectable()
export class AreaConocimientoService implements IAreaConocimientoService {
	constructor(
		@inject(TYPES.AreaConocimientoRepository)
		private _areaConocimientoRepository: IAreaConocimientoRepository,
	) {}

	getAllAreaConocimientos(): Promise<IAreaConocimiento[]> {
		return this._areaConocimientoRepository.getAll();
	}

	getAreaConocimientoById(id: string): Promise<IAreaConocimiento | null> {
		return this._areaConocimientoRepository.getById(id);
	}

	createAreaConocimiento(data: any): Promise<IAreaConocimiento> {
		const dto = new CreateAreaConocimientoDTO(data);

		return this._areaConocimientoRepository.create(dto.getData());
	}

	async updateAreaConocimientoById({
		id,
		data,
	}: UpdateAreaConocimientoParams): Promise<IAreaConocimiento> {
		const dto = new UpdateAreaConocimientoDTO(data);

		const area = await this._areaConocimientoRepository.getById(id);

		if (!area)
			throw new AreaConocimientoServiceError(
				"El area de conocimiento no existe.",
			);

		if (area.enUso)
			throw new AreaConocimientoServiceError(
				"El area de conocimiento esta en uso, no se puede actualizar",
			);

		return this._areaConocimientoRepository.update({
			id,
			data: dto.getData(),
		});
	}

	async deleteAreaConocimientoById(id: string): Promise<IAreaConocimiento> {
		const area = await this._areaConocimientoRepository.getById(id);

		if (!area)
			throw new AreaConocimientoServiceError(
				"El area de conocimiento no existe.",
			);

		if (area.enUso)
			throw new AreaConocimientoServiceError(
				"El area de conocimiento esta en uso, no se puede eliminar",
			);

		return this._areaConocimientoRepository.deleteById(id);
	}
}

class AreaConocimientoServiceError extends Error {
	constructor(message: string) {
		super();
		this.name = "AreaConocimientoServiceError";
		this.message = message;
	}
}
