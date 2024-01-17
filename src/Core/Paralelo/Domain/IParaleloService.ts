import type { ICreateParalelo } from "./ICreateParalelo";
import type { IParalelo } from "./IParalelo";

export type IParaleloService = {
	createParalelo(data: ICreateParalelo): Promise<IParalelo>;
	getAllParalelos(): Promise<IParalelo[]>;
	getParaleloById(id: string): Promise<IParalelo | null>;
	// updateParaleloById(params: IUpdateParaleloParams): Promise<IParalelo>;
	deleteParaleloById(id: string): Promise<IParalelo>;
};
