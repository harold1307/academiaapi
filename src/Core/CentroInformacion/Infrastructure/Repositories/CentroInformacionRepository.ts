import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICentroInformacion } from "../../Domain/ICentroInformacion";
import type {
	ICentroInformacionRepository,
	UpdateCentroInformacionParams,
} from "../../Domain/ICentroInformacionRepository";
import type { ICreateCentroInformacion } from "../../Domain/ICreateCentroInformacion";

@injectable()
export class CentroInformacionRepository
	implements ICentroInformacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICentroInformacion[]> {
		const centros = await this._client.centroInformacion.findMany({
			include: {
				alumnos: {
					take: 1,
				},
				asesoresCrm: {
					take: 1,
				},
			},
		});

		return centros.map(({ alumnos, asesoresCrm, ...c }) => ({
			...c,
			enUso: alumnos.length > 0 || asesoresCrm.length > 0,
		}));
	}
	async getById(id: string): Promise<ICentroInformacion | null> {
		const centro = await this._client.centroInformacion.findUnique({
			where: { id },
			include: {
				alumnos: {
					take: 1,
				},
				asesoresCrm: {
					take: 1,
				},
			},
		});

		if (!centro) return null;

		const { alumnos, asesoresCrm, ...c } = centro;

		return {
			...c,
			enUso: alumnos.length > 0 || asesoresCrm.length > 0,
		};
	}
	async deleteById(id: string): Promise<ICentroInformacion> {
		const centro = await this._client.centroInformacion.delete({
			where: { id },
		});

		return {
			...centro,
			enUso: false,
		};
	}

	async create(data: ICreateCentroInformacion): Promise<ICentroInformacion> {
		const centro = await this._client.centroInformacion.create({
			data,
		});

		return {
			...centro,
			enUso: false,
		};
	}
	async update({
		id,
		data,
	}: UpdateCentroInformacionParams): Promise<ICentroInformacion> {
		const centro = await this._client.centroInformacion.update({
			where: { id },
			data,
			include: {
				alumnos: {
					take: 1,
				},
				asesoresCrm: {
					take: 1,
				},
			},
		});

		const { alumnos, asesoresCrm, ...c } = centro;

		return {
			...c,
			enUso: alumnos.length > 0 || asesoresCrm.length > 0,
		};
	}
}
