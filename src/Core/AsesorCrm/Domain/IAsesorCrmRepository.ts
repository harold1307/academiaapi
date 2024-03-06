import type { IAsesorCrm } from "./IAsesorCrm";
import type { ICreateAsesorCrm } from "./ICreateAsesorCrm";
// import type { IUpdateAsesorCrm } from "./IUpdateAsesorCrm";

// export type UpdateAsesorCrmParams = {
// 	id: string;
// 	data: IUpdateAsesorCrm;
// }

export type IAsesorCrmRepository = {
	create(data: ICreateAsesorCrm): Promise<IAsesorCrm>;
	getAll(): Promise<IAsesorCrm[]>;
	getById(id: string): Promise<IAsesorCrm | null>;
	// update(params: UpdateAsesorCrmParams): Promise<IAsesorCrm>;
	deleteById(id: string): Promise<IAsesorCrm>;
};
