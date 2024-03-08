import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateProgramaEnVarianteCurso } from "../Domain/ICreateProgramaEnVarianteCurso";
import type { IProgramaEnVarianteCurso } from "../Domain/IProgramaEnVarianteCurso";
import type {
	IProgramaEnVarianteCursoRepository,
	UpdateProgramaEnVarianteCursoParams,
} from "../Domain/IProgramaEnVarianteCursoRepository";
import type { IProgramaEnVarianteCursoService } from "../Domain/IProgramaEnVarianteCursoService";
import { CreateProgramaEnVarianteCursoDTO } from "../Infrastructure/DTOs/CreateProgramaEnVarianteCursoDTO";
import { UpdateProgramaEnVarianteCursoDTO } from "../Infrastructure/DTOs/UpdateProgramaEnVarianteCursoDTO";

@injectable()
export class ProgramaEnVarianteCursoService
	implements IProgramaEnVarianteCursoService
{
	constructor(
		@inject(TYPES.ProgramaEnVarianteCursoRepository)
		private _programaEnVarianteCursoRepository: IProgramaEnVarianteCursoRepository,
	) {}

	// getAllProgramaEnVarianteCursos(): Promise<IProgramaEnVarianteCurso[]> {
	//   return this._programaEnVarianteCursoRepository.getAll()
	// }

	getProgramaEnVarianteCursoById(
		id: string,
	): Promise<IProgramaEnVarianteCurso | null> {
		return this._programaEnVarianteCursoRepository.getById(id);
	}

	async deleteProgramaEnVarianteCursoById(
		id: string,
	): Promise<IProgramaEnVarianteCurso> {
		const programa = await this._programaEnVarianteCursoRepository.getById(id);

		if (!programa)
			throw new ProgramaEnVarianteCursoServiceError(
				"El programa en la variante de curso no existe",
			);

		return this._programaEnVarianteCursoRepository.deleteById(id);
	}

	createProgramaEnVarianteCurso(
		data: ICreateProgramaEnVarianteCurso,
	): Promise<IProgramaEnVarianteCurso> {
		const dto = new CreateProgramaEnVarianteCursoDTO(data);

		return this._programaEnVarianteCursoRepository.create(dto.getData());
	}
	updateProgramaEnVarianteCursoById({
		id,
		data,
	}: UpdateProgramaEnVarianteCursoParams): Promise<IProgramaEnVarianteCurso> {
		const dto = new UpdateProgramaEnVarianteCursoDTO(data);

		return this._programaEnVarianteCursoRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class ProgramaEnVarianteCursoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ProgramaEnVarianteCursoServiceError";
	}
}
