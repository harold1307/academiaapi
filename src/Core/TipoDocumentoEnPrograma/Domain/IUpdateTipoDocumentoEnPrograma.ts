import type { ICreateTipoDocumentoEnPrograma } from "./ICreateTipoDocumentoEnPrograma";

export type IUpdateTipoDocumentoEnPrograma = Partial<
	Omit<ICreateTipoDocumentoEnPrograma, "programaId">
>;
