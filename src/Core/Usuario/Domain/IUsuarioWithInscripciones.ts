import type {
	Administrativo,
	Alumno,
	Grupo,
	Profesor,
	Usuario,
	UsuarioEnGrupo,
} from "@prisma/client";

import type { IAsesorCrm } from "../../AsesorCrm/Domain/IAsesorCrm";
import type { IAsesorEstudiante } from "../../AsesorEstudiante/Domain/IAsesorEstudiante";
import type { ICoordinacion } from "../../Coordinacion/Domain/ICoordinacion";
import type { IInscripcion } from "../../Inscripcion/Domain/IInscripcion";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { IResponsableAsesorEstudiante } from "../../ResponsableAsesorEstudiante/Domain/IResponsableAsesorEstudiante";
import type { IResponsableCrm } from "../../ResponsableCrm/Domain/IResponsableCrm";
import type { ISede } from "../../Sede/Domain/ISede";

export type IUsuarioWithInscripciones = Usuario & {
	administrativo:
		| (Administrativo & {
				responsableCrm: Omit<IResponsableCrm, "administrativo"> | null;
				asesorCrm: Omit<
					IAsesorCrm,
					"administrativo" | "centrosInformacion"
				> | null;
				asesorEstudiante: Omit<
					IAsesorEstudiante,
					"administrativo" | "estudiantesCount"
				> | null;
				responsableAsesorEstudiante: Omit<
					IResponsableAsesorEstudiante,
					"administrativo" | "asesoresCount"
				> | null;
				sede: Omit<ISede, "enUso">;
		  })
		| null;
	profesor:
		| (Profesor & {
				coordinacion: Omit<ICoordinacion, "programas" | "enUso" | "profesores">;
				programa: Omit<
					IPrograma,
					"enUso" | "nivelTitulacion" | "detalleNivelTitulacion"
				> | null;
		  })
		| null;

	alumno:
		| (Alumno & {
				inscripciones: IInscripcion[];
		  })
		| null;
	grupos: (UsuarioEnGrupo & {
		grupo: Grupo;
	})[];
};
