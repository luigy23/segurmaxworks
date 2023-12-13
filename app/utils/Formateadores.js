

export const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    //fecha en formato local
    const fechaLocal = date.toLocaleDateString()
    return fechaLocal

}
export const formatearHora = (hora) => {
    // Validar si la hora es null o no está definida
    if (!hora) {
        return 'Hora no definida'; // O devuelve una cadena vacía si prefieres: ''
    }
    // usamos una fecha arbitraria y reemplazamos la hora con la proporcionada.
    const fechaArbitraria = '1970-01-01';
    const fechaConHora = new Date(`${fechaArbitraria}T${hora}`);

    // Utilizamos toLocaleTimeString para formatear la hora
    // en el formato de 12 horas con AM/PM.
    return fechaConHora.toLocaleTimeString('es', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}


export const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio)
}
