
async function fetchData(fileName) {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/${fileName}.json`);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${fileName}.json`);
    }
    return await response.json(); 
  } catch (error) {
    console.error("Error al cargar datos:", error);
    return [];
  }
}

export const cargarCategorias = async () => {
  return fetchData("categorias"); 
};

export const cargarProductos = async () => {
  return fetchData("productos"); 
};
