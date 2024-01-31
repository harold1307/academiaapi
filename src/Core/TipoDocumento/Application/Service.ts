import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateTipoDocumento } from "../Domain/ICreateTipoDocumento";
import type { ITipoDocumento } from "../Domain/ITipoDocumento";
import type {
	ITipoDocumentoRepository,
	UpdateTipoDocumentoParams,
} from "../Domain/ITipoDocumentoRepository";
import type { ITipoDocumentoService } from "../Domain/ITipoDocumentoService";
import { CreateTipoDocumentoDTO } from "../Infrastructure/DTOs/CreateTipoDocumentoDTO";
import { UpdateTipoDocumentoDTO } from "../Infrastructure/DTOs/UpdateTipoDocumentoDTO";

@injectable()
export class TipoDocumentoService implements ITipoDocumentoService {
	constructor(
		@inject(TYPES.TipoDocumentoRepository)
		private _tipoDocumentoRepository: ITipoDocumentoRepository,
	) {}

	getAllTiposDocumento(): Promise<ITipoDocumento[]> {
		return this._tipoDocumentoRepository.getAll();
	}

	getTipoDocumentoById(id: string): Promise<ITipoDocumento | null> {
		return this._tipoDocumentoRepository.getById(id);
	}

	async deleteTipoDocumentoById(id: string): Promise<ITipoDocumento> {
		const tipo = await this._tipoDocumentoRepository.getById(id);

		if (!tipo)
			throw new TipoDocumentoServiceError("El tipo de documento no existe");

		if (tipo.enUso)
			throw new TipoDocumentoServiceError(
				"El tipo de documento esta en uso, no se puede eliminar",
			);

		return this._tipoDocumentoRepository.deleteById(id);
	}

	createTipoDocumento(data: ICreateTipoDocumento): Promise<ITipoDocumento> {
		const dto = new CreateTipoDocumentoDTO(data);
		const valid = dto.getData();

		const trueValues = Object.entries(valid)
			.filter(([, v]) => typeof v === "boolean" && v)
			.map(([k]) => k);

		if (trueValues.length > 1)
			throw new TipoDocumentoServiceError(
				"Solo puede haber un tipo de documento activo",
			);

		return this._tipoDocumentoRepository.create(valid);
	}

	async updateTipoDocumentoById({
		id,
		data,
	}: UpdateTipoDocumentoParams): Promise<ITipoDocumento> {
		const dto = new UpdateTipoDocumentoDTO(data);
		const valid = dto.getData();

		const tipo = await this._tipoDocumentoRepository.getById(id);

		if (!tipo)
			throw new TipoDocumentoServiceError("El tipo de documento no existe");

		const updatedTipo = {
			...tipo,
			...Object.fromEntries(
				Object.entries(valid).filter(([, v]) => typeof v === "boolean"),
			),
		};

		if (Object.values(updatedTipo).filter(v => v === true).length > 1) {
			throw new TipoDocumentoServiceError(
				"Solo puede haber un tipo de documento activo",
			);
		}

		if (tipo.enUso) {
			const nonUndefinedKeys = Object.entries(valid)
				.filter(([, v]) => !!v)
				.map(([k]) => k);

			if (nonUndefinedKeys.includes("paraPasantia")) {
				return this._tipoDocumentoRepository.update({
					id,
					data: {
						paraPasantia: valid.paraPasantia,
					},
				});
			}

			throw new TipoDocumentoServiceError(
				"El tipo documento esta en uso, solo para pasantia es modificable",
			);
		}

		return this._tipoDocumentoRepository.update({ id, data: valid });
	}
}

class TipoDocumentoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "TipoDocumentoServiceError";
	}
}
