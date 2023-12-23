import type { IInstitucion } from "./IInstitucion";

export interface IInstitucionService {
	createInstitucion(data: IInstitucion): Promise<IInstitucion>;
	getAllInstituciones(): Promise<IInstitucion[]>;
	getInstitucionById(id: string): Promise<IInstitucion | null>;
	updateInstitucionById(params: {
		id: string;
		institucion: any;
	}): Promise<IInstitucion>;
	deleteInstitucionById(id: string): Promise<IInstitucion>;
}
