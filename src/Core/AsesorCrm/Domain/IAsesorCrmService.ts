import type { IAsesorCrm } from "./IAsesorCrm";
import type { ICreateAsesorCrm } from "./ICreateAsesorCrm";
// import type { UpdateAsesorCrmParams } from "./IAsesorCrmRepository";

export type IAsesorCrmService = {
	createAsesorCrm(data: ICreateAsesorCrm): Promise<IAsesorCrm>;
	getAllAsesorCrms(): Promise<IAsesorCrm[]>;
	getAsesorCrmById(id: string): Promise<IAsesorCrm | null>;
	// updateAsesorCrmById(params: UpdateAsesorCrmParams): Promise<IAsesorCrm>;
	deleteAsesorCrmById(id: string): Promise<IAsesorCrm>;
};
