import { app } from "@azure/functions";

import { TipoDocumentoController } from "../../Core/TipoDocumento/Application/Controller";

const controller = new TipoDocumentoController();

app.get("tiposDocumentoGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.tiposDocumentoGetAll(req, ctx),
	route: "tipos-documento",
});

app.get("tiposDocumentoGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.tiposDocumentoGetById(req, ctx),
	route: "tipos-documento/{tipoDocumentoId}",
});

app.post("tiposDocumentoCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.tiposDocumentoCreate(req, ctx),
	route: "tipos-documento",
});

app.deleteRequest("tiposDocumentoDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.tiposDocumentoDeleteById(req, ctx),
	route: "tipos-documento/{tipoDocumentoId}",
});

app.patch("tiposDocumentoUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.tiposDocumentoUpdateById(req, ctx),
	route: "tipos-documento/{tipoDocumentoId}",
});