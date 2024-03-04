import type { IMallaCurricular } from "../../MallaCurricular/Domain/IMallaCurricular";
import type { IModalidad } from "../../Modalidad/Domain/IModalidad";
import type { IPrograma } from "../../Programa/Domain/IPrograma";
import type { IProgramaEnVarianteCurso } from "../../ProgramaEnVarianteCurso/Domain/IProgramaEnVarianteCurso";
import type { IVarianteCurso } from "./IVarianteCurso";

export type IVarianteCursoWIthProgramas = IVarianteCurso & {
	programas: (IProgramaEnVarianteCurso & {
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
