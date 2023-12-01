

export const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    //fecha y hora en formato local sin segundos
    const fechaLocal = date.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short', hour12: true })
    return fechaLocal

}

export const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio)
}
