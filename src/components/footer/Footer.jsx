import './footer.scss'

import { Link } from 'react-router-dom'

import bg from '../../assets/footer-bg.jpg'

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container footer__content">
        <div className="footer__menu">
          <div className="footer__item">
            {/* <Link to="/">From iamtd with love.</Link> */}
            <span>From td with love.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
