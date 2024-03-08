import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateResponsableEnAsesorEstudiante } from "../Domain/ICreateResponsableEnAsesorEstudiante";
import type { IResponsableEnAsesorEstudiante } from "../Domain/IResponsableEnAsesorEstudiante";
import type { IResponsableEnAsesorEstudianteRepository } from "../Domain/IResponsableEnAsesorEstudianteRepository";
import type { IResponsableEnAsesorEstudianteService } from "../Domain/IResponsableEnAsesorEstudianteService";
import { CreateResponsableEnAsesorEstudianteDTO } from "../Infrastructure/DTOs/CreateResponsableEnAsesorEstudianteDTO";

@injectable()
export class ResponsableEnAsesorEstudianteService
	implements IResponsableEnAsesorEstudianteService
{
	constructor(
		@inject(TYPES.ResponsableEnAsesorEstudianteRepository)
		private _responsableEnAsesorEstudianteRepository: IResponsableEnAsesorEstudianteRepository,
	) {}

	// getAllResponsableEnAsesorEstudiantes(): Promise<
	// 	IResponsableEnAsesorEstudiante[]
	// > {
	// 	return this._responsableEnAsesorEstudianteRepository.getAll();
	// }

	getResponsableEnAsesorEstudianteById(
		id: string,
	): Promise<IResponsableEnAsesorEstudiante | null> {
		return this._responsableEnAsesorEstudianteRepository.getById(id);
	}

	deleteResponsableEnAsesorEstudianteById(
		id: string,
	): Promise<IResponsableEnAsesorEstudiante> {
		return this._responsableEnAsesorEstudianteRepository.deleteById(id);
	}

	createResponsableEnAsesorEstudiante(
		data: ICreateResponsableEnAsesorEstudiante,
	): Promise<IResponsableEnAsesorEstudiante> {
		const dto = new CreateResponsableEnAsesorEstudianteDTO(data);
		return this._responsableEnAsesorEstudianteRepository.create(dto.getData());
	}

	// updateResponsableEnAsesorEstudianteById(params: UpdateResponsableEnAsesorEstudianteParams): Promise<IResponsableEnAsesorEstudiante> {}
}

// class ResponsableEnAsesorEstudianteServiceError extends Error {
// 	constructor(message: string) {
// 		super();
// 		this.message = message;
// 		this.name = "ResponsableEnAsesorEstudianteServiceError";
// 	}
// }
