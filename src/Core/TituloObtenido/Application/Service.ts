import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateTituloObtenido } from "../Domain/ICreateTituloObtenido";
import type { ITituloObtenido } from "../Domain/ITituloObtenido";
import type {
	ITituloObtenidoRepository,
	UpdateTituloObtenidoParams,
} from "../Domain/ITituloObtenidoRepository";
import type { ITituloObtenidoService } from "../Domain/ITituloObtenidoService";
import { CreateTituloObtenidoDTO } from "../Infrastructure/DTOs/CreateTituloObtenidoDTO";
import { UpdateTituloObtenidoDTO } from "../Infrastructure/DTOs/UpdateTituloObtenidoDTO";

@injectable()
export class TituloObtenidoService implements ITituloObtenidoService {
	constructor(
		@inject(TYPES.TituloObtenidoRepository)
		private _tituloObtenidoRepository: ITituloObtenidoRepository,
	) {}

	getAllTitulosObtenidos(): Promise<ITituloObtenido[]> {
		return this._tituloObtenidoRepository.getAll();
	}

	getTituloObtenidoById(id: string): Promise<ITituloObtenido | null> {
		return this._tituloObtenidoRepository.getById(id);
	}

	async deleteTituloObtenidoById(id: string): Promise<ITituloObtenido> {
		const titulo = await this._tituloObtenidoRepository.getById(id);

		if (!titulo)
			throw new TituloObtenidoServiceError("El titulo obtenido no existe");

		if (titulo.enUso)
			throw new TituloObtenidoServiceError(
				"El titulo obtenido esta en uso, no se puede eliminar",
			);

		return this._tituloObtenidoRepository.deleteById(id);
	}

	createTituloObtenido(data: ICreateTituloObtenido): Promise<ITituloObtenido> {
		const dto = new CreateTituloObtenidoDTO(data);

		return this._tituloObtenidoRepository.create(dto.getData());
	}
	async updateTituloObtenidoById({
		id,
		data,
	}: UpdateTituloObtenidoParams): Promise<ITituloObtenido> {
		const dto = new UpdateTituloObtenidoDTO(data);

		const titulo = await this._tituloObtenidoRepository.getById(id);

		if (!titulo)
			throw new TituloObtenidoServiceError("El titulo obtenido no existe");

		if (titulo.enUso)
			throw new TituloObtenidoServiceError(
				"El titulo obtenido esta en uso, no se puede actualizar",
			);

		return this._tituloObtenidoRepository.update({ id, data: dto.getData() });
	}
}

class TituloObtenidoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "TituloObtenidoServiceError";
	}
}
