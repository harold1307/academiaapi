import { app } from "@azure/functions";

import { ModalidadController } from "../../Core/Modalidad/Application/Controller";

const controller = new ModalidadController();

app.get("modalidadesGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modalidadesGetAll(req, ctx),
	route: "modalidades",
});

app.get("modalidadesGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modalidadesGetById(req, ctx),
	route: "modalidades/{id}",
});

app.post("modalidadesCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modalidadesCreate(req, ctx),
	route: "modalidades",
});

app.deleteRequest("modalidadesDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modalidadesDeleteById(req, ctx),
	route: "modalidades/{id}",
});

app.patch("modalidadesUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modalidadesUpdateById(req, ctx),
	route: "modalidades/{id}",
});
