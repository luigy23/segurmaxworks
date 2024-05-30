const { default: supabase } = require("../supabase");


export const obtenerProductos = async () => {
    const {data, error} = await supabase.from("Productos")
    .select('*')

    if (error) {
        throw error
    }
    return data
}

