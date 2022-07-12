import { useState } from 'react'
import Mensaje from './Mensaje'
const NewPresupuest = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [mensaje, setMensaje] = useState('')
  const handlePresupuesto = (e) => {
    e.preventDefault()
    if (!presupuesto || presupuesto < 0) {
      setMensaje('No es un presupuesto válido')
      return
    }
    setMensaje('')
    setIsValidPresupuesto(true)
  }
  return (
    <section className='contenedor contenedor-presupuesto sombra'>
      <form
        className='formulario'
        onSubmit={handlePresupuesto}
      >
        <div className='campo'>
          <label htmlFor='presupuesto'>Definir presupuesto</label>
          <input
            type='number'
            id='presupuesto'
            className='nuevo-presupuesto'
            placeholder='Añade tu presupuesto'
            value={presupuesto || ''}
            onChange={e => setPresupuesto(parseInt(e.target.value.replace(/[^0-9]/g, '')))}
          />
        </div>
        <input type='submit' value='Añadir' />
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </section>
  )
}

export default NewPresupuest
