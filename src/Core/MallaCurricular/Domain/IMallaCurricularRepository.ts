import type { IUpdateMallaCurricular } from "../Domain/IUpdateMallaCurricular";
import type { ICreateMallaCurricular } from "./ICreateMallaCurricular";
import type { IMallaCurricular } from "./IMallaCurricular";

export type UpdateMallaCurricularParams = {
	id: string;
	data: IUpdateMallaCurricular;
};

export interface IMallaCurricularRepository {
	create(data: ICreateMallaCurricular): Promise<IMallaCurricular>;
	getAll(): Promise<IMallaCurricular[]>;
	getById(id: string): Promise<IMallaCurricular | null>;
	update(params: UpdateMallaCurricularParams): Promise<IMallaCurricular>;
	deleteById(id: string): Promise<IMallaCurricular>;
}
