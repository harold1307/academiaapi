import type { ICreateEjeFormativo } from "./ICreateEjeFormativo";
import type { IEjeFormativo } from "./IEjeFormativo";

export interface IEjeFormativoRepository {
	create(data: ICreateEjeFormativo): Promise<IEjeFormativo>;
	getAll(): Promise<IEjeFormativo[]>;
	getById(id: string): Promise<IEjeFormativo | null>;
	// update(params: {
	// 	id: string;
	// 	ejeFormativo: IUpdateEjeFormativo;
	// }): Promise<IEjeFormativo>;
	deleteById(id: string): Promise<IEjeFormativo>;
}
