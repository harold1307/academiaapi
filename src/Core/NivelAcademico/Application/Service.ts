import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateNivelAcademico } from "../Domain/ICreateNivelAcademico";
import type { INivelAcademico } from "../Domain/INivelAcademico";
import type {
	INivelAcademicoRepository,
	UpdateNivelAcademicoParams,
} from "../Domain/INivelAcademicoRepository";
import type { INivelAcademicoService } from "../Domain/INivelAcademicoService";
import { CreateNivelAcademicoDTO } from "../Infrastructure/DTOs/CreateNivelAcademicoDTO";
import { UpdateNivelAcademicoDTO } from "../Infrastructure/DTOs/UpdateNivelAcademicoDTO";

@injectable()
export class NivelAcademicoService implements INivelAcademicoService {
	constructor(
		@inject(TYPES.NivelAcademicoRepository)
		private _nivelAcademicoRepository: INivelAcademicoRepository,
	) {}

	getAllNivelAcademicos(): Promise<INivelAcademico[]> {
		return this._nivelAcademicoRepository.getAll();
	}

	getNivelAcademicoById(id: string): Promise<INivelAcademico | null> {
		return this._nivelAcademicoRepository.getById(id);
	}

	async deleteNivelAcademicoById(id: string): Promise<INivelAcademico> {
		const nivel = await this._nivelAcademicoRepository.getById(id);

		if (!nivel)
			throw new NivelAcademicoServiceError("El nivel academico no existe");

		return this._nivelAcademicoRepository.deleteById(id);
	}

	createNivelAcademico(data: ICreateNivelAcademico): Promise<INivelAcademico> {
		const dto = new CreateNivelAcademicoDTO(data);

		return this._nivelAcademicoRepository.create(dto.getData());
	}

	async updateNivelAcademicoById({
		id,
		data,
	}: UpdateNivelAcademicoParams): Promise<INivelAcademico> {
		const dto = new UpdateNivelAcademicoDTO(data);

		const nivel = await this._nivelAcademicoRepository.getById(id);

		if (!nivel)
			throw new NivelAcademicoServiceError("El nivel academico no existe");

		return this._nivelAcademicoRepository.update({ id, data: dto.getData() });
	}
}

class NivelAcademicoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "NivelAcademicoServiceError";
	}
}
