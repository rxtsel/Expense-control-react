import { useState, useEffect } from 'react'
import Filtro from './components/Flitro'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { genId } from './helpers'
import iconoNuevoGasto from './img/nuevo-gasto.svg'

const App = () => {
  // localStorage
  const presupuestoLS = window.localStorage.getItem('presupuesto')
  const getPresupuesto = Number(presupuestoLS) ?? 0
  const gastosLS = window.localStorage.getItem('gastos')
  const getGastos = gastosLS ? JSON.parse(gastosLS) : []
  // state
  const [presupuesto, setPresupuesto] = useState(getPresupuesto)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(getGastos)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  const openAnimation = () => {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 200)
  }

  const closeAnimation = () => {
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleNuevoGasto = () => {
    openAnimation()
    setGastoEditar({})
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      // actualizar gasto
      const gastoActualizado = gastos.map(gastosState => (
        gastosState.id === gasto.id ? gasto : gastosState
      ))
      setGastos(gastoActualizado)
      setGastoEditar({})
    } else {
      // agregar gasto
      gasto.id = genId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    closeAnimation()
  }

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      openAnimation()
    }
  }, [gastoEditar])

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  // localStorage
  useEffect(() => {
    window.localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    window.localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(window.localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  // filtro
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={iconoNuevoGasto}
              alt='puede ser una icono de un icono más para agregar más gastos'
              onClick={handleNuevoGasto}
            />
          </div>

        </>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}

    </div>
  )
}

export default App
