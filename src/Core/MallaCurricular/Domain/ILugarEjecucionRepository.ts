import type { ICreateLugarEjecucion } from "./ICreateLugarEjecucion";
import type { ILugarEjecucion } from "./ILugarEjecucion";

export type ILugarEjecucionRepository = {
	create(data: ICreateLugarEjecucion): Promise<ILugarEjecucion>;
	getAll(): Promise<ILugarEjecucion[]>;
	// getById(id: string): Promise<ILugarEjecucion | null>;
	// update(params: {
	// 	id: string;
	// 	lugarEjecucion: IUpdateLugarEjecucionOutput;
	// }): Promise<ILugarEjecucion>;
	// deleteById(id: string): Promise<ILugarEjecucion>;
};
