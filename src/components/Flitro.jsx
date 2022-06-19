const Filtro = ({ filtro, setFiltro }) => {
  return (
    <div className='filtros sombra contenedor'>
      <form>
        <div className='campo'>
          <label htmlFor='filtro'>Filtrar gastos</label>
          <select
            name='filtro'
            id='filtro'
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          >
            <option value='' disabled>-- Seleccione --</option>
            <option value=''>Todos</option>
            <option value='ahorro'>Ahorro</option>
            <option value='alimentos'>Alimentos</option>
            <option value='hogar'>Hogar</option>
            <option value='varios'>Gastos varios</option>
            <option value='osio'>Osio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filtro
