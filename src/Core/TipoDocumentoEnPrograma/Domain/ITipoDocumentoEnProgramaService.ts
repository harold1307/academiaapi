import type { ICreateTipoDocumentoEnPrograma } from "./ICreateTipoDocumentoEnPrograma";
import type { ITipoDocumentoEnPrograma } from "./ITipoDocumentoEnPrograma";
import type { UpdateTipoDocumentoEnProgramaParams } from "./ITipoDocumentoEnProgramaRepository";

export type ITipoDocumentoEnProgramaService = {
	createTipoDocumentoEnPrograma(
		data: ICreateTipoDocumentoEnPrograma,
	): Promise<ITipoDocumentoEnPrograma>;
	getAllTiposDocumentoEnProgramas(): Promise<ITipoDocumentoEnPrograma[]>;
	getTipoDocumentoEnProgramaById(
		id: string,
	): Promise<ITipoDocumentoEnPrograma | null>;
	updateTipoDocumentoEnProgramaById(
		params: UpdateTipoDocumentoEnProgramaParams,
	): Promise<ITipoDocumentoEnPrograma>;
	deleteTipoDocumentoEnProgramaById(
		id: string,
	): Promise<ITipoDocumentoEnPrograma>;
};
