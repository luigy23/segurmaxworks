const { default: supabase } = require("../supabase");



//obtenemos el saldo de la tabla Caja, el ultimo registro
export const obtenerSaldo = async () => {
    const { data, error } = await supabase
        .from("Caja")
        .select('Saldo')
        .order('id', { ascending: false })
        .limit(1)
        
    if (error){ 
        throw error
    }
    return data
}


export const agregarRegistro = async (saldo) => {
    const { data, error } = await supabase
        .from("Caja")
        .insert([{ Saldo: saldo }]);

    if (error) {
        throw error;
    }
    return data;
};
