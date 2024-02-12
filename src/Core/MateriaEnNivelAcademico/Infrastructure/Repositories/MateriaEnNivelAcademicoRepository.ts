import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IMateriaEnNivelAcademico } from "../../Domain/IMateriaEnNivelAcademico";
import type {
	IMateriaEnNivelAcademicoRepository,
	UpdateMateriaEnNivelAcademicoParams,
} from "../../Domain/IMateriaEnNivelAcademicoRepository";
// import type { ICreateMateriaEnNivelAcademico } from "../../Domain/ICreateMateriaEnNivelAcademico";

@injectable()
export class MateriaEnNivelAcademicoRepository
	implements IMateriaEnNivelAcademicoRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IMateriaEnNivelAcademico[]> {
		const materias = await this._client.materiaEnNivelAcademico.findMany({
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
		});

		return materias.map(
			({
				asignaturaEnNivelMalla,
				asignaturaModulo,
				modeloEvaluativo,
				...rest
			}) => ({
				...rest,
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
		);
	}
	async getById(id: string): Promise<IMateriaEnNivelAcademico | null> {
		const materia = await this._client.materiaEnNivelAcademico.findUnique({
			where: {
				id,
			},
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
		});

		if (!materia) return null;

		const {
			asignaturaEnNivelMalla,
			asignaturaModulo,
			modeloEvaluativo,
			...rest
		} = materia;

		return {
			...rest,
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
		};
	}
	async deleteById(id: string): Promise<IMateriaEnNivelAcademico> {
		const materia = await this._client.materiaEnNivelAcademico.delete({
			where: {
				id,
			},
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
		});

		const {
			asignaturaEnNivelMalla,
			asignaturaModulo,
			modeloEvaluativo,
			...rest
		} = materia;

		return {
			...rest,
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
		};
	}

	// create({
	// 	modeloEvaluativoId,
	// 	...data
	// }: ICreateMateriaEnNivelAcademico): Promise<IMateriaEnNivelAcademico> {
	// 	const materia = await this._client.materiaEnNivelAcademico.create({
	// 		data: {
	// 			...data,
	// 			modeloEvaluativo: {
	// 				connect: {
	// 					id: modeloEvaluativoId,
	// 				},
	// 			},

	// 		},
	// 	});
	// }

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
		) => Promise<number>,
	): Promise<number> {
		return this._client.$transaction(tx);
	}

	async update({
		id,
		data,
	}: UpdateMateriaEnNivelAcademicoParams): Promise<IMateriaEnNivelAcademico> {
		const materia = await this._client.materiaEnNivelAcademico.update({
			where: { id },
			data,
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
		});

		const {
			asignaturaEnNivelMalla,
			asignaturaModulo,
			modeloEvaluativo,
			...rest
		} = materia;

		return {
			...rest,
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
		};
	}
}
