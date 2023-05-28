
import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    Marvel information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                            end
                            style={({ isActive }) => ({'color': isActive ? '#fff' : '#a0a0a0'})}
                            to="/" >Characters</NavLink></li>
                    <li>/</li>
                    <li><NavLink 
                        style={({ isActive }) => ({'color': isActive ? '#fff' : '#a0a0a0'})}
                        to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;