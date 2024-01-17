import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICursoEscuela } from "../../Domain/ICursoEscuela";
import type { ICursoEscuelaRepository } from "../../Domain/ICursoEscuelaRepository";
import type { ICreateCursoEscuela } from "../../Domain/ICreateCursoEscuela";

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
}
