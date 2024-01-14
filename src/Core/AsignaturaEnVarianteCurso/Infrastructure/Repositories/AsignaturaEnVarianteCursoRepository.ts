import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IAsignaturaEnVarianteCurso } from "../../Domain/IAsignaturaEnVarianteCurso";
import type { IAsignaturaEnVarianteCursoRepository } from "../../Domain/IAsignaturaEnVarianteCursoRepository";
import type { ICreateAsignaturaEnVarianteCurso } from "../../Domain/ICreateAsignaturaEnVarianteCurso";

@injectable()
export class AsignaturaEnVarianteCursoRepository
	implements IAsignaturaEnVarianteCursoRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	create({
		asignaturaId,
		varianteCursoId,
		...data
	}: ICreateAsignaturaEnVarianteCurso): Promise<IAsignaturaEnVarianteCurso> {
		return this._client.asignaturaEnVarianteCurso.create({
			data: {
				...data,
				asignatura: {
					connect: {
						id: asignaturaId,
					},
				},
				varianteCurso: {
					connect: {
						id: varianteCursoId,
					},
				},
			},
		});
	}
}
