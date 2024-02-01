import type { ICreateParalelo } from "./ICreateParalelo";
import type { IParalelo } from "./IParalelo";
import type { IUpdateParalelo } from "./IUpdateParalelo";

export type UpdateParaleloParams = {
	id: string;
	data: IUpdateParalelo;
};

export type IParaleloRepository = {
	create(data: ICreateParalelo): Promise<IParalelo>;
	getAll(): Promise<IParalelo[]>;
	getById(id: string): Promise<IParalelo | null>;
	update(params: UpdateParaleloParams): Promise<IParalelo>;
	deleteById(id: string): Promise<IParalelo>;
};
