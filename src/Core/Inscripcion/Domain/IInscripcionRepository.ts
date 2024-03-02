import type { IInscripcion } from "./IInscripcion";
import type { ICreateInscripcion } from "./ICreateInscripcion";
import type { IUpdateInscripcion } from "./IUpdateInscripcion";

export type UpdateInscripcionParams = {
	id: string;
	data: IUpdateInscripcion;
};

export type IInscripcionRepository = {
	create(data: ICreateInscripcion): Promise<IInscripcion>;
	getAll(): Promise<IInscripcion[]>;
	getById(id: string): Promise<IInscripcion | null>;
	update(params: UpdateInscripcionParams): Promise<IInscripcion>;
	deleteById(id: string): Promise<IInscripcion>;
};
