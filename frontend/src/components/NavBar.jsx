import { Link } from "react-router-dom";
import {navLinks} from "../constants";
import { navRoutes } from "../navRoutes.js";

const NavBar = () => {
    return (
        <header>
            <nav>
                <img  src="/logo.svg" alt="Apple logo" />

                <ul>
                    {navLinks.map(({ label }) => (
                        <li key={label}>
                            <Link to={navRoutes[label] ?? "#"}>{label}</Link>
                        </li>
                    ))}
                </ul>

                <div className="flex-center gap-3">
                    <button>
                        <img src="/search.svg" alt="Search" />
                    </button>
                    <button>
                        <img src="/cart.svg" alt="Cart" />
                    </button>
                </div>
            </nav>
        </header>
    )
}
export default NavBar
