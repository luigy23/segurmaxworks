const { default: supabase } = require("../supabase");



export const obtenerMovimientos = async () => {
    const { data, error } = await supabase
        .from("Movimientos")
        .select('*')
        .order('id', { ascending: false })
        .limit(10)
        
    if (error){ 
        throw error
    }
    return data
}