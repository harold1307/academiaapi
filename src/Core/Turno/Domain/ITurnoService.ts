import type { ICreateTurno } from "./ICreateTurno";
import type { ITurno } from "./ITurno";
import type { UpdateTurnoParams } from "./ITurnoRepository";

export type ITurnoService = {
	createTurno(data: ICreateTurno): Promise<ITurno>;
	getAllTurnos(): Promise<ITurno[]>;
	getTurnoById(id: string): Promise<ITurno | null>;
	updateTurnoById(params: UpdateTurnoParams): Promise<ITurno>;
	deleteTurnoById(id: string): Promise<ITurno>;
};
