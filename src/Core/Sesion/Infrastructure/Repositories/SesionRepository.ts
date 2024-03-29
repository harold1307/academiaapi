import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateSesion } from "../../Domain/ICreateSesion";
import type { ISesion } from "../../Domain/ISesion";
import type { ISesionRepository } from "../../Domain/ISesionRepository";

@injectable()
export class SesionRepository implements ISesionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ISesion[]> {
		const sesiones = await this._client.sesion.findMany({
			include: {
				cursoEscuelas: {
					take: 1,
				},
			},
		});

		return sesiones.map(({ cursoEscuelas, ...rest }) => ({
			...rest,
			enUso: cursoEscuelas.length > 0,
		}));
	}
	async getById(id: string): Promise<ISesion | null> {
		const sesion = await this._client.sesion.findUnique({
			where: { id },
			include: {
				cursoEscuelas: {
					take: 1,
				},
			},
		});

		if (!sesion) return null;

		const { cursoEscuelas, ...rest } = sesion;

		return {
			...rest,
			enUso: cursoEscuelas.length > 0,
		};
	}
	async deleteById(id: string): Promise<ISesion> {
		const sesion = await this._client.sesion.delete({ where: { id } });

		return {
			...sesion,
			enUso: false,
		};
	}

	async create({ sedeId, ...data }: ICreateSesion): Promise<ISesion> {
		const sesion = await this._client.sesion.create({
			data: { ...data, sede: { connect: { id: sedeId } } },
		});

		return {
			...sesion,
			enUso: false,
		};
	}
	// async update(params: IUpdateSesionParams): Promise<ISesion>; {

	// }
}
