import { MdElectricBolt } from "react-icons/md";
import { NavLink } from "react-router-dom";

const items = [
    { icon: <MdElectricBolt />, title: "Focos LED" },
    { icon: <MdElectricBolt />, title: "Focos fluorescentes" },
    { icon: <MdElectricBolt />, title: "Bombillas inteligentes" },
    { icon: <MdElectricBolt />, title: "Bombillas decorativas" },
    { icon: <MdElectricBolt />, title: "Paneles solares" },
    { icon: <MdElectricBolt />, title: "UPSs" },
    { icon: <MdElectricBolt />, title: "Termostatos inteligentes" },
    { icon: <MdElectricBolt />, title: "Medidores de consumo eléctrico" },
    { icon: <MdElectricBolt />, title: "Luces de exteriores" },
    { icon: <MdElectricBolt />, title: "Luces de emergencia" },
]

const Sidebar = () => {
    return (
        <div className="w-[20%] bg-white rounded-lg p-4">
            {items.map((item, index) => (
                <NavLink to={"/"} key={index} className="text-black hover:bg-gray-200 duration-300 rounded-lg flex items-center gap-x-4 p-2 my-2">
                    <p className="text-lg">{item.icon}</p>
                    <p>{item.title}</p>
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar;