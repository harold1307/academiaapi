import type { ICreateResponsableEnAsesorEstudiante } from "./ICreateResponsableEnAsesorEstudiante";
import type { IResponsableEnAsesorEstudiante } from "./IResponsableEnAsesorEstudiante";

// export type UpdateResponsableEnAsesorEstudianteParams = {
// 	id: string;
// 	data: IUpdateResponsableEnAsesorEstudiante;
// }

export type IResponsableEnAsesorEstudianteRepository = {
	create(
		data: ICreateResponsableEnAsesorEstudiante,
	): Promise<IResponsableEnAsesorEstudiante>;
	// getAll(): Promise<IResponsableEnAsesorEstudiante[]>;
	getById(id: string): Promise<IResponsableEnAsesorEstudiante | null>;
	// update(params: UpdateResponsableEnAsesorEstudianteParams): Promise<IResponsableEnAsesorEstudiante>;
	deleteById(id: string): Promise<IResponsableEnAsesorEstudiante>;
};
