import type {
	Administrativo,
	ResponsableAsesorEstudiante,
} from "@prisma/client";

import type { IUsuario } from "../../Usuario/Domain/IUsuario";

export type IResponsableAsesorEstudiante = ResponsableAsesorEstudiante & {
	administrativo: Administrativo & {
		usuario: Omit<
			IUsuario,
			"administrativo" | "profesor" | "alumno" | "grupos"
		>;
	};
	asesoresCount: number;
};
