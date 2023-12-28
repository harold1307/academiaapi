import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICompetencia } from "../Domain/ICompetencia";
import type { ICompetenciaRepository } from "../Domain/ICompetenciaRepository";
import type { ICompetenciaService } from "../Domain/ICompetenciaService";
import { CreateCompetenciaForAsignaturaEnMallaDTO } from "../Infrastructure/DTOs/CreateCompetenciaForAsignaturaEnMallaDTO";

@injectable()
export class CompetenciaService implements ICompetenciaService {
	constructor(
		@inject(TYPES.CompetenciaRepository)
		private _competenciaRepository: ICompetenciaRepository,
	) {}

	async createCompetenciaForAsignaturaEnMalla(
		data: any,
		asignaturaEnMallaId: string,
	): Promise<ICompetencia> {
		const dto = new CreateCompetenciaForAsignaturaEnMallaDTO({
			...data,
			asignaturaEnMallaId,
		});
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error en validacion para crear competencia para asignatura en malla",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CompetenciaServiceError(
				"Error en validacion para crear competencia para asignatura en malla",
			);
		}

		return this._competenciaRepository.create({
			...validation.data,
			tipo: "GENERICA",
		});
	}
}

class CompetenciaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}
