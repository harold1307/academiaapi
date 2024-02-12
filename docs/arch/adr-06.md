# ADR 6: Zod como schema validator

2024

## Contexto

Aunque TypeScript ofrece un sistema de tipos robusto, su naturaleza de tipo seguro se limita al tiempo de compilación y no se extiende al tiempo de ejecución. Esta limitación es particularmente relevante en el contexto de una API que maneja solicitudes con cuerpos (body). En este escenario, la necesidad de garantizar la validez de los datos en tiempo de ejecución se hace evidente. Por lo tanto, se requiere la implementación de un validador en tiempo de ejecución para asegurar la integridad y la conformidad de los datos que se reciben a través de la API.

## Decision

Adoptar Zod como schema validator.

## Estado

Aceptado

## Consecuencias

La incorporación de Zod en el desarrollo tiene como consecuencia una mejora significativa en la validación y garantía de la integridad de los datos en aplicaciones TypeScript. Zod, una librería de validación de esquemas, proporciona una capa adicional de seguridad al permitir la definición de estructuras de datos con tipos precisos y reglas de validación. Al emplear Zod, se logra una mayor type-safety durante el tiempo de compilación, lo que ayuda a prevenir errores comunes relacionados con la manipulación de datos. Además, Zod facilita la implementación de validaciones en tiempo de ejecución, asegurando que los datos recibidos, especialmente aquellos provenientes de solicitudes API, cumplan con los requisitos definidos en el esquema. Esto se traduce en un código más robusto, mantenible y resistente a errores en aplicaciones TypeScript.
