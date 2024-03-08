import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreatePrograma } from "../Domain/ICreatePrograma";
import type { IPrograma } from "../Domain/IPrograma";
import type {
	IProgramaRepository,
	UpdateProgramaParams,
} from "../Domain/IProgramaRepository";
import type {
	GetAllProgramasParams,
	IProgramaService,
} from "../Domain/IProgramaService";
import { CreateProgramaDTO } from "../Infrastructure/DTOs/CreateProgramaDTO";
import { ProgramaQueryFilterDTO } from "../Infrastructure/DTOs/ProgramaQueryFIlterDTO";
import { UpdateProgramaDTO } from "../Infrastructure/DTOs/UpdateProgramaDTO";

@injectable()
export class ProgramaService implements IProgramaService {
	constructor(
		@inject(TYPES.ProgramaRepository)
		private _programaRepository: IProgramaRepository,
	) {}

	getAllProgramas(params?: GetAllProgramasParams): Promise<IPrograma[]> {
		const { filters } = params || {};

		const filterDTO = new ProgramaQueryFilterDTO(filters);

		return this._programaRepository.getAll({
			filters: filterDTO.getData(),
		});
	}

	getProgramaById(id: string): Promise<IPrograma | null> {
		return this._programaRepository.getById(id);
	}

	async deleteProgramaById(id: string): Promise<IPrograma> {
		const programa = await this._programaRepository.getById(id);

		if (!programa) throw new ProgramaServiceError("El programa no existe");

		if (programa.enUso)
			throw new ProgramaServiceError(
				"El programa esta en uso, no se puede eliminar",
			);

		return this._programaRepository.deleteById(id);
	}

	async createPrograma(data: ICreatePrograma): Promise<IPrograma> {
		const dto = new CreateProgramaDTO(data);

		return this._programaRepository.create(dto.getData());
	}

	async updateProgramaById({
		id,
		data,
	}: UpdateProgramaParams): Promise<IPrograma> {
		const dto = new UpdateProgramaDTO(data);
		const valid = dto.getData();

		const programa = await this._programaRepository.getById(id);

		if (!programa) throw new ProgramaServiceError("El programa no existe");

		if (
			valid.detalleNivelTitulacionId &&
			programa.detalleNivelTitulacionId === valid.detalleNivelTitulacionId
		) {
			return this._programaRepository.update({
				id,
				data: {
					...valid,
					detalleNivelTitulacionId: undefined,
				},
			});
		}

		return this._programaRepository.update({ id, data: valid });
	}
}

class ProgramaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "ProgramaServiceError";
	}
}
