import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateUbicacion } from "../../Domain/ICreateUbicacion";
import type { IUbicacion } from "../../Domain/IUbicacion";
import type { IUbicacionQueryFilter } from "../../Domain/IUbicacionQueryFilter";
import type {
	IUbicacionRepository,
	UpdateUbicacionParams,
} from "../../Domain/IUbicacionRepository";

@injectable()
export class UbicacionRepository implements IUbicacionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(filters?: IUbicacionQueryFilter): Promise<IUbicacion[]> {
		const ubicaciones = await this._client.ubicacion.findMany({
			where: filters,
			include: {
				materiasEnHorario: {
					take: 1,
				},
			},
		});

		return ubicaciones.map(({ materiasEnHorario, ...rest }) => ({
			...rest,
			enUso: materiasEnHorario.length > 0,
		}));
	}
	async getById(id: string): Promise<IUbicacion | null> {
		const ubicacion = await this._client.ubicacion.findUnique({
			where: { id },
			include: {
				materiasEnHorario: {
					take: 1,
				},
			},
		});

		if (!ubicacion) return null;

		const { materiasEnHorario, ...rest } = ubicacion;

		return {
			...rest,
			enUso: materiasEnHorario.length > 0,
		};
	}
	async deleteById(id: string): Promise<IUbicacion> {
		const ubicacion = await this._client.ubicacion.delete({
			where: { id },
		});

		return {
			...ubicacion,
			enUso: false,
		};
	}

	async create(data: ICreateUbicacion): Promise<IUbicacion> {
		const ubicacion = await this._client.ubicacion.create({
			data,
		});

		return {
			...ubicacion,
			enUso: false,
		};
	}
	async update({ id, data }: UpdateUbicacionParams): Promise<IUbicacion> {
		const ubicacion = await this._client.ubicacion.update({
			where: { id },
			data,
			include: {
				materiasEnHorario: {
					take: 1,
				},
			},
		});
		const { materiasEnHorario, ...rest } = ubicacion;

		return {
			...rest,
			enUso: materiasEnHorario.length > 0,
		};
	}
}
