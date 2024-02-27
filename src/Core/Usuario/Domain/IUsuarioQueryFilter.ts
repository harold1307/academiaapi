import type { EstadoAlumno } from "@prisma/client";

import type { IUsuario } from "./IUsuario";

export type IUsuarioQueryFilter = Partial<
	Omit<
		IUsuario,
		| "administrativo"
		| "profesor"
		| "alumno"
		| "grupos"
		| "estado"
		| "id"
		| "createdAt"
		| "updatedAt"
	> & {
		administrativo_estado: boolean;
		profesor_estado: boolean;
		alumno_estado: EstadoAlumno;

		grupoId: string;
		sedeId: string;
	}
>;
