import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateResponsableAsesorEstudiante } from "../Domain/ICreateResponsableAsesorEstudiante";
import type { IResponsableAsesorEstudiante } from "../Domain/IResponsableAsesorEstudiante";
import type { IResponsableAsesorEstudianteRepository } from "../Domain/IResponsableAsesorEstudianteRepository";
import type { IResponsableAsesorEstudianteService } from "../Domain/IResponsableAsesorEstudianteService";
import type { IResponsableAsesorEstudianteWithAsesores } from "../Domain/IResponsableAsesorEstudianteWithAsesores";
import { CreateResponsableAsesorEstudianteDTO } from "../Infrastructure/DTOs/CreateResponsableAsesorEstudianteDTO";

@injectable()
export class ResponsableAsesorEstudianteService
	implements IResponsableAsesorEstudianteService
{
	constructor(
		@inject(TYPES.ResponsableAsesorEstudianteRepository)
		private _responsableAsesorEstudianteRepository: IResponsableAsesorEstudianteRepository,
	) {}

	getAllResponsableAsesorEstudiantes(): Promise<
		IResponsableAsesorEstudiante[]
	> {
		return this._responsableAsesorEstudianteRepository.getAll();
	}

	getResponsableAsesorEstudianteById(
		id: string,
	): Promise<IResponsableAsesorEstudiante | null> {
		return this._responsableAsesorEstudianteRepository.getById(id);
	}

	async deleteResponsableAsesorEstudianteById(
		id: string,
	): Promise<IResponsableAsesorEstudiante> {
		const responsableAsesorEstudiante =
			await this._responsableAsesorEstudianteRepository.getById(id);

		if (!responsableAsesorEstudiante) {
			throw new ResponsableAsesorEstudianteServiceError(
				"El responsable de asesor de estudiante no existe",
			);
		}

		return this._responsableAsesorEstudianteRepository.deleteById(id);
	}

	createResponsableAsesorEstudiante(
		data: ICreateResponsableAsesorEstudiante,
	): Promise<IResponsableAsesorEstudiante> {
		const dto = new CreateResponsableAsesorEstudianteDTO(data);

		return this._responsableAsesorEstudianteRepository.create(dto.getData());
	}

	// updateResponsableAsesorEstudianteById(
	// 	params: UpdateResponsableAsesorEstudianteParams,
	// ): Promise<IResponsableAsesorEstudiante> {}

	getResponsableAsesorEstudianteByIdWithAsesores(
		id: string,
	): Promise<IResponsableAsesorEstudianteWithAsesores | null> {
		return this._responsableAsesorEstudianteRepository.getByIdWithAsesores(id);
	}
}

class ResponsableAsesorEstudianteServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ResponsableAsesorEstudianteServiceError";
	}
}
