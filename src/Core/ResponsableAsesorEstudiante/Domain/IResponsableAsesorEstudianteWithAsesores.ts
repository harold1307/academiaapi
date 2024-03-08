import type {
	Administrativo,
	ResponsableAsesorEstudiante,
} from "@prisma/client";

import type { IAsesorEstudiante } from "../../AsesorEstudiante/Domain/IAsesorEstudiante";
import type { IResponsableEnAsesorEstudiante } from "../../ResponsableEnAsesorEstudiante/Domain/IResponsableEnAsesorEstudiante";
import type { IUsuario } from "../../Usuario/Domain/IUsuario";

export type IResponsableAsesorEstudianteWithAsesores =
	ResponsableAsesorEstudiante & {
		administrativo: Administrativo & {
			usuario: Omit<
				IUsuario,
				"administrativo" | "profesor" | "alumno" | "grupos"
			>;
		};
		asesoresCount: number;
		asesores: (IResponsableEnAsesorEstudiante & {
			asesorEstudiante: IAsesorEstudiante;
		})[];
	};
