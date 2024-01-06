import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IEjeFormativo } from "../Domain/IEjeFormativo";
import type { IEjeFormativoRepository } from "../Domain/IEjeFormativoRepository";
import type { IEjeFormativoService } from "../Domain/IEjeFormativoService";
import { CreateEjeFormativoDTO } from "../Infrastructure/DTOs/CreateEjeFormativoDTO";

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
}

class EjeFormativoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "EjeFormativoServiceError";
	}
}
