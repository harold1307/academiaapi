import type { IMallaCurricular } from "./IMallaCurricular";

export interface IMallaCurricularService {
	createMallaCurricular(data: any): Promise<IMallaCurricular>;
	getAllMallasCurriculares(): Promise<IMallaCurricular[]>;
	getMallaCurricularById(id: string): Promise<IMallaCurricular | null>;
	updateMallaCurricularById(params: {
		id: string;
		mallaCurricular: any;
	}): Promise<IMallaCurricular>;
	deleteMallaCurricularById(id: string): Promise<IMallaCurricular>;
}
