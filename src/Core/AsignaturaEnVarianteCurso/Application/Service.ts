import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaEnVarianteCurso } from "../Domain/IAsignaturaEnVarianteCurso";
import type { IAsignaturaEnVarianteCursoRepository } from "../Domain/IAsignaturaEnVarianteCursoRepository";
import type {
	IAsignaturaEnVarianteCursoService,
	ICreateAsignaturaEnVarianteCursoParams,
} from "../Domain/IAsignaturaEnVarianteCursoService";
import { CreateAsignaturaEnVarianteCurso } from "../Infrastructure/DTOs/CreateAsignaturaEnVarianteCurso";

@injectable()
export class AsignaturaEnVarianteCursoService
	implements IAsignaturaEnVarianteCursoService
{
	constructor(
		@inject(TYPES.AsignaturaEnVarianteCursoRepository)
		private _asignaturaEnVarianteCursoRepository: IAsignaturaEnVarianteCursoRepository,
	) {}

	async createAsignaturaEnVarianteCurso({
		asignaturaId,
		varianteCursoId,
		data,
	}: ICreateAsignaturaEnVarianteCursoParams): Promise<IAsignaturaEnVarianteCurso> {
		const dto = new CreateAsignaturaEnVarianteCurso({
			...data,
			varianteCursoId,
			asignaturaId,
		});
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear variante de curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new AsignaturaEnVarianteCursoServiceError(
				"Esquema para crear variante de curso invalido.",
			);
		}

		return this._asignaturaEnVarianteCursoRepository.create(validation.data);
	}
}

class AsignaturaEnVarianteCursoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "AsignaturaEnVarianteCursoService";
	}
}
