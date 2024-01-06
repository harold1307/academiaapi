import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateCurso } from "../../Domain/ICreateCurso";
import { type ICreateVarianteCurso } from "../../Domain/ICreateVarianteCurso";
import type { ICurso } from "../../Domain/ICurso";
import type { ICursoRepository } from "../../Domain/ICursoRepository";
import type { ICursoWithVariantes } from "../../Domain/ICursoWithVariantes";
import type { IUpdateCurso } from "../../Domain/IUpdateCurso";

@injectable()
export class CursoRepository implements ICursoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}
	getAll(): Promise<ICurso[]> {
		return this._client.curso.findMany();
	}

	getById(id: string) {
		return this._client.curso.findUnique({
			where: { id },
			include: { variantes: true },
		});
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

	createVarianteCurso(cursoId: string, data: ICreateVarianteCurso) {
		return this._client.varianteCurso.create({
			data: { ...data, cursoId },
			include: {
				curso: true,
			},
		});
	}

	getAllVarianteCursoFromCursoId(
		cursoId: string,
	): Promise<ICursoWithVariantes | null> {
		return this._client.curso.findUnique({
			where: { id: cursoId },
			include: {
				variantes: true,
			},
		});
	}
}
