import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICoordinacion } from "../../Domain/ICoordinacion";
import type {
	ICoordinacionRepository,
	UpdateCoordinacionParams,
} from "../../Domain/ICoordinacionRepository";
import type { ICreateCoordinacion } from "../../Domain/ICreateCoordinacion";

@injectable()
export class CoordinacionRepository implements ICoordinacionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICoordinacion[]> {
		const coordinaciones = await this._client.coordinacion.findMany({
			include: {
				programas: {
					include: {
						detalleNivelTitulacion: {
							include: {
								nivelTitulacion: true,
							},
						},
					},
				},
			},
		});

		return coordinaciones.map(({ programas, ...rest }) => ({
			...rest,
			programas: programas.map(
				({
					detalleNivelTitulacion: {
						nivelTitulacion,
						...detalleNivelTitulacion
					},
					...p
				}) => ({
					...p,
					detalleNivelTitulacion,
					nivelTitulacion,
					enUso: true,
				}),
			),
			enUso: programas.length > 0,
		}));
	}
	async getById(id: string): Promise<ICoordinacion | null> {
		const coordinacion = await this._client.coordinacion.findUnique({
			where: { id },
			include: {
				programas: {
					include: {
						detalleNivelTitulacion: {
							include: {
								nivelTitulacion: true,
							},
						},
					},
				},
			},
		});

		if (!coordinacion) return null;

		const { programas, ...rest } = coordinacion;

		return {
			...rest,
			programas: programas.map(
				({
					detalleNivelTitulacion: {
						nivelTitulacion,
						...detalleNivelTitulacion
					},
					...p
				}) => ({
					...p,
					detalleNivelTitulacion,
					nivelTitulacion,
					enUso: true,
				}),
			),
			enUso: programas.length > 0,
		};
	}
	async deleteById(id: string): Promise<ICoordinacion> {
		const coordinacion = await this._client.coordinacion.delete({
			where: { id },
		});

		return {
			...coordinacion,
			programas: [],
			enUso: false,
		};
	}

	async create({
		sedeId,
		...data
	}: ICreateCoordinacion): Promise<ICoordinacion> {
		const coordinacion = await this._client.coordinacion.create({
			data: {
				...data,
				sede: {
					connect: { id: sedeId },
				},
			},
		});

		return {
			...coordinacion,
			programas: [],
			enUso: false,
		};
	}
	async update({ id, data }: UpdateCoordinacionParams): Promise<ICoordinacion> {
		const coordinacion = await this._client.coordinacion.update({
			where: { id },
			data,
			include: {
				programas: {
					include: {
						detalleNivelTitulacion: {
							include: {
								nivelTitulacion: true,
							},
						},
					},
				},
			},
		});

		const { programas, ...rest } = coordinacion;

		return {
			...rest,
			programas: programas.map(
				({
					detalleNivelTitulacion: {
						nivelTitulacion,
						...detalleNivelTitulacion
					},
					...p
				}) => ({
					...p,
					detalleNivelTitulacion,
					nivelTitulacion,
					enUso: true,
				}),
			),
			enUso: programas.length > 0,
		};
	}
}
