const { default: supabase } = require("../supabase");


// create table
//   public."Movimientos" (
//     id bigint generated by default as identity,
//     created_at timestamp with time zone not null default now(),
//     "Valor" bigint not null,
//     "Tipo" text null,
//     "Descripcion" text null,
//     "Categoria" text null,

//     constraint Movimientos_pkey primary key (id)
//   ) tablespace pg_default;

export const insertarMovimiento = async (movimiento) => {
    const { data, error } = await supabase
        .from('Movimientos')
        .insert([
            movimiento
        ])
    if (error){ 
        throw error
    }
    return data
}


export const obtenerMovimientos = async () => {
    const { data, error } = await supabase
        .from("Movimientos")
        .select('*')
        .order('Date', { ascending: false })
        .limit(10)
        
    if (error){ 
        throw error
    }
    return data
}

export const obtenerMovimientosPorId = async (id) => {
    const { data, error } = await supabase
        .from("Movimientos")
        .select('*')
        .eq('id', id)
        .single()
        
    if (error){ 
        throw error
    }
    return data
}


//movimientos con un rango de fechas
export const obtenerMovimientosPorFecha = async (desde, hasta) => { //parametros tipo string en el formato 'YYYY-MM-DD'
    const { data, error } = await supabase
        .from("Movimientos")
        .select('*')
        .gte('Date', desde)
        .lte('Date', hasta)
        
    if (error){ 
        throw error
    }
    return data
}

//movimientos por busqueda de texto
export const obtenerMovimientosPorTexto = async (texto) => {
    const { data, error } = await supabase
        .from("Movimientos")
        .select('*')
        .ilike('Descripcion', `%${texto}%`)
        
    if (error){ 
        throw error
    }
    return data
}

export const crearMovimiento = async (movimiento) => {
    const { data, error } = await supabase
        .from('Movimientos')
        .insert([
            movimiento
        ])
    if (error){ 
        console.log(error)
        throw error
    }
    return data
}




export const actualizarMovimiento = async (id, movimiento) => {
    const { data, error } = await supabase
        .from('Movimientos')
        .update(movimiento)
        .eq('id', id)
    if (error){ 
        throw error
    }
    return data
}

export const eliminarMovimiento = async (id) => {
    const { data, error } = await supabase
        .from('Movimientos')
        .delete()
        .eq('id', id)
    if (error){ 
        throw error
    }
    return data
}

