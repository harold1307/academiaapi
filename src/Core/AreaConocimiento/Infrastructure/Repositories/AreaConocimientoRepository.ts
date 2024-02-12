import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAreaConocimiento } from "../../Domain/IAreaConocimiento";
import type {
	IAreaConocimientoRepository,
	UpdateAreaConocimientoParams,
} from "../../Domain/IAreaConocimientoRepository";
import type { ICreateAreaConocimiento } from "../../Domain/ICreateAreaConocimiento";

@injectable()
export class AreaConocimientoRepository implements IAreaConocimientoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateAreaConocimiento): Promise<IAreaConocimiento> {
		const area = await this._client.areaConocimiento.create({ data });

		return {
			...area,
			enUso: false,
		};
	}

	async getAll(): Promise<IAreaConocimiento[]> {
		const areas = await this._client.areaConocimiento.findMany({
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		return areas.map(
			({ asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest }) => ({
				...rest,
				enUso:
					asignaturasEnNivelMalla.length > 0 ||
					asignaturasModuloEnMalla.length > 0,
			}),
		);
	}

	async getById(id: string): Promise<IAreaConocimiento | null> {
		const area = await this._client.areaConocimiento.findUnique({
			where: { id },
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		if (!area) return null;

		const { asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest } = area;

		return {
			...rest,
			enUso:
				asignaturasEnNivelMalla.length > 0 ||
				asignaturasModuloEnMalla.length > 0,
		};
	}

	async deleteById(id: string): Promise<IAreaConocimiento> {
		const area = await this._client.areaConocimiento.delete({
			where: { id },
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest } = area;
		return {
			...rest,
			enUso:
				asignaturasEnNivelMalla.length > 0 ||
				asignaturasModuloEnMalla.length > 0,
		};
	}

	async update({
		id,
		data,
	}: UpdateAreaConocimientoParams): Promise<IAreaConocimiento> {
		const eje = await this._client.areaConocimiento.update({
			where: { id: id },
			data,
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest } = eje;

		return {
			...rest,
			enUso:
				asignaturasEnNivelMalla.length > 0 ||
				asignaturasModuloEnMalla.length > 0,
		};
	}
}
