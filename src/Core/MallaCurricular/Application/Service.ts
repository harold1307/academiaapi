import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateMallaCurricular } from "../Domain/ICreateMallaCurricular";
import type { ILugarEjecucion } from "../Domain/ILugarEjecucion";
import type { ILugarEjecucionRepository } from "../Domain/ILugarEjecucionRepository";
import type { IMallaCurricular } from "../Domain/IMallaCurricular";
import type {
	IMallaCurricularRepository,
	IUpdateMallaCurricularParams,
} from "../Domain/IMallaCurricularRepository";
import type {
	IMallaCurricularService,
	MallaCurricularWithLugaresEjecucion,
} from "../Domain/IMallaCurricularService";
import { CreateLugarEjecucionDTO } from "../Infraestructure/DTOs/CreateLugarEjecucionDTO";
import { CreateMallaCurricularDTO } from "../Infraestructure/DTOs/CreateMallaCurricularDTO";
import { UpdateMallaCurricularDTO } from "../Infraestructure/DTOs/UpdateMallaCurricularDTO";

@injectable()
export class MallaCurricularService implements IMallaCurricularService {
	constructor(
		@inject(TYPES.MallaCurricularRepository)
		private _mallaCurricularRepository: IMallaCurricularRepository,
		@inject(TYPES.LugarEjecucionRepository)
		private _lugarEjecucionRepository: ILugarEjecucionRepository,

		@inject(TYPES.PrismaClient) private _client: PrismaClient,
	) {}

	async createMallaCurricular(data: ICreateMallaCurricular) {
		const dto = new CreateMallaCurricularDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear de malla curricular",
				validation.error,
			);
			throw new MallaCurricularServiceError(
				"Esquema para crear de malla curricular invalido.",
			);
		}

		return this._mallaCurricularRepository.create(validation.data);
	}

	async getAllMallasCurriculares() {
		return this._mallaCurricularRepository.getAll();
	}

	async getAllMallasCurricularesWithAsignaturas() {
		const mallas = await this._client.mallaCurricular.findMany({
			include: {
				asignaturasEnMalla: {
					include: {
						asignatura: true,
						areaConocimiento: true,
						ejeFormativo: true,
						campoFormacion: true,
					},
				},
			},
		});

		return mallas.map(malla => {
			return {
				...malla,
				asignaturasEnMalla: malla.asignaturasEnMalla.map(a => ({
					...a,
					areaConocimiento: a.areaConocimiento
						? { ...a.areaConocimiento, enUso: true }
						: null,
					ejeFormativo: a.ejeFormativo
						? { ...a.ejeFormativo, enUso: true }
						: null,
					campoFormacion: a.campoFormacion
						? { ...a.campoFormacion, enUso: true }
						: null,
					asignatura: {
						...a.asignatura,
						enUso: true,
					},
				})),
			};
		});
	}

	async getMallaCurricularById(id: string) {
		return this._mallaCurricularRepository.getById(id);
	}

	async getMallaCurricularByIdWithAsignaturas(
		id: string,
		filters?: {
			asignaturas_esAnexo?: boolean;
		},
	) {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				asignaturasEnMalla: {
					where: { esAnexo: filters?.asignaturas_esAnexo ?? undefined },
					include: {
						asignatura: true,
						areaConocimiento: true,
						ejeFormativo: true,
						campoFormacion: true,
					},
				},
			},
		});

		if (!malla) return null;

		return {
			...malla,
			asignaturasEnMalla: malla.asignaturasEnMalla.map(a => ({
				...a,
				areaConocimiento: a.areaConocimiento
					? { ...a.areaConocimiento, enUso: true }
					: null,
				ejeFormativo: a.ejeFormativo
					? { ...a.ejeFormativo, enUso: true }
					: null,
				campoFormacion: a.campoFormacion
					? { ...a.campoFormacion, enUso: true }
					: null,
				asignatura: {
					...a.asignatura,
					enUso: true,
				},
			})),
		};
	}

	async updateMallaCurricularById({ id, data }: IUpdateMallaCurricularParams) {
		const dto = new UpdateMallaCurricularDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar mallaCurricular",
				JSON.stringify(validation.error),
			);
			throw new MallaCurricularServiceError(
				"Esquema para actualizar mallaCurricular invalido.",
			);
		}

		return this._mallaCurricularRepository.update({
			id,
			data: validation.data,
		});
	}

	async deleteMallaCurricularById(id: string): Promise<IMallaCurricular> {
		return this._mallaCurricularRepository.deleteById(id);
	}

	async createLugarEjecucion(
		mallaId: string,
		data: any,
	): Promise<ILugarEjecucion> {
		const malla = this._mallaCurricularRepository.getById(mallaId);

		if (!malla) throw new MallaCurricularServiceError("La malla no existe.");

		const dto = new CreateLugarEjecucionDTO({ ...data, mallaId });
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear lugar de ejecucion.",
				JSON.stringify(validation.error, null, 2),
			);
			throw new MallaCurricularServiceError(
				"Esquema para crear lugar de ejecucion invalido.",
			);
		}

		return this._lugarEjecucionRepository.create(validation.data);
	}

	async getMallaCurricularByIdWithLugaresEjecucion(
		id: string,
	): Promise<MallaCurricularWithLugaresEjecucion | null> {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				lugaresEjecucion: {
					include: {
						institucion: true,
					},
				},
			},
		});

		if (!malla) return null;

		return {
			...malla,
			lugaresEjecucion: malla.lugaresEjecucion.map(l => ({
				...l,
				institucion: {
					...l.institucion,
					enUso: true,
				},
			})),
		};
	}
}

class MallaCurricularServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MallaCurricularServiceError";
	}
}
