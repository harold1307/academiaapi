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

	getAll(): Promise<INivelMalla[]> {
		return this._client.nivelMalla.findMany();
	}
	getById(id: string): Promise<INivelMalla | null> {
		return this._client.nivelMalla.findUnique({ where: { id } });
	}
	deleteById(id: string): Promise<INivelMalla> {
		return this._client.nivelMalla.delete({ where: { id } });
	}

	update({
		id,
		data: { tituloObtenidoId },
	}: UpdateNivelMallaParams): Promise<INivelMalla> {
		return this._client.nivelMalla.update({
			where: { id },
			data: {
				tituloObtenido: tituloObtenidoId
					? { connect: { id: tituloObtenidoId } }
					: { disconnect: true },
			},
		});
	}
}
