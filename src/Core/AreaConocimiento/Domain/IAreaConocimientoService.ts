import type { IAreaConocimiento } from "./IAreaConocimiento";

export type IAreaConocimientoService = {
	createAreaConocimiento(data: any): Promise<IAreaConocimiento>;
	getAllAreaConocimientos(): Promise<IAreaConocimiento[]>;
	getAreaConocimientoById(id: string): Promise<IAreaConocimiento | null>;
};
