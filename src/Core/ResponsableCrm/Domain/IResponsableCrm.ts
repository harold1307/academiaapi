import type { Administrativo, ResponsableCrm } from "@prisma/client";

import type { IUsuario } from "../../Usuario/Domain/IUsuario";

export type IResponsableCrm = ResponsableCrm & {
	administrativo: Administrativo & {
		usuario: Omit<
			IUsuario,
			"administrativo" | "profesor" | "alumno" | "grupos"
		>;
	};
};
