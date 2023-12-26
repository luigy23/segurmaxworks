import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fydlptytoyvcybdtonjn.supabase.co'
const anonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5ZGxwdHl0b3l2Y3liZHRvbmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNjUxNzIsImV4cCI6MjAxNjk0MTE3Mn0.1O5h_qN_ggN_K_dFc7gIZLckPUPP3fHFh2eIDzSqt0E'
const supabase = createClient(supabaseUrl, anonkey)
//exportamos la variable supabase para poder usarla en otros archivos
export default supabase


export const obtenerTrabajos = async () => {
    const { data, error } = await supabase
        .from("Trabajos")
        .select('*')
        
    if (error){ 
        throw error
    }
    console.log(data)
    return data
}
export const insertarTrabajo = async (datos) => {
    console.log(datos)
    const { data, error } = await supabase
        .from("Trabajos")
        .insert(datos)
    if (error) {
        console.log(error)
        throw error
    }


        

    console.log(data)
    return data
}

export const obtenerTrabajo = async (id) =>{
    const {data, error} = await supabase
    .from('Trabajos')
    .select('*')
    .eq('id', id)
    if (error) return <div>error</div>
    console.log(data)
    return data

}

export const obtenerTrabajosPorFecha = async (fecha) => {
    // Asegurarse de que la fecha esté en el formato correcto (YYYY-MM-DD)
    const fechaFormateada = new Date(fecha).toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('Trabajos')
        .select('*')
        .eq('Fecha', fechaFormateada);

    if (error) {
        console.error(error);
        return <div>Error al obtener los trabajos para la fecha: {fechaFormateada}</div>;
    }

    console.log(data);
    return data;
}
export const actualizarTrabajo = async (id, datos) =>{
    const {data, error} = await supabase
    .from('Trabajos')
    .update(datos)
    .eq('id', id)
    if (error) return <div>error</div>
    console.log(data)
    return data

}

export const eliminarTrabajo = async (id) =>{
    const {data, error} = await supabase
    .from('Trabajos')
    .delete()
    .eq('id', id)
    if (error) return <div>error</div>
    console.log(data)
    return data

}

//Trabajadores
export const obtenerTrabajadores = async () => {
    const { data, error } = await supabase
        .from("Trabajadores")
        .select('*')
        
    if (error){ 
        throw error
    }
    return data
}

export const obtenerTrabajador = async (id) =>{
    const {data, error} = await supabase
    .from('Trabajadores')
    .select('*')
    .eq('id', id)
    if (error) return <div>error</div>
    console.log(data)
    return data

}

export const insertarTrabajador = async (datos) => {
    console.log(datos)
    const { data, error } = await supabase
        .from("Trabajadores")
        .insert(datos)
        
    if (error) {
        console.log(error)
        throw error
    
    }
    
    return data
}

export const eliminarTrabajador = async (nombre) =>{
    const {data, error} = await supabase
    .from('Trabajadores')
    .delete()
    .eq('nombre', nombre)
    if (error) throw error;
    console.log(data)
    return data

}

//la tabla trabajadores solo tendrá un campo, el nombre que tambien actuará como id
//entonces la funcion actualizarTrabajador solo actualizará el nombre
export const actualizarTrabajador = async (nombre, datos) =>{
    const {data, error} = await supabase
    .from('Trabajadores')
    .update(datos)
    .eq('Nombre', nombre)
    if (error) throw error;
    console.log(data)
    return data

}


//facturación
