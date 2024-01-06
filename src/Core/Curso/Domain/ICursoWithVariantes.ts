import type { VarianteCurso } from "@prisma/client";

import type { ICurso } from "./ICurso";

export type ICursoWithVariantes = ICurso & {
	variantes: VarianteCurso[];
};
