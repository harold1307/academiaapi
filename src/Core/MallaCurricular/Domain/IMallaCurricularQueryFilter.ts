import type { MallaCurricular } from "@prisma/client";

import type { NonNullableObject } from "../../../types";

export type IMallaCurricularQueryFilter = Partial<
	NonNullableObject<
		Omit<
			MallaCurricular,
			| "fechaAprobacion"
			| "fechaLimiteVigencia"
			| "cantidadOtrasMateriasMatricula"
			| "createdAt"
			| "updatedAt"
			| "id"
		>
	>
>;
