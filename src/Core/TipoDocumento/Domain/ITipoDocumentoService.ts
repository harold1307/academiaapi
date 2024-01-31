import type { ITipoDocumento } from "./ITipoDocumento";
import type { ICreateTipoDocumento } from "./ICreateTipoDocumento";
import type { UpdateTipoDocumentoParams } from "./ITipoDocumentoRepository";

export type ITipoDocumentoService = {
	createTipoDocumento(data: ICreateTipoDocumento): Promise<ITipoDocumento>;
	getAllTiposDocumento(): Promise<ITipoDocumento[]>;
	getTipoDocumentoById(id: string): Promise<ITipoDocumento | null>;
	updateTipoDocumentoById(
		params: UpdateTipoDocumentoParams,
	): Promise<ITipoDocumento>;
	deleteTipoDocumentoById(id: string): Promise<ITipoDocumento>;
};
