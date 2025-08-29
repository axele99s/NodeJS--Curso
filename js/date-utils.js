export function formatDate(date){
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fechaFormateada = new Date(date).toLocaleDateString('es-ES', options);
    return fechaFormateada;
}


export function formatDateTime(date){
    const options = { year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const fechaHoraFormateada = new Date(date).toLocaleDateString('es-ES', options).format(new Date(date));
  return fechaHoraFormateada;
}