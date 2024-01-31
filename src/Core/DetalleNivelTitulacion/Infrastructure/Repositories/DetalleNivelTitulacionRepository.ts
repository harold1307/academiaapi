import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateDetalleNivelTitulacion } from "../../Domain/ICreateDetalleNivelTitulacion";
import type { IDetalleNivelTitulacion } from "../../Domain/IDetalleNivelTitulacion";
import type {
	IDetalleNivelTitulacionRepository,
	UpdateDetalleNivelTitulacionParams,
} from "../../Domain/IDetalleNivelTitulacionRepository";

@injectable()
export class DetalleNivelTitulacionRepository
	implements IDetalleNivelTitulacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IDetalleNivelTitulacion[]> {
		const detalles = await this._client.detalleNivelTitulacion.findMany({
			include: {
				programas: {
					take: 1,
				},
			},
		});

		return detalles.map(({ programas, ...rest }) => ({
			...rest,
			enUso: programas.length > 0,
		}));
	}
	async getById(id: string): Promise<IDetalleNivelTitulacion | null> {
		const detalle = await this._client.detalleNivelTitulacion.findUnique({
			where: { id },
			include: {
				programas: {
					take: 1,
				},
			},
		});

		if (!detalle) return null;

		const { programas, ...rest } = detalle;

		return {
			...rest,
			enUso: programas.length > 0,
		};
	}
	async deleteById(id: string): Promise<IDetalleNivelTitulacion> {
		const detalle = await this._client.detalleNivelTitulacion.delete({
			where: { id },
		});

		return {
			...detalle,
			enUso: false,
		};
	}

	async create({
		nivelTitulacionId,
		nombre,
	}: ICreateDetalleNivelTitulacion): Promise<IDetalleNivelTitulacion> {
		const detalle = await this._client.detalleNivelTitulacion.create({
			data: {
				nombre,
				nivelTitulacion: {
					connect: {
						id: nivelTitulacionId,
					},
				},
			},
		});

		return {
			...detalle,
			enUso: false,
		};
	}
	async update({
		id,
		data,
	}: UpdateDetalleNivelTitulacionParams): Promise<IDetalleNivelTitulacion> {
		const detalle = await this._client.detalleNivelTitulacion.update({
			where: { id },
			data,
		});

		return {
			...detalle,
			enUso: false,
		};
	}
}
