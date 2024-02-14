import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateCronogramaMatriculacion } from "../Domain/ICreateCronogramaMatriculacion";
import type { ICronogramaMatriculacion } from "../Domain/ICronogramaMatriculacion";
import type {
	ICronogramaMatriculacionRepository,
	UpdateCronogramaMatriculacionParams,
} from "../Domain/ICronogramaMatriculacionRepository";
import type { ICronogramaMatriculacionService } from "../Domain/ICronogramaMatriculacionService";
import { CreateCronogramaMatriculacionDTO } from "../Infrastructure/DTOs/CreateCronogramaMatriculacionDTO";
import { UpdateCronogramaMatriculacionDTO } from "../Infrastructure/DTOs/UpdateCronogramaMatriculacionDTO";

@injectable()
export class CronogramaMatriculacionService
	implements ICronogramaMatriculacionService
{
	constructor(
		@inject(TYPES.CronogramaMatriculacionRepository)
		private _cronogramaMatriculacionRepository: ICronogramaMatriculacionRepository,
	) {}

	getAllCronogramaMatriculacions(): Promise<ICronogramaMatriculacion[]> {
		return this._cronogramaMatriculacionRepository.getAll();
	}

	getCronogramaMatriculacionById(
		id: string,
	): Promise<ICronogramaMatriculacion | null> {
		return this._cronogramaMatriculacionRepository.getById(id);
	}

	deleteCronogramaMatriculacionById(
		id: string,
	): Promise<ICronogramaMatriculacion> {
		return this._cronogramaMatriculacionRepository.deleteById(id);
	}

	createCronogramaMatriculacion(
		data: ICreateCronogramaMatriculacion,
	): Promise<ICronogramaMatriculacion> {
		const dto = new CreateCronogramaMatriculacionDTO(data);

		return this._cronogramaMatriculacionRepository.create(dto.getData());
	}

	async updateCronogramaMatriculacionById({
		id,
		data,
	}: UpdateCronogramaMatriculacionParams): Promise<ICronogramaMatriculacion> {
		const dto = new UpdateCronogramaMatriculacionDTO(data);

		const cronograma =
			await this._cronogramaMatriculacionRepository.getById(id);

		if (!cronograma)
			throw new CronogramaMatriculacionServiceError(
				"El cronograma de matriculacion no existe",
			);

		return this._cronogramaMatriculacionRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class CronogramaMatriculacionServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CronogramaMatriculacionServiceError";
	}
}
