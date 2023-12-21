import type { ICreateInstitucion } from "../Infraestructure/DTOs/CreateInstitucionDTO";
import type { IInstitucion } from "./IInstitucion";

export interface IInstitucionRepository {
	create(data: ICreateInstitucion): Promise<IInstitucion>;
	getAll(): Promise<IInstitucion[]>;
}
