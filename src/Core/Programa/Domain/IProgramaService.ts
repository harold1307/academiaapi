import type { IPrograma } from "./IPrograma";
import type { ICreatePrograma } from "./ICreatePrograma";
import type { UpdateProgramaParams } from "./IProgramaRepository";

export type IProgramaService = {
	createPrograma(data: ICreatePrograma): Promise<IPrograma>;
	getAllProgramas(): Promise<IPrograma[]>;
	getProgramaById(id: string): Promise<IPrograma | null>;
	updateProgramaById(params: UpdateProgramaParams): Promise<IPrograma>;
	deleteProgramaById(id: string): Promise<IPrograma>;
};
