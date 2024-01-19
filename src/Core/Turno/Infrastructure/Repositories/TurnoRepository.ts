import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateTurno } from "../../Domain/ICreateTurno";
import type { ITurno } from "../../Domain/ITurno";
import type { ITurnoRepository } from "../../Domain/ITurnoRepository";

@injectable()
export class TurnoRepository implements ITurnoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ITurno[]> {
		const turnos = await this._client.turno.findMany({
			include: {
				sesion: true,
			},
		});

		return turnos.map(({ sesion, ...rest }) => ({
			...rest,
			enUso: !!sesion,
		}));
	}
	async getById(id: string): Promise<ITurno | null> {
		const turno = await this._client.turno.findUnique({
			where: { id },
			include: {
				sesion: true,
			},
		});

		if (!turno) return null;

		const { sesion, ...rest } = turno;

		return { ...rest, enUso: !!sesion };
	}
	async deleteById(id: string): Promise<ITurno> {
		const turno = await this._client.turno.delete({
			where: { id },
		});

		return {
			...turno,
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
		});

		return { ...turno, enUso: true };
	}
	// update(params: IUpdateTurnoParams): Promise<ITurno>; {

	// }
}
