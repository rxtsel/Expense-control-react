import { useState, useEffect } from 'react'
import btnCerrar from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')

  const handleBtnCerrar = () => {
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios')
      setTimeout(() => {
        setMensaje('')
      }, 3000)
      return
    }

    guardarGasto({ nombre, cantidad, categoria, id, fecha })
  }

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleBtnCerrar()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div className='modal'>
      <div className='cerrar-modal' onClick={handleBtnCerrar}>
        <img src={btnCerrar} alt='puede ser un boton para cerrar la ventana modal' />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{!Object.keys(gastoEditar).length > 0 ? 'Nuevo Gasto' : 'Editar Gasto'}</legend>

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

        <div className='campo'>
          <label htmlFor='nombre'>Nombre Gasto</label>
          <input
            id='nombre'
            type='text'
            placeholder='Ej. Transporte'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
            id='cantidad'
            type='number'
            placeholder='Cantidad del gasto'
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value.replace(/[^0-9]/g, '')))}
          />
        </div>
        <div className='campo'>
          <label htmlFor='categoria'>Categoria</label>
          <select
            name='categoria'
            id='categoria'
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value='' disabled>-- Seleccione --</option>
            <option value='ahorro'>Ahorro</option>
            <option value='alimentos'>Alimentos</option>
            <option value='hogar'>Hogar</option>
            <option value='varios'>Gastos varios</option>
            <option value='osio'>Osio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input
          type='submit'
          value={!Object.keys(gastoEditar).length > 0 ? 'Añadir' : 'Guardar'}
        />
      </form>
    </div>
  )
}

export default Modal
