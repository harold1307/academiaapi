import {
	app,
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { VarianteCursoService } from "../../Core/VarianteCurso/Application/Service";
import type { ICreateVarianteCurso } from "../../Core/VarianteCurso/Domain/ICreateVarianteCurso";
import type { ZodInferSchema } from "../../types";

const bodySchema = z
	.object<ZodInferSchema<ICreateVarianteCurso>>({
		nombre: z.string(),
		codigoBase: z.string(),
		descripcion: z.string(),
		registroExterno: z.boolean(),
		registroInterno: z.boolean(),
		verificarSesion: z.boolean(),
		verificarEdad: z.boolean(),
		edadMinima: z.number().nullable(),
		edadMaxima: z.number().nullable(),
		fechaAprobacion: z.string().datetime(),
		registroDesdeOtraSede: z.boolean(),
		costoPorMateria: z.boolean(),
		cumpleRequisitosMalla: z.boolean(),
		pasarRecord: z.boolean(),
		aprobarCursoPrevio: z.boolean(),
	})
	.superRefine(({ verificarEdad, edadMaxima, edadMinima }, ctx) => {
		if (!verificarEdad && (edadMaxima !== null || edadMinima !== null)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Si no verificar edad, no debe haber edad maxima ni minima.",
			});

			return;
		}

		if (verificarEdad && (edadMaxima === null || edadMinima === null)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Si verificar edad, edad maxima y minima deben ser numeros.",
			});

			return;
		}

		if (
			verificarEdad &&
			edadMaxima !== null &&
			edadMinima !== null &&
			edadMaxima < edadMinima
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Si verificar edad, la edad maxima debe ser mayor.",
			});
		}
	});

export async function createVarianteCurso(
	req: HttpRequest,
	ctx: InvocationContext,
): Promise<HttpResponseInit> {
	try {
		ctx.log(`Http function processed request for url "${req.url}"`);
		const body = await req.json();

		const bodyVal = bodySchema.safeParse(body);
		const cursoId = req.params.cursoId;

		if (!bodyVal.success || !cursoId) {
			if (!bodyVal.success) {
				console.error(JSON.stringify(bodyVal.error, null, 2));
			}
			return {
				jsonBody: {
					message: "Peticion invalida",
				},
				status: 400,
			};
		}

		const { data } = bodyVal;

		if (
			!data.verificarEdad &&
			(data.edadMaxima !== null || data.edadMinima !== null)
		) {
			return {
				jsonBody: {
					message: "Peticion invalida",
				},
				status: 400,
			};
		}

		if (
			data.verificarEdad &&
			(data.edadMaxima === null || data.edadMinima === null)
		) {
			return {
				jsonBody: {
					message: "Peticion invalida",
				},
				status: 400,
			};
		}

		const _varianteCursoService = StartupBuilder.resolve(VarianteCursoService);

		const varianteCurso = await _varianteCursoService.createVarianteCurso({
			cursoId,
			data,
		});

		ctx.log({ varianteCurso });

		return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
	} catch (error) {
		ctx.error(error);

		if (error instanceof SyntaxError) {
			return { body: "Peticion invalida.", status: 400 };
		}

		return { body: "Error", status: 500 };
	}
}

app.http("createVarianteCurso", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: createVarianteCurso,
	route: "cursos/{cursoId}/variantes",
});
