const { default: supabase } = require("../supabase");

export const obtenerCategorias = async () => {
    const { data, error } = await supabase
        .from("Categorias")
        .select('*')
        
        
    if (error){ 
        throw error
    }
    console.log(data)
    return data
}



  export const crearCategoria = async (categoria) => {
    const { data, error } = await supabase
      .from('Categorias')
      .insert(categoria);
    if (error) {
        throw error
    }
    return data;
  };
  
  export const actualizarCategoria = async (id, categoria) => {
    const { data, error } = await supabase
      .from('Categorias')
      .update(categoria)
      .eq('id', id);
    if (error) {
      console.error('Error actualizando categoría:', error);
        throw error

    }
    return data;
  };
  
  export const eliminarCategoria = async (id) => {
    const { data, error } = await supabase
      .from('Categorias')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error eliminando categoría:', error);
      throw error;
    }
    return data;
  };