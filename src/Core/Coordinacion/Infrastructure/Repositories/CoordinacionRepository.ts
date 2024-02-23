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
				_count: {
					select: {
						profesores: true,
					},
				},
			},
		});

		return coordinaciones.map(({ programas, _count, ...rest }) => ({
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
			enUso: programas.length > 0 || _count.profesores > 0,
			profesores: _count.profesores,
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
				_count: {
					select: {
						profesores: true,
					},
				},
			},
		});

		if (!coordinacion) return null;

		const { programas, _count, ...rest } = coordinacion;

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
			enUso: programas.length > 0 || _count.profesores > 0,
			profesores: _count.profesores,
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
			profesores: 0,
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
			profesores: 0,
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
				_count: {
					select: {
						profesores: true,
					},
				},
			},
		});

		const { programas, _count, ...rest } = coordinacion;

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
			enUso: programas.length > 0 || _count.profesores > 0,
			profesores: _count.profesores,
		};
	}
}
