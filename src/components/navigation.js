import React from 'react'
import { Link } from 'gatsby'
import logo from "../../static/logo.png"

export default () => (
	<header className="main-header js-main-header">
		<div className="container max-width-lg">
			<div className="main-header__layout">
				<div className="main-header__logo">
					<Link className="main-header__nav-link" to="/">
						<img src={logo} />
					</Link>
				</div>

				<button className="btn btn--subtle main-header__nav-trigger js-main-header__nav-trigger" aria-label="Toggle menu" aria-expanded="false" aria-controls="main-header-nav">
					<i className="main-header__nav-trigger-icon" aria-hidden="true"></i>
					<span>Menu</span>
				</button>

				<nav className="main-header__nav js-main-header__nav" id="main-header-nav" aria-labelledby="main-header-nav-label" role="navigation">
					<div id="main-header-nav-label" className="main-header__nav-label">Main menu</div>
					<ul className="main-header__nav-list">
						<li className="main-header__nav-item">
							<Link className="main-header__nav-link" to="/map/">Map</Link>
						</li>
						<li className="main-header__nav-item">
							<Link className="main-header__nav-link" to="/form/">Form</Link>
						</li>
						<li className="main-header__nav-item">
							<a className="main-header__nav-link" target="_blank" href="https://givealittle.co.nz/cause/predator-free-brooklyn">Donate</a>
						</li>
						<li className="main-header__nav-item main-header__nav-divider" aria-hidden="true"></li>
						<li className="main-header__nav-item">
							<Link className="btn btn--primary" to="/form/">Register your catch</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
)
