import type { PeriodoLectivo } from "@prisma/client";

export type IPeriodoLectivo = PeriodoLectivo & {
	enUso: boolean;
	fechasEnMatricula: boolean;
	estructuraParalelosAgrupadosPorNivel: boolean;
	planificacionProfesoresObligatoria: boolean;
	legalizarMatriculas: boolean;
	secuenciaDesdeNumeroEspecifico: boolean;
	numeroMatricula: boolean;
};
