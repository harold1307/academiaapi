import type { TipoDocumento } from "@prisma/client";

export type ITipoDocumento = TipoDocumento & {
	enUso: boolean;
};
