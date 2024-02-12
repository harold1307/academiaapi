import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateTipoDocumentoEnPrograma } from "../Domain/ICreateTipoDocumentoEnPrograma";
import type { ITipoDocumentoEnPrograma } from "../Domain/ITipoDocumentoEnPrograma";
import type {
	ITipoDocumentoEnProgramaRepository,
	UpdateTipoDocumentoEnProgramaParams,
} from "../Domain/ITipoDocumentoEnProgramaRepository";
import type { ITipoDocumentoEnProgramaService } from "../Domain/ITipoDocumentoEnProgramaService";
import { CreateTipoDocumentoEnProgramaDTO } from "../Infrastructure/DTOs/CreateTipoDocumentoEnProgramaDTO";
import { UpdateTipoDocumentoEnProgramaDTO } from "../Infrastructure/DTOs/UpdateTipoDocumentoEnProgramaDTO";

@injectable()
export class TipoDocumentoEnProgramaService
	implements ITipoDocumentoEnProgramaService
{
	constructor(
		@inject(TYPES.TipoDocumentoEnProgramaRepository)
		private _tipoDocumentoEnProgramaRepository: ITipoDocumentoEnProgramaRepository,
	) {}

	getAllTiposDocumentoEnProgramas(): Promise<ITipoDocumentoEnPrograma[]> {
		return this._tipoDocumentoEnProgramaRepository.getAll();
	}

	getTipoDocumentoEnProgramaById(
		id: string,
	): Promise<ITipoDocumentoEnPrograma | null> {
		return this._tipoDocumentoEnProgramaRepository.getById(id);
	}

	async deleteTipoDocumentoEnProgramaById(
		id: string,
	): Promise<ITipoDocumentoEnPrograma> {
		const tipo = await this._tipoDocumentoEnProgramaRepository.getById(id);

		if (!tipo)
			throw new TipoDocumentoEnProgramaServiceError(
				"El tipo de documento en programa no existe",
			);

		if (tipo.enUso) {
			throw new TipoDocumentoEnProgramaServiceError(
				"El tipo de documento en programa esta en uso, no se puede eliminar",
			);
		}

		return this._tipoDocumentoEnProgramaRepository.deleteById(id);
	}

	createTipoDocumentoEnPrograma(
		data: ICreateTipoDocumentoEnPrograma,
	): Promise<ITipoDocumentoEnPrograma> {
		const dto = new CreateTipoDocumentoEnProgramaDTO(data);

		return this._tipoDocumentoEnProgramaRepository.create(dto.getData());
	}
	async updateTipoDocumentoEnProgramaById({
		id,
		data,
	}: UpdateTipoDocumentoEnProgramaParams): Promise<ITipoDocumentoEnPrograma> {
		const dto = new UpdateTipoDocumentoEnProgramaDTO(data);

		const tipo = await this._tipoDocumentoEnProgramaRepository.getById(id);

		if (!tipo)
			throw new TipoDocumentoEnProgramaServiceError(
				"El tipo de documento en programa no existe",
			);

		if (tipo.enUso)
			throw new TipoDocumentoEnProgramaServiceError(
				"El tipo de documento en programa esta en uso, no se puede actualizar",
			);

		return this._tipoDocumentoEnProgramaRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class TipoDocumentoEnProgramaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "TipoDocumentoEnProgramaServiceError";
	}
}
