import type { PrismaClient } from "@prisma/client";
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

		@inject(TYPES.PrismaClient) private _client: PrismaClient,
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

	async getAllMallasCurricularesWithAsignaturas() {
		return this._client.mallaCurricular.findMany({
			include: {
				asignaturasEnMalla: {
					include: {
						asignatura: true,
					},
				},
			},
		});
	}

	async getMallaCurricularById(id: string) {
		return this._mallaCurricularRepository.getById(id);
	}

	async getMallaCurricularByIdWithAsignaturas(id: string) {
		return this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				asignaturasEnMalla: {
					include: {
						asignatura: true,
					},
				},
			},
		});
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
