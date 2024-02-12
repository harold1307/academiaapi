import type { HttpResponseInit, InvocationContext } from "@azure/functions";

export class ErrorHandler {
	static handle({
		ctx,
		error,
	}: {
		ctx: InvocationContext;
		error: any;
	}): HttpResponseInit {
		if (error instanceof SyntaxError) {
			ctx.error(
				"Error de sintaxis, seguramente debido al procesar un tipo de body inesperado",
			);
			return {
				jsonBody: { message: "Body de peticion inesperado" },
				status: 400,
			};
		}

		if (error.name === "PrismaClientKnownRequestError") {
			ctx.error(error.message);

			return {
				jsonBody: { message: `Codigo de error ${error.code}` },
				status: 500,
			};
		}

		// todos los errores de servicios que se manejan en la aplicacion terminan con ServiceError
		if (String(error.name).includes("ServiceError")) {
			ctx.error(error.message);

			return {
				jsonBody: { message: error.message },
				status: 400,
			};
		}

		if (String(error.name).includes("DTOError")) {
			ctx.error(error.message);
			ctx.error(error.error.issues);

			return {
				jsonBody: { message: error.message },
				status: 400,
			};
		}

		ctx.error("Error desconocido");
		ctx.error(error.message);

		return {
			jsonBody: { message: "Se ha producido un error interno en el servidor" },
			status: 500,
		};
	}
}
