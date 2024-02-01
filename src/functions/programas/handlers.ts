import { app } from "@azure/functions";

import { ProgramaController } from "../../Core/Programa/Application/Controller";

const controller = new ProgramaController();

app.get("programasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasGetAll(req, ctx),
	route: "programas",
});

app.get("programasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasGetById(req, ctx),
	route: "programas/{programaId}",
});

app.deleteRequest("programasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasDeleteById(req, ctx),
	route: "programas/{programaId}",
});

app.patch("programasUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasUpdateById(req, ctx),
	route: "programas/{programaId}",
});

// tipos documento
app.post("programasCreateTipoDocumento", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasCreateTipoDocumento(req, ctx),
	route: "programas/{programaId}/tipos-documento/{tipoDocumentoId}",
});

// titulos obtenidos
app.post("programasCreateTituloObtenido", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasCreateTituloObtenido(req, ctx),
	route: "programas/{programaId}/titulos-obtenidos",
});
