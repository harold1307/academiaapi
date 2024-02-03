import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreatePracticaComunitariaEnMalla } from "../../PracticaComunitariaEnMalla/Domain/ICreatePracticaComunitariaEnMalla";
import { CreatePracticaComunitariaEnMallaDTO } from "../../PracticaComunitariaEnMalla/Infrastructure/DTOs/CreatePracticaComunitariaEnMallaDTO";
import type { ICreatePracticaPreProfesionalEnMalla } from "../../PracticaPreProfesionalEnMalla/Domain/ICreatePracticaPreProfesionalEnMalla";
import { CreatePracticaPreProfesionalEnMallaDTO } from "../../PracticaPreProfesionalEnMalla/Infrastructure/DTOs/CreatePracticaPreProfesionalEnMallaDTO";
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
	MallaCurricularWithAsignaturas,
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

	async createMallaCurricular({
		practicasComunitarias,
		practicasPreProfesionales,
		...data
	}: ICreateMallaCurricular & {
		practicasPreProfesionales: ICreatePracticaPreProfesionalEnMalla | null;
		practicasComunitarias: ICreatePracticaComunitariaEnMalla | null;
	}) {
		const dto = new CreateMallaCurricularDTO(data);
		const { niveles, programaId, modalidadId, tituloObtenidoId, ...valid } =
			dto.getData();

		return this._mallaCurricularRepository.transaction(async tx => {
			const newMalla = await tx.mallaCurricular.create({
				data: {
					...valid,
					niveles: {
						createMany: {
							data: new Array(niveles - 1).fill(0).map((_, i) => ({
								nivel: i + 1,
							})),
						},
					},
					programa: {
						connect: { id: programaId },
					},
					modalidad: {
						connect: { id: modalidadId },
					},
					tituloObtenido: tituloObtenidoId
						? { connect: { id: tituloObtenidoId } }
						: undefined,
				},
			});

			if (practicasPreProfesionales) {
				const preProfesionalDto = new CreatePracticaPreProfesionalEnMallaDTO({
					...practicasPreProfesionales,
					mallaCurricularId: newMalla.id,
				});

				const {
					mallaCurricularId: preProfesionalMallaId,
					registroDesdeNivel: preProfesionalRegistroDesdeNivel,
					...preProfesionalRest
				} = preProfesionalDto.getData();

				await tx.practicaPreProfesionalEnMalla.create({
					data: {
						...preProfesionalRest,
						mallaCurricular: {
							connect: {
								id: preProfesionalMallaId,
							},
						},
						registroDesdeNivel: preProfesionalRegistroDesdeNivel
							? {
									connect: {
										nivel_mallaId: {
											nivel: preProfesionalRegistroDesdeNivel,
											mallaId: preProfesionalMallaId,
										},
									},
								}
							: undefined,
					},
				});
			}

			if (practicasComunitarias) {
				const comunitariaDto = new CreatePracticaComunitariaEnMallaDTO({
					...practicasComunitarias,
					mallaCurricularId: newMalla.id,
				});

				const {
					mallaCurricularId: comunitariaMallaId,
					registroDesdeNivel: comunitariaRegistroDesdeNivel,
					...comunitariaRest
				} = comunitariaDto.getData();

				await tx.practicaComunitariaEnMalla.create({
					data: {
						...comunitariaRest,
						mallaCurricular: { connect: { id: comunitariaMallaId } },
						registroDesdeNivel: comunitariaRegistroDesdeNivel
							? {
									connect: {
										nivel_mallaId: {
											nivel: comunitariaRegistroDesdeNivel,
											mallaId: comunitariaMallaId,
										},
									},
								}
							: undefined,
					},
				});
			}

			const malla = await tx.mallaCurricular.findUnique({
				where: { id: newMalla.id },
				include: {
					practicaComunitaria: true,
					practicaPreProfesional: true,
					tituloObtenido: true,
				},
			});

			if (!malla)
				throw new MallaCurricularServiceError(
					"No se pudo obtener la nueva malla creada",
				);

			const { tituloObtenido, ...rest } = malla;

			return {
				...rest,
				tituloObtenido: tituloObtenido
					? { ...tituloObtenido, enUso: true }
					: null,
				enUso: false,
			};
		});
	}

	async getAllMallasCurriculares() {
		return this._mallaCurricularRepository.getAll();
	}

	async getAllMallasCurricularesWithAsignaturas(): Promise<
		MallaCurricularWithAsignaturas[]
	> {
		const mallas = await this._client.mallaCurricular.findMany({
			include: {
				niveles: {
					include: {
						asignaturas: {
							include: {
								areaConocimiento: true,
								ejeFormativo: true,
								campoFormacion: true,
								asignatura: true,
							},
						},
					},
				},
				modulos: {
					include: {
						areaConocimiento: true,
						campoFormacion: true,
						asignatura: true,
					},
				},
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
			},
		});

		return mallas.map(({ niveles, modulos, tituloObtenido, ...m }) => ({
			...m,
			niveles: niveles.map(({ asignaturas, ...n }) => ({
				...n,
				asignaturas: asignaturas.map(
					({
						areaConocimiento,
						ejeFormativo,
						campoFormacion,
						asignatura,
						...a
					}) => ({
						...a,
						areaConocimiento: { ...areaConocimiento, enUso: true },
						ejeFormativo: { ...ejeFormativo, enUso: true },
						campoFormacion: campoFormacion
							? { ...campoFormacion, enUso: true }
							: null,
						asignatura: {
							...asignatura,
							enUso: true,
						},
					}),
				),
			})),
			modulos: modulos.map(
				({ areaConocimiento, campoFormacion, asignatura, ...m }) => ({
					...m,
					areaConocimiento: { ...areaConocimiento, enUso: true },
					campoFormacion: { ...campoFormacion, enUso: true },
					asignatura: {
						...asignatura,
						enUso: true,
					},
				}),
			),
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: false,
		}));
	}

	async getMallaCurricularById(id: string) {
		return this._mallaCurricularRepository.getById(id);
	}

	async getMallaCurricularByIdWithAsignaturas(id: string) {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				niveles: {
					include: {
						asignaturas: {
							include: {
								areaConocimiento: true,
								ejeFormativo: true,
								campoFormacion: true,
								asignatura: true,
							},
						},
					},
				},
				modulos: {
					include: {
						areaConocimiento: true,
						campoFormacion: true,
						asignatura: true,
					},
				},
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
			},
		});

		if (!malla) return null;

		const { niveles, modulos, tituloObtenido, ...m } = malla;

		return {
			...m,
			niveles: niveles.map(({ asignaturas, ...n }) => ({
				...n,
				asignaturas: asignaturas.map(
					({
						areaConocimiento,
						ejeFormativo,
						campoFormacion,
						asignatura,
						...a
					}) => ({
						...a,
						areaConocimiento: { ...areaConocimiento, enUso: true },
						ejeFormativo: { ...ejeFormativo, enUso: true },
						campoFormacion: campoFormacion
							? { ...campoFormacion, enUso: true }
							: null,
						asignatura: {
							...asignatura,
							enUso: true,
						},
					}),
				),
			})),
			modulos: modulos.map(
				({ areaConocimiento, campoFormacion, asignatura, ...m }) => ({
					...m,
					areaConocimiento: { ...areaConocimiento, enUso: true },
					campoFormacion: { ...campoFormacion, enUso: true },
					asignatura: {
						...asignatura,
						enUso: true,
					},
				}),
			),
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: false,
		};
	}

	async updateMallaCurricularById({ id, data }: UpdateMallaCurricularParams) {
		const dto = new UpdateMallaCurricularDTO(data);

		const malla = await this._mallaCurricularRepository.getById(id);

		if (!malla) throw new MallaCurricularServiceError("La malla no existe");

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
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
			},
		});

		if (!malla) return null;

		const { lugaresEjecucion, tituloObtenido, ...rest } = malla;

		return {
			...rest,
			lugaresEjecucion: lugaresEjecucion.map(({ sede, ...rest }) => ({
				...rest,
				sede: {
					...sede,
					enUso: true,
				},
			})),
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: false,
		};
	}
}

class MallaCurricularServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MallaCurricularServiceError";
	}
}
