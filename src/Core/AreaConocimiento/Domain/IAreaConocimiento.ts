import type { AreaConocimiento } from "@prisma/client";

export type IAreaConocimiento = AreaConocimiento & {
	enUso: boolean;
};
