import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
// import type { ICreateMallaCurricular } from "../../Domain/ICreateMallaCurricular";
import type { IMallaCurricular } from "../../Domain/IMallaCurricular";
import type { IMallaCurricularQueryFilter } from "../../Domain/IMallaCurricularQueryFilter";
import type {
	IMallaCurricularRepository,
	UpdateMallaCurricularParams,
} from "../../Domain/IMallaCurricularRepository";

@injectable()
export class MallaCurricularRepository implements IMallaCurricularRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	// async create({
	// 	modalidadId,
	// 	programaId,
	// 	tituloObtenidoId,
	// 	...data
	// }: Omit<ICreateMallaCurricular, "niveles">) {
	// 	const malla = await this._client.mallaCurricular.create({
	// 		data: {
	// 			...data,
	// 			modalidad: { connect: { id: modalidadId } },
	// 			programa: { connect: { id: programaId } },
	// 			tituloObtenido: tituloObtenidoId
	// 				? { connect: { id: tituloObtenidoId } }
	// 				: undefined,
	// 		},
	// 		include: {
	// 			practicaComunitaria: true,
	// 			practicaPreProfesional: true,
	// 			tituloObtenido: true,
	// 		},
	// 	});

	// 	const { tituloObtenido, ...rest } = malla;

	// 	return {
	// 		...rest,
	// 		tituloObtenido: tituloObtenido
	// 			? { ...tituloObtenido, enUso: true }
	// 			: null,
	// 		enUso: false,
	// 	};
	// }
	async getAll(
		filters: IMallaCurricularQueryFilter,
	): Promise<IMallaCurricular[]> {
		const mallas = await this._client.mallaCurricular.findMany({
			where: {
				...(filters || {}),
			},
			include: {
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
				niveles: {
					include: {
						asignaturas: {
							include: {
								asignatura: true,
								campoFormacion: true,
								areaConocimiento: true,
								ejeFormativo: true,
							},
						},
						nivelesAcademicos: {
							take: 1,
						},
					},
				},
				modalidad: true,
				modulos: {
					include: {
						asignatura: true,
					},
				},
			},
		});

		return mallas.map(
			({ tituloObtenido, niveles, modulos, modalidad, ...rest }) => ({
				...rest,
				modalidad: {
					...modalidad,
					enUso: true,
				},
				modulos: modulos.map(({ asignatura, ...m }) => ({
					...m,
					asignatura: {
						...asignatura,
						enUso: true,
					},
				})),
				niveles: niveles.map(({ asignaturas, nivelesAcademicos, ...n }) => ({
					...n,
					asignaturas: asignaturas.map(
						({
							asignatura,
							campoFormacion,
							areaConocimiento,
							ejeFormativo,
							...a
						}) => ({
							...a,
							asignatura: {
								...asignatura,
								enUso: true,
							},
							campoFormacion: campoFormacion
								? {
										...campoFormacion,
										enUso: true,
									}
								: null,
							areaConocimiento: {
								...areaConocimiento,
								enUso: true,
							},
							ejeFormativo: {
								...ejeFormativo,
								enUso: true,
							},
						}),
					),
					enUso: nivelesAcademicos.length > 0,
				})),
				tituloObtenido: tituloObtenido
					? { ...tituloObtenido, enUso: true }
					: null,
				enUso:
					niveles.filter(nivel => nivel.nivelesAcademicos.length).length > 0,
			}),
		);
	}

	async getById(id: string): Promise<IMallaCurricular | null> {
		const malla = await this._client.mallaCurricular.findUnique({
			where: { id },
			include: {
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
				modalidad: true,
				niveles: {
					include: {
						asignaturas: {
							include: {
								asignatura: true,
								campoFormacion: true,
								areaConocimiento: true,
								ejeFormativo: true,
							},
						},
						nivelesAcademicos: {
							take: 1,
						},
					},
				},
				modulos: {
					include: {
						asignatura: true,
					},
				},
			},
		});

		if (!malla) return null;

		const { tituloObtenido, niveles, modulos, modalidad, ...rest } = malla;

		return {
			...rest,
			modalidad: {
				...modalidad,
				enUso: true,
			},
			modulos: modulos.map(({ asignatura, ...m }) => ({
				...m,
				asignatura: {
					...asignatura,
					enUso: true,
				},
			})),
			niveles: niveles.map(({ asignaturas, nivelesAcademicos, ...n }) => ({
				...n,
				asignaturas: asignaturas.map(
					({
						asignatura,
						campoFormacion,
						areaConocimiento,
						ejeFormativo,
						...a
					}) => ({
						...a,
						asignatura: {
							...asignatura,
							enUso: true,
						},
						campoFormacion: campoFormacion
							? {
									...campoFormacion,
									enUso: true,
								}
							: null,
						areaConocimiento: {
							...areaConocimiento,
							enUso: true,
						},
						ejeFormativo: {
							...ejeFormativo,
							enUso: true,
						},
					}),
				),
				enUso: nivelesAcademicos.length > 0,
			})),
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: niveles.filter(nivel => nivel.nivelesAcademicos.length).length > 0,
		};
	}

	async update({
		id,
		data: { tituloObtenidoId, ...data },
	}: UpdateMallaCurricularParams): Promise<IMallaCurricular> {
		const malla = await this._client.mallaCurricular.update({
			where: {
				id,
			},
			data: {
				...data,
				...(tituloObtenidoId
					? { tituloObtenido: { connect: { id: tituloObtenidoId } } }
					: {}),
			},
			include: {
				modalidad: true,
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
				niveles: {
					include: {
						asignaturas: {
							include: {
								asignatura: true,
								campoFormacion: true,
								areaConocimiento: true,
								ejeFormativo: true,
							},
						},
						nivelesAcademicos: {
							take: 1,
						},
					},
				},
				modulos: {
					include: {
						asignatura: true,
					},
				},
			},
		});

		const { tituloObtenido, niveles, modulos, modalidad, ...rest } = malla;

		return {
			...rest,
			modalidad: {
				...modalidad,
				enUso: true,
			},
			modulos: modulos.map(({ asignatura, ...m }) => ({
				...m,
				asignatura: {
					...asignatura,
					enUso: true,
				},
			})),
			niveles: niveles.map(({ asignaturas, nivelesAcademicos, ...n }) => ({
				...n,
				asignaturas: asignaturas.map(
					({
						asignatura,
						campoFormacion,
						areaConocimiento,
						ejeFormativo,
						...a
					}) => ({
						...a,
						asignatura: {
							...asignatura,
							enUso: true,
						},
						campoFormacion: campoFormacion
							? {
									...campoFormacion,
									enUso: true,
								}
							: null,
						areaConocimiento: {
							...areaConocimiento,
							enUso: true,
						},
						ejeFormativo: {
							...ejeFormativo,
							enUso: true,
						},
					}),
				),
				enUso: nivelesAcademicos.length > 0,
			})),
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: niveles.filter(nivel => nivel.nivelesAcademicos.length).length > 0,
		};
	}

	async deleteById(id: string): Promise<IMallaCurricular> {
		const malla = await this._client.mallaCurricular.delete({
			where: { id },
			include: {
				practicaComunitaria: true,
				practicaPreProfesional: true,
				tituloObtenido: true,
				niveles: {
					include: {
						asignaturas: {
							include: {
								asignatura: true,
								campoFormacion: true,
								areaConocimiento: true,
								ejeFormativo: true,
							},
						},
					},
				},
				modulos: {
					include: {
						asignatura: true,
					},
				},
				modalidad: true,
			},
		});

		const { tituloObtenido, niveles, modulos, modalidad, ...rest } = malla;

		return {
			...rest,
			modalidad: {
				...modalidad,
				enUso: true,
			},
			modulos: modulos.map(({ asignatura, ...m }) => ({
				...m,
				asignatura: {
					...asignatura,
					enUso: true,
				},
			})),
			niveles: niveles.map(({ asignaturas, ...n }) => ({
				...n,
				asignaturas: asignaturas.map(
					({
						asignatura,
						campoFormacion,
						areaConocimiento,
						ejeFormativo,
						...a
					}) => ({
						...a,
						asignatura: {
							...asignatura,
							enUso: true,
						},
						campoFormacion: campoFormacion
							? {
									...campoFormacion,
									enUso: true,
								}
							: null,
						areaConocimiento: {
							...areaConocimiento,
							enUso: true,
						},
						ejeFormativo: {
							...ejeFormativo,
							enUso: true,
						},
					}),
				),
				enUso: false,
			})),
			tituloObtenido: tituloObtenido
				? { ...tituloObtenido, enUso: true }
				: null,
			enUso: false,
		};
	}

	transaction(
		tx: (
			prisma: Omit<
				PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
				| "$transaction"
				| "$connect"
				| "$disconnect"
				| "$on"
				| "$use"
				| "$extends"
			>,
		) => Promise<IMallaCurricular>,
	): Promise<IMallaCurricular> {
		return this._client.$transaction(tx);
	}
}
