import ControlPresupuesto from './ControlPresupuesto'
import NewPresupuest from './NewPresupuest'
const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
}) => {
  return (
    <header>
      <h1>{!isValidPresupuesto ? 'Administrador de gastos' : 'Control de gastos'}</h1>
      {isValidPresupuesto
        ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            gastos={gastos}
            setGastos={setGastos}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
          )
        : (
          <NewPresupuest
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
          )}
    </header>
  )
}

export default Header
