import type { Administrativo, AsesorEstudiante } from "@prisma/client";

import type { IUsuario } from "../../Usuario/Domain/IUsuario";

export type IAsesorEstudiante = AsesorEstudiante & {
	administrativo: Administrativo & {
		usuario: Omit<
			IUsuario,
			"administrativo" | "profesor" | "alumno" | "grupos"
		>;
	};
	estudiantesCount: number;
};
