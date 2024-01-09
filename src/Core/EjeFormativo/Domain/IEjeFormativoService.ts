import type { IEjeFormativo } from "./IEjeFormativo";

export type IEjeFormativoService = {
	createEjeFormativo(data: any): Promise<IEjeFormativo>;
	getAllEjeFormativos(): Promise<IEjeFormativo[]>;
	getEjeFormativoById(id: string): Promise<IEjeFormativo | null>;
	updateEjeFormativoById(params: {
		id: string;
		ejeFormativo: any;
	}): Promise<IEjeFormativo>;
	deleteEjeFormativoById(id: string): Promise<IEjeFormativo>;
};
