import { Link } from 'react-router-dom';
import { navLists } from '../constants';
import { navRoutes } from '../../navRoutes.js';
import { useCartStore, selectCount } from '../../store/cartStore';
import MobileMenu from '../../components/MobileMenu';

const Navbar = () => {
  const count = useCartStore(selectCount);
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full items-center screen-max-width">
        <Link to="/iphone">
          <img src="/ph-logo.svg" alt="PH Demo Store" width={22} height={22} />
        </Link>

        <div className="flex flex-1 justify-center max-md:hidden">
          {navLists.map((nav) => (
            <Link key={nav} to={navRoutes[nav] ?? "#"} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {nav}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 max-md:justify-end max-md:flex-1">
          <button className="bg-transparent border-none">
            <img src="/search.svg" alt="Search" width={24} height={24} />
          </button>
          <Link to="/cart" className="relative">
            <img src="/cart.svg" alt="Cart" width={24} height={24} />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue text-white text-[10px] font-semibold rounded-full min-w-4 h-4 px-1 flex-center">
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

export default Navbar