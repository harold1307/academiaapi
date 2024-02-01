import type { ICreateTurno } from "./ICreateTurno";

export type IUpdateTurno = Partial<
	Omit<ICreateTurno, "sesionId"> & {
		estado: boolean;
	}
>;
