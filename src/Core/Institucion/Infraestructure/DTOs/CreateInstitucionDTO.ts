import { $Enums } from "@prisma/client";
import { z } from "zod";

import type { IInstitucion } from "../../Domain/IInstitucion";

export type ICreateInstitucion = Omit<IInstitucion, "id" | "createdAt">;

const schema: z.ZodType<ICreateInstitucion> = z.object({
	nombre: z.string(),
	tipo: z.nativeEnum($Enums.TipoInstitucion),
	pais: z.string(),
	provincia: z.string(),
	canton: z.string(),
	codigo: z.string(),
});

export class CreateInstitucionDTO {
	private nombre: string;
	private tipo: $Enums.TipoInstitucion;
	private pais: string;
	private provincia: string;
	private canton: string;
	private codigo: string;
	constructor({
		nombre,
		tipo,
		pais,
		provincia,
		canton,
		codigo,
	}: ICreateInstitucion) {
		this.nombre = nombre;
		this.tipo = tipo;
		this.pais = pais;
		this.provincia = provincia;
		this.canton = canton;
		this.codigo = codigo;
	}

	validate() {
		return schema.safeParse(Object.fromEntries(Object.entries(this)));
	}
}
