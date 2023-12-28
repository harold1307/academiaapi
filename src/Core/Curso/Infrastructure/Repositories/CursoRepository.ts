import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateCurso } from "../../Domain/ICreateCurso";
import type { ICurso } from "../../Domain/ICurso";
import type { ICursoRepository } from "../../Domain/ICursoRepository";
import type { IUpdateCurso } from "../../Domain/IUpdateCurso";

@injectable()
export class CursoRepository implements ICursoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}
	getAll(): Promise<ICurso[]> {
		return this._client.curso.findMany();
	}

	getById(id: string): Promise<ICurso | null> {
		return this._client.curso.findUnique({ where: { id } });
	}

	deleteById(id: string): Promise<ICurso> {
		return this._client.curso.delete({ where: { id } });
	}

	create(data: ICreateCurso): Promise<ICurso> {
		return this._client.curso.create({ data });
	}

	update(params: { id: string; curso: IUpdateCurso }): Promise<ICurso> {
		return this._client.curso.update({
			where: { id: params.id },
			data: params.curso,
		});
	}
}
