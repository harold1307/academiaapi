import type { TipoDocumentoEnPrograma } from "@prisma/client";
import type { ITipoDocumento } from "../../TipoDocumento/Domain/ITipoDocumento";

export type ITipoDocumentoEnPrograma = TipoDocumentoEnPrograma & {
	enUso: boolean;
	tipoDocumento: ITipoDocumento;
};
