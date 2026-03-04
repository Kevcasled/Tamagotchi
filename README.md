# Gym Tamagotchi

Proyecto de la asignatura M12 - Diseño de Interfaces Web.

Tamagotchi temático de gimnasio desarrollado con React, Vite y Tailwind CSS v4.

## Tecnologías

- React 19
- Vite 7
- Tailwind CSS 4.1
- TypeScript

## Funcionalidades

- Tres estados del personaje: proteina, pesas y musculo, que decaen con el tiempo.
- Cuatro estados visuales: fuerte, normal, hambriento y débil, con imagen distinta para cada uno.
- Tres acciones de interacción: comer, entrenar y descansar.
- Barras de progreso con color dinámico segun el nivel (verde, amarillo, rojo).
- Animacion del personaje con CSS.

## Instalación

```bash
npm install
npm run dev
```

## Estructura

```
src/
  assets/          # Imagenes de los estados del personaje
  components/
    Tamagotchi.jsx # Componente principal
  App.tsx
  main.tsx
  style.css        # Tailwind CSS v4
```
