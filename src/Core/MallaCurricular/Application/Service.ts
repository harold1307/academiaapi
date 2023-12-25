import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IMallaCurricular } from "../Domain/IMallaCurricular";
import type { IMallaCurricularRepository } from "../Domain/IMallaCurricularRepository";
import type { IMallaCurricularService } from "../Domain/IMallaCurricularService";
import { CreateMallaCurricularDTO } from "../Infraestructure/DTOs/CreateMallaCurricularDTO";
import { UpdateMallaCurricularDTO } from "../Infraestructure/DTOs/UpdateMallaCurricularDTO";

@injectable()
export class MallaCurricularService implements IMallaCurricularService {
	constructor(
		@inject(TYPES.MallaCurricularRepository)
		private _mallaCurricularRepository: IMallaCurricularRepository,
	) {}

	async createMallaCurricular(data: any) {
		const dto = new CreateMallaCurricularDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear de malla curricular",
				validation.error,
			);
			throw new MallaCurricularError(
				"Esquema para crear de malla curricular invalido.",
			);
		}

		return this._mallaCurricularRepository.create(validation.data);
	}

	async getAllMallasCurriculares() {
		return this._mallaCurricularRepository.getAll();
	}

	async getMallaCurricularById(id: string) {
		return this._mallaCurricularRepository.getById(id);
	}

	async updateMallaCurricularById({
		id,
		mallaCurricular,
	}: {
		id: string;
		mallaCurricular: any;
	}) {
		const dto = new UpdateMallaCurricularDTO(mallaCurricular);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar mallaCurricular",
				JSON.stringify(validation.error),
			);
			throw new MallaCurricularError(
				"Esquema para actualizar mallaCurricular invalido.",
			);
		}

		return this._mallaCurricularRepository.update({
			id,
			mallaCurricular: validation.data,
		});
	}

	async deleteMallaCurricularById(id: string): Promise<IMallaCurricular> {
		return this._mallaCurricularRepository.deleteById(id);
	}
}

class MallaCurricularError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MallaCurricularError";
	}
}
