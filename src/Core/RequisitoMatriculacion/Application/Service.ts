import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateRequisitoMatriculacion } from "../Domain/ICreateRequisitoMatriculacion";
import type { IRequisitoMatriculacion } from "../Domain/IRequisitoMatriculacion";
import type {
	IRequisitoMatriculacionRepository,
	UpdateRequisitoMatriculacionParams,
} from "../Domain/IRequisitoMatriculacionRepository";
import type { IRequisitoMatriculacionService } from "../Domain/IRequisitoMatriculacionService";
import { CreateRequisitoMatriculacionDTO } from "../Infrastructure/DTOs/CreateRequisitoMatriculacionDTO";
import { UpdateRequisitoMatriculacionDTO } from "../Infrastructure/DTOs/UpdateRequisitoMatriculacionDTO";

@injectable()
export class RequisitoMatriculacionService
	implements IRequisitoMatriculacionService
{
	constructor(
		@inject(TYPES.RequisitoMatriculacionRepository)
		private _requisitoMatriculacionRepository: IRequisitoMatriculacionRepository,
	) {}

	getAllRequisitoMatriculacions(): Promise<IRequisitoMatriculacion[]> {
		return this._requisitoMatriculacionRepository.getAll();
	}

	getRequisitoMatriculacionById(
		id: string,
	): Promise<IRequisitoMatriculacion | null> {
		return this._requisitoMatriculacionRepository.getById(id);
	}

	async deleteRequisitoMatriculacionById(
		id: string,
	): Promise<IRequisitoMatriculacion> {
		const requisito = await this._requisitoMatriculacionRepository.getById(id);

		if (!requisito)
			throw new RequisitoMatriculacionServiceError(
				"El requisito de matriculacion no existe",
			);

		return this._requisitoMatriculacionRepository.deleteById(id);
	}

	createRequisitoMatriculacion(
		data: ICreateRequisitoMatriculacion,
	): Promise<IRequisitoMatriculacion> {
		const dto = new CreateRequisitoMatriculacionDTO(data);

		return this._requisitoMatriculacionRepository.create(dto.getData());
	}

	async updateRequisitoMatriculacionById({
		id,
		data,
	}: UpdateRequisitoMatriculacionParams): Promise<IRequisitoMatriculacion> {
		const dto = new UpdateRequisitoMatriculacionDTO(data);
		const valid = dto.getData();

		const requisito = await this._requisitoMatriculacionRepository.getById(id);

		if (!requisito)
			throw new RequisitoMatriculacionServiceError(
				"El requisito de matriculacion no existe",
			);

		if (valid.sedeId === requisito.sedeId) {
			valid.sedeId = undefined;
		}
		if (valid.programaId === requisito.programaId) {
			valid.programaId = undefined;
		}
		if (valid.modalidadId === requisito.modalidadId) {
			valid.modalidadId = undefined;
		}
		if (valid.tipoDocumentoId === requisito.tipoDocumentoId) {
			valid.tipoDocumentoId = undefined;
		}

		return this._requisitoMatriculacionRepository.update({
			id,
			data: valid,
		});
	}
}

class RequisitoMatriculacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "RequisitoMatriculacionServiceError";
	}
}
