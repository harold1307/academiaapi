import type { IAreaConocimiento } from "./IAreaConocimiento";
import type { UpdateAreaConocimientoParams } from "./IAreaConocimientoRepository";
import type { ICreateAreaConocimiento } from "./ICreateAreaConocimiento";

export type IAreaConocimientoService = {
	createAreaConocimiento(
		data: ICreateAreaConocimiento,
	): Promise<IAreaConocimiento>;
	getAllAreaConocimientos(): Promise<IAreaConocimiento[]>;
	getAreaConocimientoById(id: string): Promise<IAreaConocimiento | null>;
	updateAreaConocimientoById(
		params: UpdateAreaConocimientoParams,
	): Promise<IAreaConocimiento>;
	deleteAreaConocimientoById(id: string): Promise<IAreaConocimiento>;
};
