import type { IResponsableCrm } from "./IResponsableCrm"
import type { ICreateResponsableCrm } from "./ICreateResponsableCrm"
import type { IUpdateResponsableCrm } from "./IUpdateResponsableCrm";

export type UpdateResponsableCrmParams = {
	id: string;
	data: IUpdateResponsableCrm;
}

export type IResponsableCrmRepository = {
  create(data: ICreateResponsableCrm): Promise<IResponsableCrm>;
	getAll(): Promise<IResponsableCrm[]>;
	getById(id: string): Promise<IResponsableCrm | null>;
	update(params: UpdateResponsableCrmParams): Promise<IResponsableCrm>;
	deleteById(id: string): Promise<IResponsableCrm>;
}