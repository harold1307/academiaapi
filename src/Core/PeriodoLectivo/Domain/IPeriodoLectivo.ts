import type { PeriodoLectivo } from "@prisma/client";

import type { ICalculoCosto } from "../../CalculoCosto/Domain/ICalculoCosto";

export type IPeriodoLectivo = PeriodoLectivo & {
	enUso: boolean;
	fechasEnMatricula: boolean;
	estructuraParalelosAgrupadosPorNivel: boolean;
	planificacionProfesoresObligatoria: boolean;
	legalizarMatriculas: boolean;
	secuenciaDesdeNumeroEspecifico: boolean;
	numeroMatricula: boolean;
	calculoCosto: ICalculoCosto;
};
