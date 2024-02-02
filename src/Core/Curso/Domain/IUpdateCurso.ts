import type { ICreateCurso } from "./ICreateCurso";

export type IUpdateCurso = Partial<
	ICreateCurso & {
		estado: boolean;
	}
>;
