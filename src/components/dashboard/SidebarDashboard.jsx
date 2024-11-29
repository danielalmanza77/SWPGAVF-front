import { useState } from 'react'; // Import useState for tooltip visibility
import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useUser } from '../../context/UserContext'; // Import useUser hook

const items = [
    { icon: <AiFillProduct />, title: "Gestionar Catálogo", path: "/dashboard/catalog" },
    { icon: <AiFillProduct />, title: "Gestionar Productos", path: "/dashboard/products" },
    { icon: <AiFillProduct />, title: "Gestionar Kardex", path: "/dashboard/kardex" },
    { icon: <FaUsers />, title: "Gestionar Usuarios", path: "/dashboard/users" },
    { icon: <FaUsers />, title: "Gestionar Proveedores", path: "/dashboard/users" },
    { icon: <FaUsers />, title: "Gestionar Entregas", path: "/dashboard/delivery" },
    { icon: <FaUsers />, title: "Reporte Ventas", path: "/dashboard/reporte-ventas" },
]

const SidebarDashboard = () => {
    const { user, logout } = useUser(); // Get user data and logout function
    const [tooltipVisible, setTooltipVisible] = useState(false); // Control tooltip visibility

    return (
        <div className="w-[20%] h-screen bg-white p-4 flex flex-col">
            <NavLink to={"/dashboard"}>
                <h1 className='pl-2 text-2xl font-bold text-sixth tracking-tight leading-tight mb-4'>
                    FENIX LAUPA S.A.C
                </h1>
            </NavLink>
            
            {/* Sidebar links */}
            <div className="flex-1">
                {items.map((item, index) => (
                    <NavLink to={item.path} key={index} className="text-sixth hover:bg-gray-200 duration-300 rounded-lg flex items-center gap-x-4 p-2 my-2">
                        <p className="text-lg">{item.icon}</p>
                        <p>{item.title}</p>
                    </NavLink>
                ))}
            </div>

            {/* User info and logout */}
            {user && (
                <div className="mt-auto p-4">
                    <div className="flex items-center justify-between text-sixth">
                        <p className="text-lg font-normal">{user.name} {user.lastname}</p>
                    </div>
                    <div className="relative mt-2">
                        <button
                            className="w-full text-red-500 hover:text-red-700 text-sm rounded-md border-2 border-sixth"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SidebarDashboard;
