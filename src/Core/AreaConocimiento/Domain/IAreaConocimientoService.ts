import type { IAreaConocimiento } from "./IAreaConocimiento";

export type IAreaConocimientoService = {
	createAreaConocimiento(data: any): Promise<IAreaConocimiento>;
	getAllAreaConocimientos(): Promise<IAreaConocimiento[]>;
	getAreaConocimientoById(id: string): Promise<IAreaConocimiento | null>;
	updateAreaConocimientoById(params: {
		id: string;
		data: unknown;
	}): Promise<IAreaConocimiento>;
	deleteAreaConocimientoById(id: string): Promise<IAreaConocimiento>;
};
