import type { ICreateTurno } from "./ICreateTurno";
import type { ITurno } from "./ITurno";
import type { IUpdateTurno } from "./IUpdateTurno";

export type UpdateTurnoParams = {
	id: string;
	data: IUpdateTurno;
};

export type ITurnoRepository = {
	create(data: ICreateTurno): Promise<ITurno>;
	getAll(): Promise<ITurno[]>;
	getById(id: string): Promise<ITurno | null>;
	update(params: UpdateTurnoParams): Promise<ITurno>;
	deleteById(id: string): Promise<ITurno>;
};
