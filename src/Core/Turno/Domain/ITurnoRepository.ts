import type { ITurno } from "./ITurno"
import type { ICreateTurno } from "./ICreateTurno"

export type ITurnoRepository = {
  create(data: ICreateTurno): Promise<ITurno>;
	getAll(): Promise<ITurno[]>;
	getById(id: string): Promise<ITurno | null>;
	// update(params: IUpdateTurnoParams): Promise<ITurno>;
	deleteById(id: string): Promise<ITurno>;
}