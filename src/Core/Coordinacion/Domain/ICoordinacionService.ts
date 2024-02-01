import type { ICoordinacion } from "./ICoordinacion"
import type { ICreateCoordinacion } from "./ICreateCoordinacion"
import type { UpdateCoordinacionParams } from "./ICoordinacionRepository";

export type ICoordinacionService = {
  createCoordinacion(data: ICreateCoordinacion): Promise<ICoordinacion>;
	getAllCoordinacions(): Promise<ICoordinacion[]>;
	getCoordinacionById(id: string): Promise<ICoordinacion | null>;
	updateCoordinacionById(params: UpdateCoordinacionParams): Promise<ICoordinacion>;
	deleteCoordinacionById(id: string): Promise<ICoordinacion>;
}