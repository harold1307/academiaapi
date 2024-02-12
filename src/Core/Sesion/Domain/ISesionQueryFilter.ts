import type { Sesion } from "@prisma/client";

import type { NonNullableObject } from "../../../types";

export type ISesionQueryFilter = Partial<
	NonNullableObject<Omit<Sesion, "createdAt" | "updatedAt" | "id">>
>;
