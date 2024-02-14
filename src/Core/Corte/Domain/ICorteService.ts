import type { ICorte } from "./ICorte";
import type { ICreateCorte } from "./ICreateCorte";
import type { UpdateCorteParams } from "./ICorteRepository";

export type ICorteService = {
	createCorte(data: ICreateCorte): Promise<ICorte>;
	getAllCortes(): Promise<ICorte[]>;
	getCorteById(id: string): Promise<ICorte | null>;
	updateCorteById(params: UpdateCorteParams): Promise<ICorte>;
	deleteCorteById(id: string): Promise<ICorte>;
};
