import type {
	Administrativo,
	Alumno,
	AsesorCrm,
	AsesorEstudiante,
	Grupo,
	Profesor,
	ResponsableCrm,
	Usuario,
	UsuarioEnGrupo,
} from "@prisma/client";

import type { ICoordinacion } from "../../Coordinacion/Domain/ICoordinacion";
import type { IInscripcion } from "../../Inscripcion/Domain/IInscripcion";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { ISede } from "../../Sede/Domain/ISede";

export type IUsuarioWithInscripciones = Usuario & {
	administrativo:
		| (Administrativo & {
				responsableCrm: ResponsableCrm | null;
				asesorCrm: AsesorCrm | null;
				asesorEstudiante: AsesorEstudiante | null;
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