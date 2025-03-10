import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar"
import "../styles/styles.css"
const Navbar = () => {
    // navList Data
    const navList = (
        <ul className="flex space-x-5 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allroom'}>All Room</Link>
            </li>

            {/* Signup */}
            <li>
                <Link to={'/signup'}>Signup</Link>
            </li>

            {/* User */}
            <li>
                <Link to={'/user-dashboard'}>Ram</Link>
            </li>

            {/* Admin */}
            <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>

            {/* logout */}
            {/* <li>
                logout
            </li> */}

            
        </ul>
    )
    return (
        <nav className="bg-blue-600 sticky top-0">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                    <h2 className=" font-bold text-white text-2xl text-center">Rental</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;