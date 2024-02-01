import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreatePrograma } from "../../Domain/ICreatePrograma";
import type { IPrograma } from "../../Domain/IPrograma";
import type {
	IProgramaRepository,
	UpdateProgramaParams,
} from "../../Domain/IProgramaRepository";

@injectable()
export class ProgramaRepository implements IProgramaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IPrograma[]> {
		const programas = await this._client.programa.findMany({
			include: {
				detalleNivelTitulacion: {
					include: {
						nivelTitulacion: true,
					},
				},
			},
		});

		return programas.map(
			({
				detalleNivelTitulacion: { nivelTitulacion, ...detalleNivelTitulacion },
				...rest
			}) => ({
				...rest,
				enUso: false,
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
			},
		});

		if (!programa) return null;

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
		...data
	}: ICreatePrograma): Promise<IPrograma> {
		const programa = await this._client.programa.create({
			data: {
				...data,
				detalleNivelTitulacion: { connect: { id: detalleNivelTitulacionId } },
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
}
