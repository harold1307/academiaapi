import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateSubPeriodoLectivo } from "../Domain/ICreateSubPeriodoLectivo";
import type { ISubPeriodoLectivo } from "../Domain/ISubPeriodoLectivo";
import type {
	ISubPeriodoLectivoRepository,
	UpdateSubPeriodoLectivoParams,
} from "../Domain/ISubPeriodoLectivoRepository";
import type { ISubPeriodoLectivoService } from "../Domain/ISubPeriodoLectivoService";
import { CreateSubPeriodoLectivoDTO } from "../Infrastructure/DTOs/CreateSubPeriodoLectivoDTO";
import { UpdateSubPeriodoLectivoDTO } from "../Infrastructure/DTOs/UpdateSubPeriodoLectivoDTO";

@injectable()
export class SubPeriodoLectivoService implements ISubPeriodoLectivoService {
	constructor(
		@inject(TYPES.SubPeriodoLectivoRepository)
		private _subPeriodoLectivoRepository: ISubPeriodoLectivoRepository,
	) {}

	getAllSubPeriodoLectivos(): Promise<ISubPeriodoLectivo[]> {
		return this._subPeriodoLectivoRepository.getAll();
	}

	getSubPeriodoLectivoById(id: string): Promise<ISubPeriodoLectivo | null> {
		return this._subPeriodoLectivoRepository.getById(id);
	}

	async deleteSubPeriodoLectivoById(id: string): Promise<ISubPeriodoLectivo> {
		const sub = await this._subPeriodoLectivoRepository.getById(id);

		if (!sub)
			throw new SubPeriodoLectivoServiceError(
				"El subperiodo lectivo no existe",
			);

		return this._subPeriodoLectivoRepository.deleteById(id);
	}

	createSubPeriodoLectivo(
		data: ICreateSubPeriodoLectivo,
	): Promise<ISubPeriodoLectivo> {
		const dto = new CreateSubPeriodoLectivoDTO(data);

		return this._subPeriodoLectivoRepository.create(dto.getData());
	}

	async updateSubPeriodoLectivoById({
		id,
		data,
	}: UpdateSubPeriodoLectivoParams): Promise<ISubPeriodoLectivo> {
		const dto = new UpdateSubPeriodoLectivoDTO(data);

		const sub = await this._subPeriodoLectivoRepository.getById(id);

		if (!sub)
			throw new SubPeriodoLectivoServiceError(
				"El subperiodo lectivo no existe",
			);

		return this._subPeriodoLectivoRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class SubPeriodoLectivoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "SubPeriodoLectivoServiceError";
	}
}
