import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateMallaCurricular } from "../Domain/ICreateMallaCurricular";
import type { ILugarEjecucion } from "../Domain/ILugarEjecucion";
import type { ILugarEjecucionRepository } from "../Domain/ILugarEjecucionRepository";
import type { IMallaCurricular } from "../Domain/IMallaCurricular";
import type {
	IMallaCurricularRepository,
	UpdateMallaCurricularParams,
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

		return this._mallaCurricularRepository.create(dto.getData());
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
				lugaresEjecucion: {
					take: 1,
				},
			},
		});

		return mallas.map(({ asignaturasEnMalla, lugaresEjecucion, ...rest }) => ({
			...rest,
			asignaturasEnMalla: asignaturasEnMalla.map(a => ({
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
			enUso: asignaturasEnMalla.length > 0 || lugaresEjecucion.length > 0,
		}));
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
				lugaresEjecucion: {
					take: 1,
				},
			},
		});

		if (!malla) return null;

		const { asignaturasEnMalla, lugaresEjecucion, ...rest } = malla;

		return {
			...rest,
			asignaturasEnMalla: asignaturasEnMalla.map(a => ({
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
			enUso: asignaturasEnMalla.length > 0 || lugaresEjecucion.length > 0,
		};
	}

	async updateMallaCurricularById({ id, data }: UpdateMallaCurricularParams) {
		const dto = new UpdateMallaCurricularDTO(data);

		return this._mallaCurricularRepository.update({
			id,
			data: dto.getData(),
		});
	}

	async deleteMallaCurricularById(id: string): Promise<IMallaCurricular> {
		const malla = await this._mallaCurricularRepository.getById(id);

		if (!malla) throw new MallaCurricularServiceError("La malla no existe");

		if (malla.enUso)
			throw new MallaCurricularServiceError(
				"La malla esta en uso, no se puede eliminar",
			);

		return this._mallaCurricularRepository.deleteById(id);
	}

	async createLugarEjecucion(
		mallaId: string,
		data: any,
	): Promise<ILugarEjecucion> {
		const dto = new CreateLugarEjecucionDTO({ ...data, mallaId });

		const malla = this._mallaCurricularRepository.getById(mallaId);

		if (!malla) throw new MallaCurricularServiceError("La malla no existe");

		return this._lugarEjecucionRepository.create(dto.getData());
	}

	async getMallaCurricularByIdWithLugaresEjecucion(
		id: string,
	): Promise<MallaCurricularWithLugaresEjecucion | null> {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				lugaresEjecucion: {
					include: {
						sede: true,
					},
				},
				asignaturasEnMalla: {
					take: 1,
				},
			},
		});

		if (!malla) return null;

		const { asignaturasEnMalla, lugaresEjecucion, ...rest } = malla;

		return {
			...rest,
			lugaresEjecucion: malla.lugaresEjecucion.map(l => ({
				...l,
				sede: {
					...l.sede,
					enUso: true,
				},
			})),
			enUso: asignaturasEnMalla.length > 0 || lugaresEjecucion.length > 0,
		};
	}
}

class MallaCurricularServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MallaCurricularServiceError";
	}
}
