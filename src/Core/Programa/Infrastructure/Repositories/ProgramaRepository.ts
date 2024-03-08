import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreatePrograma } from "../../Domain/ICreatePrograma";
import type { IPrograma } from "../../Domain/IPrograma";
import type {
	GetAllProgramaParams,
	IProgramaRepository,
	UpdateProgramaParams,
} from "../../Domain/IProgramaRepository";

@injectable()
export class ProgramaRepository implements IProgramaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(params?: GetAllProgramaParams): Promise<IPrograma[]> {
		const { filters } = params || {};
		const { coordinacion_sedeId, coordinacionId, ...plainFilters } =
			filters || {};

		const programas = await this._client.programa.findMany({
			where: filters
				? {
						...plainFilters,
						coordinacion: {
							id: coordinacionId,
							sedeId: coordinacion_sedeId,
						},
					}
				: undefined,
			include: {
				detalleNivelTitulacion: {
					include: {
						nivelTitulacion: true,
					},
				},
				titulosObtenidos: {
					take: 1,
				},
				perfilesPracticaProgramas: {
					take: 1,
				},
				mallasCurriculares: {
					take: 1,
				},
				documentosRequeridos: {
					take: 1,
				},
			},
		});

		return programas.map(
			({
				detalleNivelTitulacion: { nivelTitulacion, ...detalleNivelTitulacion },
				titulosObtenidos,
				perfilesPracticaProgramas,
				mallasCurriculares,
				documentosRequeridos,
				...rest
			}) => ({
				...rest,
				enUso:
					titulosObtenidos.length > 0 ||
					perfilesPracticaProgramas.length > 0 ||
					mallasCurriculares.length > 0 ||
					documentosRequeridos.length > 0,
				detalleNivelTitulacion,
				nivelTitulacion,
			}),
		);
	}
	async getById(id: string): Promise<IPrograma | null> {
		const programa = await this._client.programa.findUnique({
			where: { id },
			include: {
				detalleNivelTitulacion: {
					include: {
						nivelTitulacion: true,
					},
				},
				titulosObtenidos: {
					take: 1,
				},
				perfilesPracticaProgramas: {
					take: 1,
				},
				mallasCurriculares: {
					take: 1,
				},
				documentosRequeridos: {
					take: 1,
				},
			},
		});

		if (!programa) return null;

		const {
			detalleNivelTitulacion: { nivelTitulacion, ...detalleNivelTitulacion },
			titulosObtenidos,
			perfilesPracticaProgramas,
			mallasCurriculares,
			documentosRequeridos,
			...rest
		} = programa;

		return {
			...rest,
			nivelTitulacion,
			detalleNivelTitulacion,
			enUso:
				titulosObtenidos.length > 0 ||
				perfilesPracticaProgramas.length > 0 ||
				mallasCurriculares.length > 0 ||
				documentosRequeridos.length > 0,
		};
	}
	async deleteById(id: string): Promise<IPrograma> {
		const programa = await this._client.programa.delete({
			where: { id },
			include: {
				detalleNivelTitulacion: {
					include: {
						nivelTitulacion: true,
					},
				},
			},
		});

		const {
			detalleNivelTitulacion: { nivelTitulacion, ...detalleNivelTitulacion },
			...rest
		} = programa;

		return {
			...rest,
			nivelTitulacion,
			detalleNivelTitulacion,
			enUso: false,
		};
	}

	async create({
		detalleNivelTitulacionId,
		coordinacionId,
		...data
	}: ICreatePrograma): Promise<IPrograma> {
		const programa = await this._client.programa.create({
			data: {
				...data,
				detalleNivelTitulacion: { connect: { id: detalleNivelTitulacionId } },
				coordinacion: { connect: { id: coordinacionId } },
			},
			include: {
				detalleNivelTitulacion: {
					include: {
						nivelTitulacion: true,
					},
				},
			},
		});

		const {
			detalleNivelTitulacion: { nivelTitulacion, ...detalleNivelTitulacion },
			...rest
		} = programa;

		return {
			...rest,
			nivelTitulacion,
			detalleNivelTitulacion,
			enUso: false,
		};
	}
	async update({
		id,
		data: { detalleNivelTitulacionId, ...data },
	}: UpdateProgramaParams): Promise<IPrograma> {
		const programa = await this._client.programa.update({
			where: { id },
			data: {
				...data,
				...(detalleNivelTitulacionId
					? {
							detalleNivelTitulacion: {
								connect: { id: detalleNivelTitulacionId },
							},
						}
					: {}),
			},
			include: {
				detalleNivelTitulacion: {
					include: {
						nivelTitulacion: true,
					},
				},
				titulosObtenidos: {
					take: 1,
				},
				perfilesPracticaProgramas: {
					take: 1,
				},
				mallasCurriculares: {
					take: 1,
				},
				documentosRequeridos: {
					take: 1,
				},
			},
		});

		const {
			detalleNivelTitulacion: { nivelTitulacion, ...detalleNivelTitulacion },
			titulosObtenidos,
			perfilesPracticaProgramas,
			mallasCurriculares,
			documentosRequeridos,
			...rest
		} = programa;

		return {
			...rest,
			nivelTitulacion,
			detalleNivelTitulacion,
			enUso:
				titulosObtenidos.length > 0 ||
				perfilesPracticaProgramas.length > 0 ||
				mallasCurriculares.length > 0 ||
				documentosRequeridos.length > 0,
		};
	}
}
