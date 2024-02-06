import * as crypto from "crypto";
import { injectable } from "inversify";

import type { IAsignaturaEnVarianteCurso } from "../../../Core/AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCurso";
import type { IAsignaturaEnVarianteCursoRepository } from "../../../Core/AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoRepository";
import type { ICreateAsignaturaEnVarianteCurso } from "../../../Core/AsignaturaEnVarianteCurso/Domain/ICreateAsignaturaEnVarianteCurso";

@injectable()
export class MockAsignaturaEnVarianteCursoRepository
	implements IAsignaturaEnVarianteCursoRepository
{
	async create({
		asignaturaId,
		varianteCursoId,
		modeloEvaluativoId,
		...data
	}: ICreateAsignaturaEnVarianteCurso): Promise<IAsignaturaEnVarianteCurso> {
		return {
			id: crypto.randomUUID(),
			asignaturaId,
			varianteCursoId,
			modeloEvaluativoId,
			...data,
			asignatura: {
				id: crypto.randomUUID(),
				nombre: "Asignatura",
				codigo: null,
				enUso: false,

				createdAt: new Date(),
				updatedAt: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}
}
