import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAlternativaEvaluacion } from "../Domain/IAlternativaEvaluacion";
import type {
	IAlternativaEvaluacionRepository,
	IUpdateAlternativaEvaluacionParams,
} from "../Domain/IAlternativaEvaluacionRepository";
import type { IAlternativaEvaluacionService } from "../Domain/IAlternativaEvaluacionService";
import type { ICreateAlternativaEvaluacion } from "../Domain/ICreateAlternativaEvaluacion";
import { CreateAlternativaEvaluacionDTO } from "../Infrastructure/DTOs/CreateAlternativaEvaluacionDTO";
import { UpdateAlternativaEvaluacionDTO } from "../Infrastructure/DTOs/UpdateAlternativaEvaluacionDTO";

@injectable()
export class AlternativaEvaluacionService
	implements IAlternativaEvaluacionService
{
	constructor(
		@inject(TYPES.AlternativaEvaluacionRepository)
		private _alternativaEvaluacionRepository: IAlternativaEvaluacionRepository,
	) {}

	getAllAlternativasEvaluacion(): Promise<IAlternativaEvaluacion[]> {
		return this._alternativaEvaluacionRepository.getAll();
	}

	getAlternativaEvaluacionById(
		id: string,
	): Promise<IAlternativaEvaluacion | null> {
		return this._alternativaEvaluacionRepository.getById(id);
	}

	async deleteAlternativaEvaluacionById(
		id: string,
	): Promise<IAlternativaEvaluacion> {
		const alternativa = await this._alternativaEvaluacionRepository.getById(id);

		if (!alternativa)
			throw new AlternativaEvaluacionServiceError(
				"No se encontro la alternativa de evaluacion",
			);

		if (alternativa.enUso)
			throw new AlternativaEvaluacionServiceError(
				"La alternativa de evaluacion esta en uso",
			);

		return this._alternativaEvaluacionRepository.deleteById(id);
	}

	createAlternativaEvaluacion(
		data: ICreateAlternativaEvaluacion,
	): Promise<IAlternativaEvaluacion> {
		const dto = new CreateAlternativaEvaluacionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear alternativa de evaluacion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new AlternativaEvaluacionServiceError(
				"Esquema para crear alternativa de evaluacion invalido",
			);
		}

		return this._alternativaEvaluacionRepository.create(validation.data);
	}
	async updateAlternativaEvaluacionById({
		id,
		data,
	}: IUpdateAlternativaEvaluacionParams): Promise<IAlternativaEvaluacion> {
		const alternativa = await this._alternativaEvaluacionRepository.getById(id);

		if (!alternativa)
			throw new AlternativaEvaluacionServiceError(
				"No se encontro la alternativa de evaluacion",
			);

		if (alternativa.enUso)
			throw new AlternativaEvaluacionServiceError(
				"La alternativa de evaluacion esta en uso",
			);

		const dto = new UpdateAlternativaEvaluacionDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar alternativa de evaluacion",
				JSON.stringify(validation.error, null, 2),
			);
			throw new AlternativaEvaluacionServiceError(
				"Esquema para actualizar alternativa de evaluacion invalido",
			);
		}

		return this._alternativaEvaluacionRepository.update({
			id,
			data: validation.data,
		});
	}
}

class AlternativaEvaluacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "AlternativaEvaluacionServiceError";
	}
}
