import type { IPrograma } from "./IPrograma";
import type { ICreatePrograma } from "./ICreatePrograma";
import type { IUpdatePrograma } from "./IUpdatePrograma";

export type UpdateProgramaParams = {
	id: string;
	data: IUpdatePrograma;
};

export type IProgramaRepository = {
	create(data: ICreatePrograma): Promise<IPrograma>;
	getAll(): Promise<IPrograma[]>;
	getById(id: string): Promise<IPrograma | null>;
	update(params: UpdateProgramaParams): Promise<IPrograma>;
	deleteById(id: string): Promise<IPrograma>;
};
