const Footer = ({ isValidPresupuesto }) => {
  return (
    <footer
      className={`footer ${isValidPresupuesto ? '' : 'margin-footer'}`}
    >
      <p
        className='footer__text'
      >
        All Right Reserved. Made By {' '}
        <a
          className='footer__link'
          href='https://twitter.com/rxtsel'
          target='_blank' rel='noreferrer'
        >RXTSEL
        </a>
      </p>
    </footer>
  )
}

export default Footer
