import type { IMallaCurricular } from "../../MallaCurricular/Domain/IMallaCurricular";
import type { IModalidad } from "../../Modalidad/Domain/IModalidad";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { IProgramaEnCursoEscuela } from "../../ProgramaEnCursoEscuela/Domain/IProgramaEnCursoEscuela";
import type { ICursoEscuela } from "./ICursoEscuela";

export type ICursoEscuelaWithProgramas = ICursoEscuela & {
	programas: (IProgramaEnCursoEscuela & {
		programa: Omit<
			IPrograma,
			"enUso" | "nivelTitulacion" | "detalleNivelTitulacion"
		>;
		modalidad: Omit<IModalidad, "enUso"> | null;
		malla: Omit<
			IMallaCurricular,
			| "enUso"
			| "modalidad"
			| "practicaPreProfesional"
			| "practicaComunitaria"
			| "tituloObtenido"
			| "niveles"
			| "modulos"
		> | null;
	})[];
};
