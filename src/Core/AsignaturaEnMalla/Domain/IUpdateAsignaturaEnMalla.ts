import type { $Enums } from "@prisma/client";

export type IUpdateAsignaturaEnMalla = {
	ejeFormativo: string;
	areaConocimiento: string;
	campoFormacion: string;
	tipoAsignatura: $Enums.TipoAsignatura;
	identificacion: string;

	horasSemanales: number;
	horasColaborativas: number;
	horasAsistidasDocente: number;
	horasAutonomas: number;
	horasPracticas: number;

	noValidaAsistencia: boolean;
	materiaComun: boolean;

	objetivos: string;
	descripcion: string;
	resultadosAprendizaje: string;
};
