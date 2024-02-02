import type { ITipoDocumentoEnPrograma } from "./ITipoDocumentoEnPrograma";
import type { ICreateTipoDocumentoEnPrograma } from "./ICreateTipoDocumentoEnPrograma";
import type { IUpdateTipoDocumentoEnPrograma } from "./IUpdateTipoDocumentoEnPrograma";

export type UpdateTipoDocumentoEnProgramaParams = {
	id: string;
	data: IUpdateTipoDocumentoEnPrograma;
};

export type ITipoDocumentoEnProgramaRepository = {
	create(
		data: ICreateTipoDocumentoEnPrograma,
	): Promise<ITipoDocumentoEnPrograma>;
	getAll(): Promise<ITipoDocumentoEnPrograma[]>;
	getById(id: string): Promise<ITipoDocumentoEnPrograma | null>;
	update(
		params: UpdateTipoDocumentoEnProgramaParams,
	): Promise<ITipoDocumentoEnPrograma>;
	deleteById(id: string): Promise<ITipoDocumentoEnPrograma>;
};
