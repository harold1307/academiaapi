import type { ICreateResponsableAsesorEstudiante } from "./ICreateResponsableAsesorEstudiante";
import type { IResponsableAsesorEstudiante } from "./IResponsableAsesorEstudiante";
import type { IResponsableAsesorEstudianteWithAsesores } from "./IResponsableAsesorEstudianteWithAsesores";
// import type { IUpdateResponsableAsesorEstudiante } from "./IUpdateResponsableAsesorEstudiante";

// export type UpdateResponsableAsesorEstudianteParams = {
// 	id: string;
// 	data: IUpdateResponsableAsesorEstudiante;
// }

export type IResponsableAsesorEstudianteRepository = {
	create(
		data: ICreateResponsableAsesorEstudiante,
	): Promise<IResponsableAsesorEstudiante>;
	getAll(): Promise<IResponsableAsesorEstudiante[]>;
	getById(id: string): Promise<IResponsableAsesorEstudiante | null>;
	// update(params: UpdateResponsableAsesorEstudianteParams): Promise<IResponsableAsesorEstudiante>;
	deleteById(id: string): Promise<IResponsableAsesorEstudiante>;

	getByIdWithAsesores(
		id: string,
	): Promise<IResponsableAsesorEstudianteWithAsesores | null>;
};
