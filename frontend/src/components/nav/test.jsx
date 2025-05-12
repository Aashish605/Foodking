import { Link, useSearchParams } from "react-router-dom";
import {useState,useRef,useEffect} from 'react'


const test = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const [searchParams] = useSearchParams(); //seachParams is a UrlSearch object.
    const tableId = searchParams.get("tableId"); //tableId is also the query name.


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setIsOpen(false);
                } else if (!menuRef.current) {
                    setIsOpen(false);
                }
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    const addTableIdToPath = (path) => {
        if (tableId) {
            return `${path}?tableId=${tableId}`;
        }
        return path;
    };

    return (
        <div>
            <nav
                ref={navRef}
                className="Restro-nav text-lg font-bold flex flex-col md:flex-row content-center items-center justify-between rounded border border-gray-300 z-10 h-auto md:h-14 sticky top-0 bg-white shadow-lg p-4 "
            >
                <div className="flex justify-between w-full md:w-auto">
                    <div className="text-green-600">Surkhet Restro</div>
                    <button className="md:hidden" onClick={toggleMenu}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    ref={menuRef}
                    className={`${isOpen ? "block" : "hidden"
                        } md:flex md:items-center w-full md:w-auto mt-2 md:mt-0`}
                >
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
                        <Link
                            to={addTableIdToPath("/")}
                            className="block py-2 px-4 text-sm hover:bg-gray-200 rounded"
                            onClick={handleLinkClick}
                        >
                            Menu
                        </Link>
                        <Link
                            to={addTableIdToPath("/contactus")}
                            className="block py-2 px-4 text-sm hover:bg-gray-200 rounded"
                            onClick={handleLinkClick}
                        >
                            Contact Us
                        </Link>
                        <Link
                            to={addTableIdToPath("/aboutus")}
                            className="block py-2 px-4 text-sm hover:bg-gray-200 rounded"
                            onClick={handleLinkClick}
                        >
                            AboutUs
                        </Link>
                        <Link
                            to={addTableIdToPath("/adminpanel")}
                            className="block py-2 px-4 text-sm hover:bg-gray-200 rounded"
                            onClick={handleLinkClick}
                        >
                            Admin panel
                        </Link>
                        <Link
                            to={addTableIdToPath("/additems")}
                            className="block py-2 px-4 text-sm hover:bg-gray-200 rounded"
                            onClick={handleLinkClick}
                        >
                            Add items
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default test
