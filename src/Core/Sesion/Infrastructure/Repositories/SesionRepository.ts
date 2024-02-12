import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateSesion } from "../../Domain/ICreateSesion";
import type { ISesion } from "../../Domain/ISesion";
import type {
	ISesionRepository,
	UpdateSesionParams,
} from "../../Domain/ISesionRepository";
import type { ISesionQueryFilter } from "../../Domain/ISesionQueryFilter";

@injectable()
export class SesionRepository implements ISesionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(filters?: ISesionQueryFilter): Promise<ISesion[]> {
		const sesiones = await this._client.sesion.findMany({
			where: filters,
			include: {
				cursoEscuelas: {
					take: 1,
				},
				turnos: true,
				nivelesAcademicos: {
					take: 1,
				},
				sede: true,
			},
		});

		return sesiones.map(
			({ cursoEscuelas, turnos, nivelesAcademicos, sede, ...rest }) => ({
				...rest,
				turnos: turnos.map(t => ({ ...t, enUso: true })),
				sede: { ...sede, enUso: true },
				enUso:
					cursoEscuelas.length > 0 ||
					turnos.length > 0 ||
					nivelesAcademicos.length > 0,
			}),
		);
	}
	async getById(id: string): Promise<ISesion | null> {
		const sesion = await this._client.sesion.findUnique({
			where: { id },
			include: {
				cursoEscuelas: {
					take: 1,
				},
				turnos: true,
				nivelesAcademicos: {
					take: 1,
				},
				sede: true,
			},
		});

		if (!sesion) return null;

		const { cursoEscuelas, turnos, nivelesAcademicos, sede, ...rest } = sesion;

		return {
			...rest,
			turnos: turnos.map(t => ({ ...t, enUso: true })),
			sede: { ...sede, enUso: true },
			enUso:
				cursoEscuelas.length > 0 ||
				turnos.length > 0 ||
				nivelesAcademicos.length > 0,
		};
	}
	async deleteById(id: string): Promise<ISesion> {
		const sesion = await this._client.sesion.delete({
			where: { id },
			include: { sede: true },
		});

		return {
			...sesion,
			turnos: [],
			sede: {
				...sesion.sede,
				enUso: true,
			},
			enUso: false,
		};
	}

	async create({ sedeId, ...data }: ICreateSesion): Promise<ISesion> {
		const sesion = await this._client.sesion.create({
			data: {
				...data,
				sede: { connect: { id: sedeId } },
			},
			include: { sede: true },
		});

		return {
			...sesion,
			turnos: [],
			sede: {
				...sesion.sede,
				enUso: true,
			},
			enUso: false,
		};
	}
	async update({
		id,
		data: { sedeId, ...data },
	}: UpdateSesionParams): Promise<ISesion> {
		const sesion = await this._client.sesion.update({
			where: { id },
			data: {
				...data,
				...(sedeId ? { sede: { connect: { id: sedeId } } } : {}),
			},
			include: {
				cursoEscuelas: {
					take: 1,
				},
				turnos: true,
				nivelesAcademicos: {
					take: 1,
				},
				sede: true,
			},
		});

		const { cursoEscuelas, turnos, nivelesAcademicos, sede, ...rest } = sesion;

		return {
			...rest,
			turnos: turnos.map(t => ({ ...t, enUso: true })),
			sede: { ...sede, enUso: true },
			enUso:
				cursoEscuelas.length > 0 ||
				turnos.length > 0 ||
				nivelesAcademicos.length > 0,
		};
	}
}
