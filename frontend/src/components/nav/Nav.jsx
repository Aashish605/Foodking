import { useState, useEffect } from 'react';
import { useSidebar } from "./Sidebarcontext"
import { Navigate, NavLink, useNavigate } from "react-router-dom";

export default function Nav() {

    const navigate = useNavigate()



    const [searchbar, setsearchbar] = useState(false);
    const { toggleSidebar, isSidebarOpen } = useSidebar();
    const [handleplaceholder, sethandleplaceholder] = useState();
    const [deltaY, setdeltaY] = useState(0);

    useEffect(() => {
        const handleScroll = (e) => {
            if (!isSidebarOpen) {
                setdeltaY(e.deltaY);
            }
        };
        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [isSidebarOpen]);

    useEffect(() => {
        let startY = 0;

        // --- Touch Event Fallback Handlers ---
        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (!isSidebarOpen) {
                const currentY = e.touches[0].clientY;
                setdeltaY(startY - currentY);
            }
        };

        const handleTouchEnd = () => {
            startY = 0
        };


        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        // Cleanup on unmount
        return () => {

            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        const handleSearchBar = (e) => {
            if (searchbar){
                document.body.style.overflow = 'hidden'
            }
            else{
                document.body.style.overflow = ''
            }
            if(searchbar && !e.target.closest('.sidebar') ){
                setsearchbar(!searchbar)
            }
        }
        window.addEventListener("click", handleSearchBar)
        return () => {
            window.removeEventListener("click", handleSearchBar)
            document.body.style.overflow=''
        };
    }, [searchbar]);



    return (
        <>
            <nav className={`min-[815px]:hidden sidebar top-0 z-30 shadow-md  bg-white h-[10vh]  ${deltaY >= 0 ? "relative" : "sticky"} `}>
                <div className={`relative px-3  flex items-center justify-between ${searchbar ? "hidden" : "block"} `}>
                    <svg onClick={toggleSidebar} className={`ml-2 ${isSidebarOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 60 40">
                        <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                    </svg>
                    <svg onClick={toggleSidebar} className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 24 24">
                        <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                    </svg>
                    <img onClick={() => { navigate("/") }} src="./logo.png" alt="Posterized logo" className=" sm:w-[35vw]  sm:h-[10vh] w-[30vw] h-[10vh] " />
                    <div className="flex items-center  justify-center gap-6 ">
                        <svg onClick={() => { setsearchbar(!searchbar) }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                        </svg>
                        <NavLink to={'/login'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon mr-2 hover:w-[1.35rem] icon-account cursor-pointer w-5 hidden min-[425px]:block" viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path></svg>
                        </NavLink>
                    </div>
                    <div className={`absolute flex flex-col  top-[100%] overflow-scroll  left-0 w-[50vw] max-[425px]:w-full  shadow-black h-[100vh]  z-10  gap-10 bg-white ${isSidebarOpen ? 'block' : 'hidden'} dropdown`} >
                        <div className=" overflow-scroll flex flex-col text-xl flex-grow  px-6 mt-2">
                            <NavLink
                                onClick={toggleSidebar}
                                to="/"
                                className={({ isActive }) =>
                                    `hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60 ${isActive ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : ""}`
                                }
                            >
                                Menu
                            </NavLink>
                            <NavLink
                                onClick={toggleSidebar}
                                to="/aboutus"
                                className={({ isActive }) =>
                                    `hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60 ${isActive ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : ""}`
                                }
                            >
                                About Us
                            </NavLink>
                        </div>
                        <NavLink to={'/login'} onClick={toggleSidebar} className="bg-gray-100  flex-shrink-0  h-[30vh] ">
                            <p className="mt-6 mx-4  flex items-center gap-3" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon hover:w-[1.35rem] icon-account cursor-pointer w-6 " viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path></svg>Log in</p>
                        </NavLink>
                    </div>
                </div>
                <div className={`relative group flex items-center justify-center ${searchbar ? "block " : "hidden"} `}>
                    <input type="text" id="search"
                        className={`border-[1px] my-3 bg-transparent w-[90%]  placeholder-gray-800 outline-none  border-black px-6 py-3 rounded-3xl
                            `}
                        onChange={(e) => { e.target.value ? sethandleplaceholder(true) : sethandleplaceholder(false) }}
                    />
                    <p className={`absolute bottom-6 left-14 text-xl duration-300  group-focus-within:translate-y-[-1rem] group-focus-within:text-xs group-focus-within:opacity-60 group-focus-within:duration-300 ${handleplaceholder ? "translate-y-[-1rem] duration-300 opacity-60 text-xs " : ""}`}>
                        Search
                    </p>
                    <svg className='absolute right-16 bottom-6 ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                    </svg>
                </div>
            </nav >
            <nav className={`hidden    top-0 z-30 bg-white shadow-md w-full min-[815px]:flex   justify-between items-center  px-10 py-3 gap-10 ${deltaY >= 0 ? "relative" : "sticky"} dropdown`}>
                <img onClick={() => { navigate("/") }} src="./logo.png" alt="Posterized logo" className=" w-[15vw] h-[10vh]  " />
                <div className="flex flex-wrap items-center justify-center text-center gap-10">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60 ${isActive ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : ""}`
                        }
                    >
                        Menu
                    </NavLink>
                    <NavLink
                        to="/aboutus"
                        className={({ isActive }) =>
                            `hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60 ${isActive ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : ""}`
                        }
                    >
                        About Us
                    </NavLink>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <input type="text" id="search"
                            className={`border-[1px] bg-transparent  placeholder-gray-800 outline-none w-[15vw] border-black px-4 py-3 rounded-3xl
                            `}
                            onChange={(e) => { e.target.value ? sethandleplaceholder(true) : sethandleplaceholder(false) }}
                        />
                        <p className={`absolute bottom-3 left-4  group-focus-within:translate-y-[-1rem] group-focus-within:text-xs group-focus-within:opacity-60  ${handleplaceholder ? "translate-y-[-1rem] opacity-60 text-xs " : ""}`}>
                            Search
                        </p>
                    </div>
                    <NavLink to={'/login'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon hover:w-[1.35rem] icon-account cursor-pointer w-5" viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path></svg>
                    </NavLink>
                </div>
            </nav>
        </>
    );
}
