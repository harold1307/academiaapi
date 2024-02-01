import type { ICreateParalelo } from "./ICreateParalelo";
import type { IParalelo } from "./IParalelo";
import type { UpdateParaleloParams } from "./IParaleloRepository";

export type IParaleloService = {
	createParalelo(data: ICreateParalelo): Promise<IParalelo>;
	getAllParalelos(): Promise<IParalelo[]>;
	getParaleloById(id: string): Promise<IParalelo | null>;
	updateParaleloById(params: UpdateParaleloParams): Promise<IParalelo>;
	deleteParaleloById(id: string): Promise<IParalelo>;
};
