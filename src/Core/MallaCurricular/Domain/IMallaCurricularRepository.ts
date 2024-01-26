import type { IUpdateMallaCurricular } from "../Domain/IUpdateMallaCurricular";
import type { ICreateMallaCurricular } from "./ICreateMallaCurricular";
import type { IMallaCurricular } from "./IMallaCurricular";

export type IUpdateMallaCurricularParams = {
	id: string;
	data: IUpdateMallaCurricular;
};

export interface IMallaCurricularRepository {
	create(data: ICreateMallaCurricular): Promise<IMallaCurricular>;
	getAll(): Promise<IMallaCurricular[]>;
	getById(id: string): Promise<IMallaCurricular | null>;
	update(params: IUpdateMallaCurricularParams): Promise<IMallaCurricular>;
	deleteById(id: string): Promise<IMallaCurricular>;
}
