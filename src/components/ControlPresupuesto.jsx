import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setIsValidPresupuesto
}) => {
  const [disponible, setDisponible] = useState(0)
  const [restante, setRestante] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  const formatPresupuesto = cantidad => {
    return cantidad.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
  }

  useEffect(() => {
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
    const totalDisponible = presupuesto - totalGastos
    setRestante(totalGastos)
    setDisponible(totalDisponible)
    // calc porcentaje
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1500)
  }, [gastos])

  const handleResetApp = () => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar todos los gastos?')
    if (confirmacion) {
      setGastos([])
      setPresupuesto()
      setIsValidPresupuesto(false)
    }
  }
  return (
    <section className='contenedor contenedor-presupuesto sombra dos-columnas'>
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 60 ? '#f44336' : '#38bdf8',
            trailColor: '#cbd5e1',
            textSize: '20px',
            textColor: porcentaje > 60 ? '#f44336' : '#38bdf8'
          })}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button
          className='reset-app'
          type='button'
          onClick={handleResetApp}
        >
          Resetear app
        </button>
        <p> <span>Presupuesto:</span> {formatPresupuesto(presupuesto)}</p>
        <p
          className={`${disponible < 0 ? 'negativo' : ''}`}
        > <span>Disponible:</span> {formatPresupuesto(disponible)}
        </p>
        <p> <span>Gastado:</span> {formatPresupuesto(restante)}</p>
      </div>
    </section>
  )
}

export default ControlPresupuesto
