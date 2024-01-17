import type { ICreateParalelo } from "./ICreateParalelo";
import type { IParalelo } from "./IParalelo";

export type IParaleloRepository = {
	create(data: ICreateParalelo): Promise<IParalelo>;
	getAll(): Promise<IParalelo[]>;
	getById(id: string): Promise<IParalelo | null>;
	// update(params: IUpdateParaleloParams): Promise<IParalelo>;
	deleteById(id: string): Promise<IParalelo>;
};
