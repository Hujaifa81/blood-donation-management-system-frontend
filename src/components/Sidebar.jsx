import { NavLink } from 'react-router-dom';
import {
    FaHome,
    FaUser,
    FaHandHoldingMedical,
    FaPlusCircle,
    FaUsers,
    FaClipboardList,
    FaBlog,
    FaCog,
    FaSignOutAlt,
} from 'react-icons/fa';

import useRoleStatus from '../hooks/useRoleStatus';

const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md ${isActive ? 'bg-red-600 text-white' : 'text-gray-800 dark:text-gray-700 hover:bg-gray-200'
    }`;

const Sidebar = () => {
    
    const {userRole,name,photo}=useRoleStatus()
    return (
        <div className="h-full px-3 space-y-2  dark:bg-gray-50 dark:text-gray-800">
            {/* Profile Section */}
            <div className="flex  p-2 space-x-4">
                <img
                    src={photo}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-xs font-bold">{name}</h2>
                    <span className="text-xs text-gray-500 capitalize">{userRole}</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="divide-y dark:divide-gray-300">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li>
                        <NavLink to="/dashboard" end className={navLinkClass}>
                            <FaHome /> <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className={navLinkClass}>
                            <FaUser /> <span>Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-donation-requests" className={navLinkClass}>
                            <FaHandHoldingMedical /> <span>My Donation Requests</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/create-donation-request" className={navLinkClass}>
                            <FaPlusCircle /> <span>Create Donation Request</span>
                        </NavLink>
                    </li>
                    {
                        userRole ==='admin' && (<li>
                        <NavLink to="/dashboard/all-users" className={navLinkClass}>
                            <FaUsers /> <span>All Users</span>
                        </NavLink>
                    </li>)
                    }
                    {
                        userRole ==='admin' && userRole==='volunteer' && (<li>
                        <NavLink to="/dashboard/all-blood-donation-request" className={navLinkClass}>
                            <FaClipboardList /> <span>All Donation Requests</span>
                        </NavLink>
                    </li>)
                    }
                    <li>
                        <NavLink to="/dashboard/content-management" end className={navLinkClass}>
                            <FaBlog /> <span>Content Management</span>
                        </NavLink>
                    </li>
                </ul>

                {/* Footer Actions */}
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <li>
                        <NavLink to="/dashboard/settings" className={navLinkClass}>
                            <FaCog /> <span>Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                // TODO: Add logout logic
                            }}
                            className="flex items-center gap-3 p-2 rounded-md text-red-600 hover:bg-gray-100 w-full"
                        >
                            <FaSignOutAlt /> <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
