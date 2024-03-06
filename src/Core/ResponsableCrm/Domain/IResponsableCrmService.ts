import type { IResponsableCrm } from "./IResponsableCrm";
import type { ICreateResponsableCrm } from "./ICreateResponsableCrm";
import type { UpdateResponsableCrmParams } from "./IResponsableCrmRepository";

export type IResponsableCrmService = {
	createResponsableCrm(data: ICreateResponsableCrm): Promise<IResponsableCrm>;
	getAllResponsableCrms(): Promise<IResponsableCrm[]>;
	getResponsableCrmById(id: string): Promise<IResponsableCrm | null>;
	updateResponsableCrmById(
		params: UpdateResponsableCrmParams,
	): Promise<IResponsableCrm>;
	deleteResponsableCrmById(id: string): Promise<IResponsableCrm>;
};
