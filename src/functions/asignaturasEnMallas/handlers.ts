import { app } from "@azure/functions";

import { AsignaturaEnMallaController } from "../../Core/AsignaturaEnMalla/Application/Controller";

const controller = new AsignaturaEnMallaController();

app.get("asignaturasEnMallasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasEnMallasGetAll(req, ctx),
	route: "asignaturas-mallas",
});

app.get("asignaturasEnMallasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasEnMallasGetById(req, ctx),
	route: "asignaturas-mallas/{asignaturaEnMallaId}",
});

app.deleteRequest("asignaturasEnMallasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasEnMallasDeleteById(req, ctx),
	route: "asignaturas-mallas/{asignaturaEnMallaId}",
});

app.patch("asignaturasEnMallasUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasEnMallasUpdateById(req, ctx),
	route: "asignaturas-mallas/{asignaturaEnMallaId}",
});
