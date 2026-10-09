import { appleImg, bagImg, searchImg } from '../utils';
import { Link } from 'react-router-dom';
import { navLists } from '../constants';
import { navRoutes } from '../../navRoutes.js';
import { useCartStore, selectCount } from '../../store/cartStore';

const Navbar = () => {
    const count = useCartStore(selectCount);
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Apple" width={14} height={18} />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <Link key={nav} to={navRoutes[nav] ?? "#"} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {nav}
            </Link>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="search" width={18} height={18} />
          <Link to="/cart" className="relative">
  <img src={bagImg} alt="bag" width={18} height={18} />
  {count > 0 && (
    <span className="absolute -top-2 -right-3 bg-blue text-white text-[10px] font-semibold rounded-full min-w-4 h-4 px-1 flex-center">
      {count}
    </span>
  )}
</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar