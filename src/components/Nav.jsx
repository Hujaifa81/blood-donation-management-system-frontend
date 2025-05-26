import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import profile from '../assets/no-profile-picture-15257.png'
import useAuth from '../hooks/useAuth';

const Nav = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const theme = document.querySelector('.theme-controller')
        if (localStorage.getItem('theme') === 'dark') {
            theme.checked = true
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
        } else {
            theme.checked = false
            document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
        }
    }, [])
    const handleTheme = () => {

        const theme = document.querySelector('.theme-controller')

        if (theme.checked) {
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <div>
            <div className="navbar  px-4 relative z-10  shadow-sm dark:bg-black dark:text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><NavLink to='/donation-requests' className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-red-600 px-2 rounded py-1" : ""}>Donation Requests</NavLink></li>
                            {
                                user && (<li><NavLink to='/funding' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-red-600 px-2 rounded py-1" : ""}>Funding</NavLink></li>)
                            }
                            <li><NavLink to={`/blogs`} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-red-600 px-2 rounded py-1" : ""}>Blog</NavLink></li>


                        </ul>
                    </div>
                    <div className=''>
                        <NavLink to='/'><span className="text-xl px-0 font-bold">Red Love</span></NavLink>
                    </div>

                </div>
                <div className='navbar-center'>
                    <div className=" hidden lg:flex font-bold">
                        <ul className="menu menu-horizontal px-1 gap-4 items-center">
                            
                            <li><NavLink to='/donation-requests' className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-red-600 px-2 rounded py-1" : ""}>Donation Requests</NavLink></li>
                            {
                                user && (<li><NavLink to='/funding' className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-red-600 px-2 rounded py-1" : ""}>Funding</NavLink></li>)
                            }
                            <li><NavLink to={`/blogs`} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-red-600 px-2 rounded py-1" : ""}>Blog</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-end gap-2   ">
                    <div>
                        <input type="checkbox" className="toggle theme-controller" onClick={handleTheme} />
                    </div>
                    <div>
                        {
                            user ? <div className="relative group inline-block">

                                {/* Avatar (Trigger) */}
                                <div className="btn btn-ghost btn-circle avatar">

                                    <div className="w-10 rounded-full">
                                        <img src={user ? user.photoURL : profile} alt="User Avatar" />
                                    </div>
                                </div>

                                {/* Hover Menu (Display Name + Logout) */}
                                <div className="absolute right-0 mt-3 w-40 bg-base-100 p-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                   <p className='text-center text-sm'><NavLink to={`/dashboard`} >Dashboard</NavLink></p>
                                    <button className="btn btn-error bg-red-600 text-white  btn-sm w-full mt-4" onClick={() => {
                                        logOut()
                                            .then(() => {
                                                navigate('/sign-in')
                                            })
                                    }}>Logout</button>
                                </div>
                            </div> :
                                <div className='flex gap-2  md:gap-3 items-center'>
                                    
                                    <button className="px-1 py-1 btn bg-red-500 text-white md:p-2  md:font-bold rounded-md "><Link to='/sign-in'>Sign In</Link></button>
                                </div>
                        }
                        
                    </div>







                </div>
            </div>
        </div>
    );
};

export default Nav;