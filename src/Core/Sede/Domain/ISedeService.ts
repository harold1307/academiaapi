import type { UpdateSedeParams } from "./ISedeRepository";
import type { ISede } from "./ISede";

export interface ISedeService {
	createSede(data: any): Promise<ISede>;
	getAllSedes(): Promise<ISede[]>;
	getSedeById(id: string): Promise<ISede | null>;
	updateSedeById(params: UpdateSedeParams): Promise<ISede>;
	deleteSedeById(id: string): Promise<ISede>;
}
