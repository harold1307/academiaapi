import type { ICreatePrograma } from "./ICreatePrograma";
import type { IPrograma } from "./IPrograma";
import type { IProgramaQueryFilter } from "./IProgramaQueryFilter";
import type { IUpdatePrograma } from "./IUpdatePrograma";

export type UpdateProgramaParams = {
	id: string;
	data: IUpdatePrograma;
};

export type GetAllProgramaParams = {
	filters?: IProgramaQueryFilter;
};

export type IProgramaRepository = {
	create(data: ICreatePrograma): Promise<IPrograma>;
	getAll(params?: GetAllProgramaParams): Promise<IPrograma[]>;
	getById(id: string): Promise<IPrograma | null>;
	update(params: UpdateProgramaParams): Promise<IPrograma>;
	deleteById(id: string): Promise<IPrograma>;
};
