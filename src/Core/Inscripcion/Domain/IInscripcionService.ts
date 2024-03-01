import type { IInscripcion } from "./IInscripcion";
import type { ICreateInscripcion } from "./ICreateInscripcion";
import type { UpdateInscripcionParams } from "./IInscripcionRepository";

export type IInscripcionService = {
	createInscripcion(data: ICreateInscripcion): Promise<IInscripcion>;
	getAllInscripcions(): Promise<IInscripcion[]>;
	getInscripcionById(id: string): Promise<IInscripcion | null>;
	updateInscripcionById(params: UpdateInscripcionParams): Promise<IInscripcion>;
	// deleteInscripcionById(id: string): Promise<IInscripcion>;
};
