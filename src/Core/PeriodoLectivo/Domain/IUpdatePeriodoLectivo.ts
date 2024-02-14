import type { IPeriodoLectivo } from "./IPeriodoLectivo";

export type IUpdatePeriodoLectivo = Partial<
	Omit<
		IPeriodoLectivo,
		| "calculoCostoId"
		| "id"
		| "createdAt"
		| "updatedAt"
		| "enUso"
		| "fechasEnMatricula"
		| "estructuraParalelosAgrupadosPorNivel"
		| "planificacionProfesoresObligatoria"
		| "legalizarMatriculas"
		| "secuenciaDesdeNumeroEspecifico"
		| "numeroMatricula"
	>
>;
