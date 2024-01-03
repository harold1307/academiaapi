import type { $Enums } from "@prisma/client";

export type ICreateAsignaturaEnMalla = {
	ejeFormativo: string;
	nivel: number;
	areaConocimiento: string;
	campoFormacion: string;
	tipoAsignatura: $Enums.TipoAsignatura;
	identificacion: string;

	permiteMatriculacion: boolean;
	validaCredito: boolean;
	validaPromedio: boolean;
	costoEnMatricula: boolean;
	practicasPreProfesionales: boolean;
	requeridaEgreso: boolean;

	cantidadMatriculas: number;
	horasSemanales: number;
	horasColaborativas: number;
	horasAsistidasDocente: number;
	horasAutonomas: number;
	horasPracticas: number;
	creditos: number;

	noValidaAsistencia: boolean;
	materiaComun: boolean;

	objetivos: string | null;
	descripcion: string | null;
	resultadosAprendizaje: string | null;

	asignaturaId: string;
	mallaId: string;
};
