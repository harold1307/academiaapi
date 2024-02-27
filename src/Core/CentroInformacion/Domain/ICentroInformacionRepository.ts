import type { ICentroInformacion } from "./ICentroInformacion";
import type { ICreateCentroInformacion } from "./ICreateCentroInformacion";
import type { IUpdateCentroInformacion } from "./IUpdateCentroInformacion";

export type UpdateCentroInformacionParams = {
	id: string;
	data: IUpdateCentroInformacion;
};

export type ICentroInformacionRepository = {
	create(data: ICreateCentroInformacion): Promise<ICentroInformacion>;
	getAll(): Promise<ICentroInformacion[]>;
	getById(id: string): Promise<ICentroInformacion | null>;
	update(params: UpdateCentroInformacionParams): Promise<ICentroInformacion>;
	deleteById(id: string): Promise<ICentroInformacion>;
};
