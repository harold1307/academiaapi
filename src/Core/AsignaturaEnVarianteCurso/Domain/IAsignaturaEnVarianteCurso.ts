import type { AsignaturaEnVarianteCurso } from "@prisma/client";

import type { IAsignatura } from "../../Asignatura/Domain/IAsignatura";

export type IAsignaturaEnVarianteCurso = AsignaturaEnVarianteCurso & {
	asignatura: IAsignatura;
};
