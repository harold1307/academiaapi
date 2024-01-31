import type { ITipoDocumento } from "./ITipoDocumento"
import type { ICreateTipoDocumento } from "./ICreateTipoDocumento"
import type { IUpdateTipoDocumento } from "./IUpdateTipoDocumento";

export type UpdateTipoDocumentoParams = {
	id: string;
	data: IUpdateTipoDocumento;
}

export type ITipoDocumentoRepository = {
  create(data: ICreateTipoDocumento): Promise<ITipoDocumento>;
	getAll(): Promise<ITipoDocumento[]>;
	getById(id: string): Promise<ITipoDocumento | null>;
	update(params: UpdateTipoDocumentoParams): Promise<ITipoDocumento>;
	deleteById(id: string): Promise<ITipoDocumento>;
}