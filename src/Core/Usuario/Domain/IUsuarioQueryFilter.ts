import type { EstadoAlumno, TipoUsuario } from "@prisma/client";

import type { NonNullableObject } from "../../../types";
import type { IUsuario } from "./IUsuario";

export type IUsuarioQueryFilter = Partial<
	NonNullableObject<
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
			| "tipo"
		> & {
			tipo: TipoUsuario[] | TipoUsuario;
			administrativo_estado: boolean;
			profesor_estado: boolean;
			alumno_estado: EstadoAlumno;
			fullTextSearch: string;

			grupoId: string;
			sedeId: string;
		}
	>
>;
