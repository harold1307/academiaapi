import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsesorEstudiante } from "../Domain/IAsesorEstudiante";
import type {
	IAsesorEstudianteRepository,
	UpdateAsesorEstudianteParams,
} from "../Domain/IAsesorEstudianteRepository";
import type { IAsesorEstudianteService } from "../Domain/IAsesorEstudianteService";
import type { ICreateAsesorEstudiante } from "../Domain/ICreateAsesorEstudiante";
import { CreateAsesorEstudianteDTO } from "../Infrastructure/DTOs/CreateAsesorEstudianteDTO";
import { UpdateAsesorEstudianteDTO } from "../Infrastructure/DTOs/UpdateAsesorEstudianteDTO";

@injectable()
export class AsesorEstudianteService implements IAsesorEstudianteService {
	constructor(
		@inject(TYPES.AsesorEstudianteRepository)
		private _asesorEstudianteRepository: IAsesorEstudianteRepository,
	) {}

	getAllAsesorEstudiantes(): Promise<IAsesorEstudiante[]> {
		return this._asesorEstudianteRepository.getAll();
	}

	getAsesorEstudianteById(id: string): Promise<IAsesorEstudiante | null> {
		return this._asesorEstudianteRepository.getById(id);
	}

	async deleteAsesorEstudianteById(id: string): Promise<IAsesorEstudiante> {
		const asesor = await this._asesorEstudianteRepository.getById(id);

		if (!asesor)
			throw new AsesorEstudianteServiceError(
				"El asesor de estudiante no existe",
			);

		return this._asesorEstudianteRepository.deleteById(id);
	}

	createAsesorEstudiante(
		data: ICreateAsesorEstudiante,
	): Promise<IAsesorEstudiante> {
		const dto = new CreateAsesorEstudianteDTO(data);

		return this._asesorEstudianteRepository.create(dto.getData());
	}

	async updateAsesorEstudianteById({
		id,
		data,
	}: UpdateAsesorEstudianteParams): Promise<IAsesorEstudiante> {
		const dto = new UpdateAsesorEstudianteDTO(data);

		const asesor = await this._asesorEstudianteRepository.getById(id);

		if (!asesor)
			throw new AsesorEstudianteServiceError(
				"El asesor de estudiante no existe",
			);

		return this._asesorEstudianteRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class AsesorEstudianteServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "AsesorEstudianteServiceError";
	}
}
