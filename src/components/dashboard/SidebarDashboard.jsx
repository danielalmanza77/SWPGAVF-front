import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const items = [
    { icon: <AiFillProduct />, title: "Gestionar Catálogo", path: "/dashboard/catalog" },
    { icon: <AiFillProduct />, title: "Gestionar Productos", path: "/dashboard/products" },
    { icon: <AiFillProduct />, title: "Gestionar Kardex", path: "/dashboard/kardex" },
    { icon: <FaUsers />, title: "Gestionar Usuarios", path: "/dashboard/users"},
]

const SidebarDashboard = () => {
    return (
        <div className="w-[20%] h-screen bg-white p-4">
            <h1 className='pl-2 text-2xl font-bold text-sixth tracking-tight leading-tight mb-4'>
                  FENIX LAUPA S.A.C
                </h1>
            {items.map((item, index) => (
                <NavLink to={item.path} key={index} className="text-sixth hover:bg-gray-200 duration-300 rounded-lg flex items-center gap-x-4 p-2 my-2">
                    <p className="text-lg">{item.icon}</p>
                    <p>{item.title}</p>
                </NavLink>
            ))}
        </div>
    )
}

export default SidebarDashboard;