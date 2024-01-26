import type { IAreaConocimiento } from "./IAreaConocimiento";
import type { IUpdateAreaConocimientoParams } from "./IAreaConocimientoRepository";
import type { ICreateAreaConocimiento } from "./ICreateAreaConocimiento";

export type IAreaConocimientoService = {
	createAreaConocimiento(
		data: ICreateAreaConocimiento,
	): Promise<IAreaConocimiento>;
	getAllAreaConocimientos(): Promise<IAreaConocimiento[]>;
	getAreaConocimientoById(id: string): Promise<IAreaConocimiento | null>;
	updateAreaConocimientoById(
		params: IUpdateAreaConocimientoParams,
	): Promise<IAreaConocimiento>;
	deleteAreaConocimientoById(id: string): Promise<IAreaConocimiento>;
};
