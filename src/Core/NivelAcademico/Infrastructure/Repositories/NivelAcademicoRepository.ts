import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
// import type { ICreateNivelAcademico } from "../../Domain/ICreateNivelAcademico";
import type { INivelAcademico } from "../../Domain/INivelAcademico";
import type {
	GetAllNivelesAcademicosParams,
	INivelAcademicoRepository,
	UpdateNivelAcademicoParams,
} from "../../Domain/INivelAcademicoRepository";
import type { INivelAcademicoWithMaterias } from "../../Domain/INivelAcademicoWithMaterias";

@injectable()
export class NivelAcademicoRepository implements INivelAcademicoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(
		params?: GetAllNivelesAcademicosParams,
	): Promise<INivelAcademico[]> {
		const { filters } = params || {};
		const { mallaId, nivelMallaId, programaId, ...plainFilters } =
			filters || {};

		const niveles = await this._client.nivelAcademico.findMany({
			where: filters
				? {
						...plainFilters,
						nivelMalla: {
							id: nivelMallaId,
							mallaId,
							...(programaId ? { malla: { programaId } } : {}),
						},
					}
				: undefined,
			include: {
				sesion: {
					include: {
						turnos: true,
						sede: true,
					},
				},
				nivelMalla: true,
			},
		});

		return niveles.map(({ sesion: { sede, ...sesion }, ...rest }) => ({
			...rest,
			sesion: {
				...sesion,
				sede: { ...sede, enUso: true },
				turnos: sesion.turnos.map(t => ({ ...t, enUso: true })),
				enUso: true,
			},
		}));
	}

	async getById(id: string): Promise<INivelAcademico | null> {
		const nivel = await this._client.nivelAcademico.findUnique({
			where: { id },
			include: {
				sesion: {
					include: {
						turnos: true,
						sede: true,
					},
				},
				nivelMalla: true,
			},
		});

		if (!nivel) return null;

		const {
			sesion: { sede, ...sesion },
			...rest
		} = nivel;

		return {
			...rest,
			sesion: {
				...sesion,
				sede: { ...sede, enUso: true },
				turnos: sesion.turnos.map(t => ({ ...t, enUso: true })),
				enUso: true,
			},
		};
	}

	async getByIdWithMaterias(
		id: string,
	): Promise<INivelAcademicoWithMaterias | null> {
		const nivel = await this._client.nivelAcademico.findUnique({
			where: { id },
			include: {
				sesion: {
					include: {
						turnos: true,
						sede: true,
					},
				},
				nivelMalla: true,
				materias: {
					include: {
						asignaturaEnNivelMalla: {
							include: {
								asignatura: true,
							},
						},
						asignaturaModulo: {
							include: { asignatura: true },
						},
						modeloEvaluativo: true,
					},
				},
			},
		});

		if (!nivel) return null;

		const {
			sesion: { sede, ...sesion },
			materias,
			...rest
		} = nivel;

		return {
			...rest,
			sesion: {
				...sesion,
				sede: { ...sede, enUso: true },
				turnos: sesion.turnos.map(t => ({ ...t, enUso: true })),
				enUso: true,
			},
			materias: materias.map(
				({
					asignaturaEnNivelMalla,
					asignaturaModulo,
					modeloEvaluativo,
					...m
				}) => ({
					...m,
					asignaturaEnNivelMalla: asignaturaEnNivelMalla
						? {
								...asignaturaEnNivelMalla,
								asignatura: {
									...asignaturaEnNivelMalla.asignatura,
									enUso: true,
								},
							}
						: null,
					asignaturaModulo: asignaturaModulo
						? {
								...asignaturaModulo,
								asignatura: {
									...asignaturaModulo.asignatura,
									enUso: true,
								},
							}
						: null,
					modeloEvaluativo: {
						...modeloEvaluativo,
						enUso: true,
					},
				}),
			),
		};
	}

	async deleteById(id: string): Promise<INivelAcademico> {
		const nivel = await this._client.nivelAcademico.delete({
			where: { id },
			include: {
				sesion: {
					include: {
						turnos: true,
						sede: true,
					},
				},
				nivelMalla: true,
			},
		});

		const {
			sesion: { sede, ...sesion },
			...rest
		} = nivel;

		return {
			...rest,
			sesion: {
				...sesion,
				sede: { ...sede, enUso: true },
				turnos: sesion.turnos.map(t => ({ ...t, enUso: true })),
				enUso: true,
			},
		};
	}

	// async create({
	// 	sesionId,
	// 	paraleloId,
	// 	nivelMallaId,
	// 	modeloEvaluativoId,
	// 	...data
	// }: ICreateNivelAcademico): Promise<INivelAcademico> {
	// 	const asignaturasEnMalla =
	// 		await this._client.asignaturaEnNivelMalla.findMany({
	// 			where: { nivelMallaId },
	// 		});

	// 	const nivel =await this._client.nivelAcademico.create({
	// 		data: {
	// 			...data,
	// 			sesion: { connect: { id: sesionId } },
	// 			paralelo: { connect: { id: paraleloId } },
	// 			nivelMalla: { connect: { id: nivelMallaId } },
	// 			modeloEvaluativo: { connect: { id: modeloEvaluativoId } },
	// 			materias: {
	// 				createMany: {
	// 					data: asignaturasEnMalla.map(asignaturaEnMalla => ({
	// 						validaParaCreditos: asignaturaEnMalla.validaParaCredito,
	// 						validaParaPromedio: asignaturaEnMalla.validaParaPromedio,
	// 						asignaturaEnNivelMallaId: asignaturaEnMalla.id,
	// 						materiaExterna: false,
	// 						practicasPermitidas: false,
	// 					})),
	// 				},
	// 			},
	// 		},
	// 	});
	// }

	async update({
		id,
		data: { paraleloId, modeloEvaluativoId, ...data },
	}: UpdateNivelAcademicoParams): Promise<INivelAcademico> {
		const nivel = await this._client.nivelAcademico.update({
			where: { id },
			data: {
				...data,
				paralelo: paraleloId ? { connect: { id: paraleloId } } : undefined,
				modeloEvaluativo: modeloEvaluativoId
					? { connect: { id: modeloEvaluativoId } }
					: undefined,
			},
			include: {
				sesion: {
					include: {
						turnos: true,
						sede: true,
					},
				},
				nivelMalla: true,
			},
		});

		const {
			sesion: { sede, ...sesion },
			...rest
		} = nivel;

		return {
			...rest,
			sesion: {
				...sesion,
				sede: { ...sede, enUso: true },
				turnos: sesion.turnos.map(t => ({ ...t, enUso: true })),
				enUso: true,
			},
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
		) => Promise<INivelAcademico>,
	): Promise<INivelAcademico> {
		return this._client.$transaction(tx);
	}
}
