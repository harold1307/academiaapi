import type { IEjeFormativo } from "./IEjeFormativo";
import type { UpdateEjeFormativoParams } from "./IEjeFormativoRepository";

export type IEjeFormativoService = {
	createEjeFormativo(data: any): Promise<IEjeFormativo>;
	getAllEjeFormativos(): Promise<IEjeFormativo[]>;
	getEjeFormativoById(id: string): Promise<IEjeFormativo | null>;
	updateEjeFormativoById(
		params: UpdateEjeFormativoParams,
	): Promise<IEjeFormativo>;
	deleteEjeFormativoById(id: string): Promise<IEjeFormativo>;
};
