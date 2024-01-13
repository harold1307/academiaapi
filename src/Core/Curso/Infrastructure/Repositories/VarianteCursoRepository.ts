import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IVarianteCurso } from "../../Domain/IVarianteCurso";
import type { IVarianteCursoRepository } from "../../Domain/IVarianteCursoRepository";
import type { IVarianteCursoWithAsignaturas } from "../../Domain/IVarianteCursoWithAsignaturas";

@injectable()
export class VarianteCursoRepository implements IVarianteCursoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getById(id: string): Promise<IVarianteCurso | null> {
		return this._client.varianteCurso.findUnique({
			where: {
				id,
			},
		});
	}

	withAsignaturasGetById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null> {
		return this._client.varianteCurso.findUnique({
			where: { id },
			include: {
				asignaturas: true,
			},
		});
	}
}
