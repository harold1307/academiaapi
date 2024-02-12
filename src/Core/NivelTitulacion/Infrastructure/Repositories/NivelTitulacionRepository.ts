import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateNivelTitulacion } from "../../Domain/ICreateNivelTitulacion";
import type { INivelTitulacion } from "../../Domain/INivelTitulacion";
import type {
	INivelTitulacionRepository,
	UpdateNivelTitulacionParams,
} from "../../Domain/INivelTitulacionRepository";

@injectable()
export class NivelTitulacionRepository implements INivelTitulacionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<INivelTitulacion[]> {
		const niveles = await this._client.nivelTitulacion.findMany({
			include: {
				detalles: {
					take: 1,
				},
			},
		});

		return niveles.map(({ detalles, ...rest }) => ({
			...rest,
			enUso: detalles.length > 0,
		}));
	}
	async getById(id: string): Promise<INivelTitulacion | null> {
		const nivel = await this._client.nivelTitulacion.findUnique({
			where: { id },
			include: {
				detalles: {
					take: 1,
				},
			},
		});

		if (!nivel) return null;

		const { detalles, ...rest } = nivel;

		return { ...rest, enUso: detalles.length > 0 };
	}
	async deleteById(id: string): Promise<INivelTitulacion> {
		const nivel = await this._client.nivelTitulacion.delete({
			where: { id },
		});

		return { ...nivel, enUso: false };
	}

	async update({
		id,
		data,
	}: UpdateNivelTitulacionParams): Promise<INivelTitulacion> {
		const nivel = await this._client.nivelTitulacion.update({
			where: { id },
			data,
			include: {
				detalles: {
					take: 1,
				},
			},
		});

		const { detalles, ...rest } = nivel;

		return {
			...rest,
			enUso: detalles.length > 0,
		};
	}

	async create(data: ICreateNivelTitulacion): Promise<INivelTitulacion> {
		const nivel = await this._client.nivelTitulacion.create({ data });

		return { ...nivel, enUso: false };
	}
}
