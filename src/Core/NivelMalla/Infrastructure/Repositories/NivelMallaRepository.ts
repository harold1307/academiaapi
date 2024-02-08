import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { INivelMalla } from "../../Domain/INivelMalla";
import type {
	INivelMallaRepository,
	UpdateNivelMallaParams,
} from "../../Domain/INivelMallaRepository";

@injectable()
export class NivelMallaRepository implements INivelMallaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<INivelMalla[]> {
		const niveles = await this._client.nivelMalla.findMany({
			include: {
				nivelesAcademicos: {
					take: 1,
				},
			},
		});

		return niveles.map(({ nivelesAcademicos, ...rest }) => ({
			...rest,
			enUso: nivelesAcademicos.length > 0,
		}));
	}
	async getById(id: string): Promise<INivelMalla | null> {
		const nivel = await this._client.nivelMalla.findUnique({
			where: { id },
			include: {
				nivelesAcademicos: {
					take: 1,
				},
			},
		});

		if (!nivel) return null;

		const { nivelesAcademicos, ...rest } = nivel;

		return {
			...rest,
			enUso: nivelesAcademicos.length > 0,
		};
	}

	async update({
		id,
		data: { tituloObtenidoId },
	}: UpdateNivelMallaParams): Promise<INivelMalla> {
		const nivel = await this._client.nivelMalla.update({
			where: { id },
			include: {
				nivelesAcademicos: {
					take: 1,
				},
			},
			data: {
				tituloObtenido: tituloObtenidoId
					? { connect: { id: tituloObtenidoId } }
					: { disconnect: true },
			},
		});
		const { nivelesAcademicos, ...rest } = nivel;

		return {
			...rest,
			enUso: nivelesAcademicos.length > 0,
		};
	}
}
