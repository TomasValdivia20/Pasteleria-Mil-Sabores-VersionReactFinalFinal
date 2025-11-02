// src/assets/data/dataLoader.js

export async function fetchData(fileName) {
  try {
    const response = await fetch(`/data/${fileName}.json`);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${fileName}.json`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al cargar datos:", error);
    return [];
  }
}

export async function cargarCategorias() {
  return await fetchData("categorias");
}

export async function cargarProductos() {
  return await fetchData("productos");
}
