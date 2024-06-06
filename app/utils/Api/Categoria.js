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