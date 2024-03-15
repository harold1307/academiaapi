import type { Inscripcion } from "@prisma/client";

import type { ICoordinacion } from "../../Coordinacion/Domain/ICoordinacion";
import type { IMallaCurricular } from "../../MallaCurricular/Domain/IMallaCurricular";
import type { IModalidad } from "../../Modalidad/Domain/IModalidad";
import type { INivelAcademico } from "../../NivelAcademico/Domain/INivelAcademico";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { ISede } from "../../Sede/Domain/ISede";

export type IInscripcion = Inscripcion & {
	sede: Omit<ISede, "enUso">;
	modalidad: Omit<IModalidad, "enUso">;
	programa: Omit<
		IPrograma,
		"enUso" | "nivelTitulacion" | "detalleNivelTitulacion"
	>;
	coordinacion: Omit<ICoordinacion, "enUso" | "programas" | "profesores">;
	malla: Omit<
		IMallaCurricular,
		| "enUso"
		| "modalidad"
		| "practicaPreProfesional"
		| "practicaComunitaria"
		| "tituloObtenido"
		| "niveles"
		| "modulos"
	>;
	sesion: Omit<INivelAcademico, "sesion" | "nivelMalla">;
};
