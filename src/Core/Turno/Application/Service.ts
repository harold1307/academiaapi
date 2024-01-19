import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateTurno } from "../Domain/ICreateTurno";
import type { ITurno } from "../Domain/ITurno";
import type { ITurnoRepository } from "../Domain/ITurnoRepository";
import type { ITurnoService } from "../Domain/ITurnoService";
import { CreateTurnoDTO } from "../Infrastructure/DTOs/CreateTurnoDTO";

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

	deleteTurnoById(id: string): Promise<ITurno> {
		return this._turnoRepository.deleteById(id);
	}

	createTurno(data: ICreateTurno): Promise<ITurno> {
		const dto = new CreateTurnoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear turno",
				JSON.stringify(validation.error, null, 2),
			);
			throw new TurnoServiceError("Esquema para crear turno invalido");
		}

		return this._turnoRepository.create(validation.data);
	}

	// updateTurnoById(params: IUpdateTurnoParams): Promise<ITurno> {}
}

class TurnoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "TurnoServiceError";
	}
}
