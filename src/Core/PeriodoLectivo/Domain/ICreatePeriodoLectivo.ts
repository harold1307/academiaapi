import type { IPeriodoLectivo } from "./IPeriodoLectivo";

export type ICreatePeriodoLectivo = Omit<
	IPeriodoLectivo,
	| "id"
	| "createdAt"
	| "updatedAt"
	| "enUso"
	| "matriculas"
	| "estado"
	| "abierto"
	| "actividadesDocencia"
	| "actividadesInvestigacion"
	| "actividadesGestion"
	| "actividadesPracticasComunitarias"
	| "actividadesPracticasPreprofesionales"
	| "otrasActividades"
	| "calculoCostoId"
	| "fechasEnMatricula"
	| "estructuraParalelosAgrupadosPorNivel"
	| "planificacionProfesoresObligatoria"
	| "legalizarMatriculas"
	| "secuenciaDesdeNumeroEspecifico"
	| "numeroMatricula"
>;
