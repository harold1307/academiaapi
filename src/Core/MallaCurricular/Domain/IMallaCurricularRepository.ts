import type { ICreateMallaCurricularOutput } from "../Infraestructure/DTOs/CreateMallaCurricularDTO";
import type { IUpdateMallaCurricularOutput } from "../Infraestructure/DTOs/UpdateMallaCurricularDTO";
import type { IMallaCurricular } from "./IMallaCurricular";

export interface IMallaCurricularRepository {
	create(data: ICreateMallaCurricularOutput): Promise<IMallaCurricular>;
	getAll(): Promise<IMallaCurricular[]>;
	getById(id: string): Promise<IMallaCurricular | null>;
	update(params: {
		id: string;
		mallaCurricular: IUpdateMallaCurricularOutput;
	}): Promise<IMallaCurricular>;
	deleteById(id: string): Promise<IMallaCurricular>;
}
