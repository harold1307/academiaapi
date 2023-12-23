import type { ICreateInstitucion } from "../Infraestructure/DTOs/CreateInstitucionDTO";
import type { IUpdateInstitucion } from "../Infraestructure/DTOs/UpdateInstitucionDTO";
import type { IInstitucion } from "./IInstitucion";

export interface IInstitucionRepository {
	create(data: ICreateInstitucion): Promise<IInstitucion>;
	getAll(): Promise<IInstitucion[]>;
	getById(id: string): Promise<IInstitucion | null>;
	update(params: {
		id: string;
		institucion: IUpdateInstitucion;
	}): Promise<IInstitucion>;
	deleteById(id: string): Promise<IInstitucion>;
}
