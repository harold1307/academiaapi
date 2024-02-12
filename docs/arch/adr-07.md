# ADR 6: Uso de Inversify

2024

## Contexto

La práctica de desarrollo basada en Domain-Driven Design (DDD) ofrece código modular y fácilmente mantenible. Sin embargo, a menudo no facilita la inyección de dependencias para realizar pruebas, lo que puede complicar el proceso. Además, es esencial restringir la creación de código modular a un único objeto para mantener la coherencia y la eficacia del diseño.

## Decision

Adoptar Inversify como Inversion de Control([IoC](https://es.wikipedia.org/wiki/Inversi%C3%B3n_de_control))

## Estado

Aceptado

## Consecuencias

Inversify facilita la organización y gestión de dependencias específicas del dominio, centraliza la configuración, mejora la testabilidad al permitir la sustitución de implementaciones durante las pruebas y ofrece opciones para gestionar ciclos de vida de dependencias. En conjunto, la utilización de Inversify optimiza la flexibilidad, mantenibilidad y escalabilidad de aplicaciones desarrolladas bajo los principios de DDD.
