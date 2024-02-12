import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateMateriaEnHorario } from "../Domain/ICreateMateriaEnHorario";
import type { IMateriaEnHorario } from "../Domain/IMateriaEnHorario";
import type {
	IMateriaEnHorarioRepository,
	UpdateMateriaEnHorarioParams,
} from "../Domain/IMateriaEnHorarioRepository";
import type { IMateriaEnHorarioService } from "../Domain/IMateriaEnHorarioService";
import { CreateMateriaEnHorarioDTO } from "../Infrastructure/DTOs/CreateMateriaEnHorarioDTO";
import { UpdateMateriaEnHorarioDTO } from "../Infrastructure/DTOs/UpdateMateriaEnHorarioDTO";

@injectable()
export class MateriaEnHorarioService implements IMateriaEnHorarioService {
	constructor(
		@inject(TYPES.MateriaEnHorarioRepository)
		private _materiaEnHorarioRepository: IMateriaEnHorarioRepository,
	) {}

	getAllMateriaEnHorarios(): Promise<IMateriaEnHorario[]> {
		return this._materiaEnHorarioRepository.getAll();
	}

	getMateriaEnHorarioById(id: string): Promise<IMateriaEnHorario | null> {
		return this._materiaEnHorarioRepository.getById(id);
	}

	deleteMateriaEnHorarioById(id: string): Promise<IMateriaEnHorario> {
		const materiaEnHorario = this._materiaEnHorarioRepository.getById(id);

		if (!materiaEnHorario)
			throw new MateriaEnHorarioServiceError("La materia en horario no existe");

		return this._materiaEnHorarioRepository.deleteById(id);
	}

	createMateriaEnHorario(
		data: ICreateMateriaEnHorario,
	): Promise<IMateriaEnHorario> {
		const dto = new CreateMateriaEnHorarioDTO(data);

		return this._materiaEnHorarioRepository.create(dto.getData());
	}
	updateMateriaEnHorarioById({
		id,
		data,
	}: UpdateMateriaEnHorarioParams): Promise<IMateriaEnHorario> {
		const dto = new UpdateMateriaEnHorarioDTO(data);

		const materiaEnHorario = this._materiaEnHorarioRepository.getById(id);

		if (!materiaEnHorario)
			throw new MateriaEnHorarioServiceError("La materia en horario no existe");

		return this._materiaEnHorarioRepository.update({ id, data: dto.getData() });
	}
}

class MateriaEnHorarioServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "MateriaEnHorarioServiceError";
	}
}
