import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateSede } from "../../Domain/ICreateSede";
import type { ISede } from "../../Domain/ISede";
import type {
	ISedeRepository,
	UpdateSedeParams,
} from "../../Domain/ISedeRepository";

@injectable()
export class SedeRepository implements ISedeRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async create(data: ICreateSede) {
		const sede = await this._client.sede.create({
			data,
		});

		return {
			...sede,
			enUso: false,
		};
	}
	async getAll(): Promise<ISede[]> {
		const sedes = await this._client.sede.findMany({
			include: {
				coordinaciones: {
					take: 1,
				},
				lugaresEjecucion: {
					take: 1,
				},
				sesiones: {
					take: 1,
				},
				titulos: {
					take: 1,
				},
				ubicaciones: {
					take: 1,
				},
			},
		});

		return sedes.map(
			({
				coordinaciones,
				lugaresEjecucion,
				sesiones,
				titulos,
				ubicaciones,
				...rest
			}) => ({
				...rest,
				enUso:
					coordinaciones.length > 0 ||
					lugaresEjecucion.length > 0 ||
					sesiones.length > 0 ||
					titulos.length > 0 ||
					ubicaciones.length > 0,
			}),
		);
	}

	async getById(id: string): Promise<ISede | null> {
		const sede = await this._client.sede.findUnique({
			where: { id },
			include: {
				coordinaciones: {
					take: 1,
				},
				lugaresEjecucion: {
					take: 1,
				},
				sesiones: {
					take: 1,
				},
				titulos: {
					take: 1,
				},
				ubicaciones: {
					take: 1,
				},
			},
		});

		if (!sede) return null;

		const {
			coordinaciones,
			lugaresEjecucion,
			sesiones,
			titulos,
			ubicaciones,
			...rest
		} = sede;

		return {
			...rest,
			enUso:
				coordinaciones.length > 0 ||
				lugaresEjecucion.length > 0 ||
				sesiones.length > 0 ||
				titulos.length > 0 ||
				ubicaciones.length > 0,
		};
	}

	async update({ id, data }: UpdateSedeParams) {
		const sede = await this._client.sede.update({
			where: {
				id,
			},
			data,
			include: {
				coordinaciones: {
					take: 1,
				},
				lugaresEjecucion: {
					take: 1,
				},
				sesiones: {
					take: 1,
				},
				titulos: {
					take: 1,
				},
				ubicaciones: {
					take: 1,
				},
			},
		});

		const {
			coordinaciones,
			lugaresEjecucion,
			sesiones,
			titulos,
			ubicaciones,
			...rest
		} = sede;

		return {
			...rest,
			enUso:
				coordinaciones.length > 0 ||
				lugaresEjecucion.length > 0 ||
				sesiones.length > 0 ||
				titulos.length > 0 ||
				ubicaciones.length > 0,
		};
	}

	async deleteById(id: string): Promise<ISede> {
		const sede = await this._client.sede.delete({
			where: { id },
		});

		return {
			...sede,
			enUso: false,
		};
	}
}