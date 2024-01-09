import type { $Enums } from "@prisma/client";

export type ICreateAsignaturaEnMalla = {
	esAnexo: boolean;
	nivel: number;
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
	sumaHoras: boolean;
	creditos: number;

	noValidaAsistencia: boolean;
	materiaComun: boolean;

	objetivos: string | null;
	descripcion: string | null;
	resultadosAprendizaje: string | null;

	asignaturaId: string;
	mallaId: string;
	ejeFormativoId: string;
	areaConocimientoId: string;
	campoFormacionId: string;
};
