import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateTurno } from "../../Domain/ICreateTurno";
import type { ITurno } from "../../Domain/ITurno";
import type {
	ITurnoRepository,
	UpdateTurnoParams,
} from "../../Domain/ITurnoRepository";

@injectable()
export class TurnoRepository implements ITurnoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ITurno[]> {
		const turnos = await this._client.turno.findMany({
			include: {
				sesion: {
					include: {
						sede: true,
					},
				},
				materiasEnHorario: {
					take: 1,
				},
			},
		});

		return turnos.map(
			({ sesion: { sede, ...sesion }, materiasEnHorario, ...rest }) => ({
				...rest,
				sesion: { ...sesion, sede: { ...sede, enUso: true }, enUso: true },
				enUso: materiasEnHorario.length > 0,
			}),
		);
	}
	async getById(id: string): Promise<ITurno | null> {
		const turno = await this._client.turno.findUnique({
			where: { id },
			include: {
				sesion: {
					include: {
						sede: true,
					},
				},
				materiasEnHorario: {
					take: 1,
				},
			},
		});

		if (!turno) return null;

		const {
			sesion: { sede, ...sesion },
			materiasEnHorario,
			...rest
		} = turno;

		return {
			...rest,
			sesion: { ...sesion, sede: { ...sede, enUso: true }, enUso: true },
			enUso: materiasEnHorario.length > 0,
		};
	}
	async deleteById(id: string): Promise<ITurno> {
		const turno = await this._client.turno.delete({
			where: { id },
			include: {
				sesion: {
					include: {
						sede: true,
					},
				},
			},
		});

		const {
			sesion: { sede, ...sesion },
			...rest
		} = turno;

		return {
			...rest,
			sesion: { ...sesion, sede: { ...sede, enUso: true }, enUso: true },
			enUso: false,
		};
	}

	async create({ sesionId, ...data }: ICreateTurno): Promise<ITurno> {
		const turno = await this._client.turno.create({
			data: {
				...data,
				sesion: {
					connect: {
						id: sesionId,
					},
				},
			},
			include: {
				sesion: {
					include: {
						sede: true,
					},
				},
			},
		});

		const {
			sesion: { sede, ...sesion },
			...rest
		} = turno;

		return {
			...rest,
			sesion: { ...sesion, sede: { ...sede, enUso: true }, enUso: true },
			enUso: false,
		};
	}

	async update({ id, data }: UpdateTurnoParams): Promise<ITurno> {
		const turno = await this._client.turno.update({
			where: { id },
			data,
			include: {
				sesion: {
					include: {
						sede: true,
					},
				},
				materiasEnHorario: {
					take: 1,
				},
			},
		});

		const {
			sesion: { sede, ...sesion },
			materiasEnHorario,
			...rest
		} = turno;

		return {
			...rest,
			sesion: { ...sesion, sede: { ...sede, enUso: true }, enUso: true },
			enUso: materiasEnHorario.length > 0,
		};
	}
}
