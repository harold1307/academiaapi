import type { MallaCurricular } from "@prisma/client";

export type IMallaCurricular = MallaCurricular & {
	enUso: boolean;
};
