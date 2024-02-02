import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IEjeFormativo } from "../Domain/IEjeFormativo";
import type {
	IEjeFormativoRepository,
	UpdateEjeFormativoParams,
} from "../Domain/IEjeFormativoRepository";
import type { IEjeFormativoService } from "../Domain/IEjeFormativoService";
import { CreateEjeFormativoDTO } from "../Infrastructure/DTOs/CreateEjeFormativoDTO";
import { UpdateEjeFormativoDTO } from "../Infrastructure/DTOs/UpdateEjeFormativoDTO";

@injectable()
export class EjeFormativoService implements IEjeFormativoService {
	constructor(
		@inject(TYPES.EjeFormativoRepository)
		private _ejeFormativoRepository: IEjeFormativoRepository,
	) {}

	createEjeFormativo(data: any): Promise<IEjeFormativo> {
		const dto = new CreateEjeFormativoDTO(data);

		return this._ejeFormativoRepository.create(dto.getData());
	}

	getAllEjeFormativos(): Promise<IEjeFormativo[]> {
		return this._ejeFormativoRepository.getAll();
	}

	getEjeFormativoById(id: string): Promise<IEjeFormativo | null> {
		return this._ejeFormativoRepository.getById(id);
	}

	async deleteEjeFormativoById(id: string): Promise<IEjeFormativo> {
		const eje = await this._ejeFormativoRepository.getById(id);

		if (!eje) throw new EjeFormativoServiceError("El eje formativo no existe.");

		if (eje.enUso)
			throw new EjeFormativoServiceError(
				"El eje formativo esta en uso, no se puede eliminar",
			);

		return this._ejeFormativoRepository.deleteById(id);
	}

	async updateEjeFormativoById({
		id,
		data,
	}: UpdateEjeFormativoParams): Promise<IEjeFormativo> {
		const dto = new UpdateEjeFormativoDTO(data);

		const eje = await this._ejeFormativoRepository.getById(id);

		if (!eje) throw new EjeFormativoServiceError("El eje formativo no existe");
		if (eje.enUso)
			throw new EjeFormativoServiceError(
				"El eje formativo esta en uso, no se puede actualizar",
			);

		return this._ejeFormativoRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class EjeFormativoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "EjeFormativoServiceError";
	}
}
