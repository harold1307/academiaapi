import type { IInstitucion } from "./IInstitucion";

export interface IInstitucionService {
	createInstitucion(data: IInstitucion): Promise<IInstitucion>;
	getAllInstituciones(): Promise<IInstitucion[]>;
	getInstitucionById(id: string): Promise<IInstitucion | null>;
}
