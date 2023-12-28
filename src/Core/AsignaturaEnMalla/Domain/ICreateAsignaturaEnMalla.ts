export type ICreateAsignaturaEnMalla = {
	ejeFormativo: string;
	nivel: number;
	areaConocimiento: string;
	campoFormacion: string;
	tipoAsignatura: string;
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

	objetivos: string;
	descripcion: string;
	resultadosAprendizaje: string;

	asignaturaId: string;
	mallaId: string;
};
