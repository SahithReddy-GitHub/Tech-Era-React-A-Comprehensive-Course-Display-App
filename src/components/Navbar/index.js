import {Link} from 'react-router-dom'

import './index.css'

const Navbar = () => (
  <nav className="navCon">
    <Link to="/" className="linkCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="websiteLogo"
      />
    </Link>
  </nav>
)
export default Navbar
