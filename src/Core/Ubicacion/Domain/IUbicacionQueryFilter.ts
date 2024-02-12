import type { Ubicacion } from "@prisma/client";

import type { NonNullableObject } from "../../../types";

export type IUbicacionQueryFilter = Partial<
	NonNullableObject<Omit<Ubicacion, "createdAt" | "updatedAt" | "id">>
>;
