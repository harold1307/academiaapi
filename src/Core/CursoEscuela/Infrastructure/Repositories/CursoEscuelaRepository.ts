import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateCursoEscuela } from "../../Domain/ICreateCursoEscuela";
import type { ICursoEscuela } from "../../Domain/ICursoEscuela";
import type { ICursoEscuelaRepository } from "../../Domain/ICursoEscuelaRepository";

@injectable()
export class CursoEscuelaRepository implements ICursoEscuelaRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(): Promise<ICursoEscuela[]> {
		return this._client.cursoEscuela.findMany();
	}

	getById(id: string): Promise<ICursoEscuela | null> {
		return this._client.cursoEscuela.findUnique({ where: { id } });
	}

	deleteById(id: string): Promise<ICursoEscuela> {
		return this._client.cursoEscuela.delete({ where: { id } });
	}

	create({
		paraleloId,
		plantillaId,
		sesionId,
		...rest
	}: ICreateCursoEscuela): Promise<ICursoEscuela> {
		return this._client.cursoEscuela.create({
			data: {
				...rest,
				paralelo: {
					connect: {
						nombre: paraleloId,
					},
				},
				sesion: {
					connect: {
						id: sesionId,
					},
				},
				...(plantillaId
					? {
							plantilla: {
								connect: {
									id: plantillaId,
								},
							},
						}
					: {}),
			},
		});
	}

	transaction(
		tx: (
			prisma: Omit<
				PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
				| "$transaction"
				| "$connect"
				| "$disconnect"
				| "$on"
				| "$use"
				| "$extends"
			>,
		) => Promise<ICursoEscuela>,
	): Promise<ICursoEscuela> {
		return this._client.$transaction(tx);
	}
}
