import { CiGift, CiMusicNote1 } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { ImBooks } from "react-icons/im";
import { IoCarSport, IoFastFoodSharp } from "react-icons/io5";
import { LuBaby } from "react-icons/lu";
import { MdElectricBolt, MdHealthAndSafety, MdOutlinePets } from "react-icons/md";
import { RiBearSmileLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const items = [
    { icon: <GiClothes />, title: "Fashion" },
    { icon: <MdElectricBolt />, title: "Electronic" },
    { icon: <IoCarSport />, title: "Cars" },
    { icon: <RiBearSmileLine />, title: "Home & Garden" },
    { icon: <CiGift />, title: "Gift" },
    { icon: <CiMusicNote1 />, title: "Music" },
    { icon: <MdHealthAndSafety />, title: "Health & Beauty" },
    { icon: <MdOutlinePets />, title: "Pets" },
    { icon: <LuBaby />, title: "Baby Toys" },
    { icon: <IoFastFoodSharp />, title: "Groceries" },
    { icon: <ImBooks />, title: "Books" },
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