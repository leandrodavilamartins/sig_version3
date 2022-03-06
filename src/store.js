import { writable } from "svelte/store";

const produto = writable([
    { nome: "Milho", preço: 98.0 },
    { nome: "Soja", preço: 150.0 },
    { nome: "Trigo", preço: 70.0 },
  ]);

export {produto}