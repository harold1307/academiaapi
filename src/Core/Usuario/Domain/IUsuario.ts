import type {
	Administrativo,
	Alumno,
	AsesorEstudiante,
	Grupo,
	Profesor,
	ResponsableCrm,
	Usuario,
	UsuarioEnGrupo,
} from "@prisma/client";

import type { IAsesorCrm } from "../../AsesorCrm/Domain/IAsesorCrm";
import type { ICoordinacion } from "../../Coordinacion/Domain/ICoordinacion";
import type { IInscripcion } from "../../Inscripcion/Domain/IInscripcion";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { ISede } from "../../Sede/Domain/ISede";

export type IUsuario = Usuario & {
	administrativo:
		| (Administrativo & {
				responsableCrm: ResponsableCrm | null;
				asesorCrm: Omit<
					IAsesorCrm,
					"administrativo" | "centrosInformacion"
				> | null;
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
				inscripciones: Omit<
					IInscripcion,
					| "sede"
					| "modalidad"
					| "coordinacion"
					| "malla"
					| "sesion"
					| "programa"
				>[];
		  })
		| null;
	grupos: (UsuarioEnGrupo & {
		grupo: Grupo;
	})[];
};
