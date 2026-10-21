import { Link } from "react-router-dom";
import {navLinks} from "../constants";
import { navRoutes } from "../navRoutes.js";
import { useCartStore, selectCount } from "../store/cartStore";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
 const count = useCartStore(selectCount);
    return (
        <header>
            <nav>
                <Link to="/iphone"><img src="/ph-logo.svg" alt="PH Demo Store" width={22} height={22} /></Link>

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
<Link to="/cart" className="relative">
    <img src="/cart.svg" alt="Cart" />
    {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] font-semibold rounded-full min-w-4 h-4 px-1 flex-center">
            {count}
        </span>
    )}
</Link>
<MobileMenu />
                </div>
            </nav>
        </header>
    )
}
export default NavBar
