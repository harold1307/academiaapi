import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IEjeFormativo } from "../Domain/IEjeFormativo";
import type { IEjeFormativoRepository } from "../Domain/IEjeFormativoRepository";
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
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear de eje formativo",
				validation.error,
			);
			throw new EjeFormativoServiceError(
				"Esquema para crear de eje formativo invalido.",
			);
		}

		return this._ejeFormativoRepository.create(validation.data);
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
			throw new EjeFormativoServiceError("El eje formativo esta en uso.");

		return this._ejeFormativoRepository.deleteById(id);
	}

	async updateEjeFormativoById(params: {
		id: string;
		ejeFormativo: any;
	}): Promise<IEjeFormativo> {
		const eje = await this._ejeFormativoRepository.getById(params.id);

		if (!eje) throw new EjeFormativoServiceError("El eje formativo no existe");
		if (eje.enUso)
			throw new EjeFormativoServiceError("El eje formativo esta en uso.");

		const dto = new UpdateEjeFormativoDTO(params.ejeFormativo);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar de eje formativo",
				JSON.stringify(validation.error, null, 2),
			);
			throw new EjeFormativoServiceError(
				"Esquema para actualizar eje formativo invalido.",
			);
		}

		return this._ejeFormativoRepository.update({
			id: params.id,
			ejeFormativo: validation.data,
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
