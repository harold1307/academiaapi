import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateTurno } from "../Domain/ICreateTurno";
import type { ITurno } from "../Domain/ITurno";
import type {
	ITurnoRepository,
	UpdateTurnoParams,
} from "../Domain/ITurnoRepository";
import type { ITurnoService } from "../Domain/ITurnoService";
import { CreateTurnoDTO } from "../Infrastructure/DTOs/CreateTurnoDTO";
import { UpdateTurnoDTO } from "../Infrastructure/DTOs/UpdateTurnoDTO";

@injectable()
export class TurnoService implements ITurnoService {
	constructor(
		@inject(TYPES.TurnoRepository) private _turnoRepository: ITurnoRepository,
	) {}

	getAllTurnos(): Promise<ITurno[]> {
		return this._turnoRepository.getAll();
	}

	getTurnoById(id: string): Promise<ITurno | null> {
		return this._turnoRepository.getById(id);
	}

	async deleteTurnoById(id: string): Promise<ITurno> {
		const turno = await this._turnoRepository.getById(id);

		if (!turno) throw new TurnoServiceError("El turno no existe");

		if (turno.enUso)
			throw new TurnoServiceError("El turno está en uso, no se puede eliminar");

		return this._turnoRepository.deleteById(id);
	}

	createTurno(data: ICreateTurno): Promise<ITurno> {
		const dto = new CreateTurnoDTO(data);

		return this._turnoRepository.create(dto.getData());
	}

	async updateTurnoById({ id, data }: UpdateTurnoParams): Promise<ITurno> {
		const dto = new UpdateTurnoDTO(data);

		const turno = await this._turnoRepository.getById(id);

		if (!turno) throw new TurnoServiceError("El turno no existe");

		if (turno.enUso)
			throw new TurnoServiceError(
				"El turno está en uso, no se puede actualizar",
			);

		return this._turnoRepository.update({ id, data: dto.getData() });
	}
}

class TurnoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "TurnoServiceError";
	}
}
