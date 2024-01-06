import type { VarianteCurso } from "@prisma/client";

export type IVarianteCurso = Omit<VarianteCurso, "cursoId">;
