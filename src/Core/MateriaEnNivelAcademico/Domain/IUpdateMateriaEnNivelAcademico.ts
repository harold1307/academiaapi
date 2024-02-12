import type { IMateriaEnNivelAcademico } from "./IMateriaEnNivelAcademico";

export type IUpdateMateriaEnNivelAcademico = Partial<
	Pick<
		IMateriaEnNivelAcademico,
		| "alias"
		| "fechaFin"
		| "fechaInicio"
		| "materiaExterna"
		| "practicasPermitidas"
		| "validaParaCreditos"
		| "validaParaPromedio"
		| "sumaHorasProfesor"
		| "estado"
	>
>;
