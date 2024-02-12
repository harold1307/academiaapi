import type { ITipoDocumentoEnPrograma } from "./ITipoDocumentoEnPrograma";

export type ICreateTipoDocumentoEnPrograma = Omit<
	ITipoDocumentoEnPrograma,
	"id" | "enUso" | "createdAt" | "updatedAt" | "tipoDocumento"
>;
