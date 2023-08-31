import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://feavfggordzbhzdeldgq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlYXZmZ2dvcmR6Ymh6ZGVsZGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyNDAyMzMsImV4cCI6MjAwODgxNjIzM30.PWSxZwG020JPYkGoIpRF-naBvP6Ks6ecgHuZQYRANbk"
const supabase = createClient(supabaseUrl, supabaseKey
    
    )

export const obtenerTrabajos = async (tabla) => {
    const { data, error } = await supabase
        .from(tabla)
        .select('*')
    if (error) return <div>error</div>
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


export const insertarTrabajo = async (tabla, datos) => {
    const { data, error } = await supabase
        .from(tabla)
        .insert(datos)
    if (error) return <div>error 
    {console.log(error)}

        
    </div>
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

