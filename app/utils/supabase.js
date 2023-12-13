import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fydlptytoyvcybdtonjn.supabase.co'
const anonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5ZGxwdHl0b3l2Y3liZHRvbmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNjUxNzIsImV4cCI6MjAxNjk0MTE3Mn0.1O5h_qN_ggN_K_dFc7gIZLckPUPP3fHFh2eIDzSqt0E'
const supabase = createClient(supabaseUrl, anonkey
    
    )

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

// Datos de Trabajos
//     <TableRow key={index}>
//     <TableCell>{item.id}</TableCell>
//     <TableCell>{item.Descripcion}</TableCell>
//     <TableCell>{item.Trabajador}</TableCell>
//     <TableCell>{item.Fecha}</TableCell>
//     <TableCell>{item.Precio}</TableCell>
//   </TableRow>


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


//Actualizar trabajo (no es necesario que estén todos los campos)
export const actualizarTrabajo = async (id, datos) =>{
    const {data, error} = await supabase
    .from('Trabajos')
    .update(datos)
    .eq('id', id)
    if (error) return <div>error</div>
    console.log(data)
    return data

}

