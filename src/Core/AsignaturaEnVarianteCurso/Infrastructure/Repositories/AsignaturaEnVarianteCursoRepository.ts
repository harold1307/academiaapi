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

	async create({
		asignaturaId,
		varianteCursoId,
		modeloEvaluativoId,
		...data
	}: ICreateAsignaturaEnVarianteCurso): Promise<IAsignaturaEnVarianteCurso> {
		const asignaturaEnVariante =
			await this._client.asignaturaEnVarianteCurso.create({
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
					...(modeloEvaluativoId
						? { modeloEvaluativo: { connect: { id: modeloEvaluativoId } } }
						: {}),
				},
				include: {
					asignatura: true,
				},
			});

		const { asignatura, ...rest } = asignaturaEnVariante;

		return {
			...rest,
			asignatura: {
				...asignatura,
				enUso: true,
			},
		};
	}
}
