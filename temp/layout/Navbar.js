// /* eslint-disable jsx-a11y/anchor-is-valid */
// import './css/NavBar.css'
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBeer } from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { SidebarData } from './SidebarData';
// import './css/NavBar.css';

// export default function Navbar() {
//     const [sidebar, setSidebar] = useState(false)

//     const showSidebar = () => setSidebar(!sidebar)
//     return (
//         <>
//             <div className="navbar">
//                 <Link to="#" className='menu-bars' onClick={showSidebar}>
//                     <FaBeer.FaBars onClick={showSidebar} />
//                 </Link>
//             </div>
//             <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//                 <ul className='nav-menu-items'>
//                     <li className='navbar-toggle'>
//                         <Link to="#" className='menu-bars'>
//                             <AiIcons.AiOutlineClose />
//                         </Link>
//                     </li>
//                     {SidebarData.map((item, index) => {
//                         return (
//                             <li key={{ index }} className={item.cName}>
//                                 <Link to={item.path}>
//                                     {item.icon}
//                                     <span>{item.title}</span>
//                                 </Link>
//                             </li>
//                         )
//                     }
//                     )}
//                 </ul>
//             </nav>
//         </>
//     );
// }


// /*



// */


// /*

// */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './css/NavBar.css';
import { IconContext } from "react-icons/lib";
import * as IoIcons from 'react-icons/io';
export default function Navbar() {

    const [subNavIndex, setSubNavIndex] = useState(null);

    const handleSubNavClick = (event, index) => {
        event.preventDefault();
        if (index === subNavIndex)
        {
            setSubNavIndex(null);
        } else
        {
            setSubNavIndex(index);
        }
    };

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>


                <div className="navbar">
                    <Link to="#" className='menu-bars'>
                        <FaBars onClick={showSidebar} />
                    </Link>
                    <div className="auth">
                        <Link to='/signin'>
                            <IoIcons.IoMdContact className="auth-icon" />
                        </Link>
                    </div>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle'>
                            <Link to="#" className='menu-bars' onClick={showSidebar}>
                                <AiIcons.AiOutlineClose className="iconauth" style={{ fontSize: '30px' }} />
                            </Link>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                    {/* Update here */}
                                    {item.subNav && item.subNav.length > 0 ?
                                        <ul className={`sub-nav-menu ${sidebar ? "active" : ""}`} onClick={handleSubNavClick}>
                                            {item.subNav.map((subItem, subIndex) => {
                                                return (
                                                    <li key={subIndex} className={subItem.cName}>
                                                        <Link to={subItem.path}>
                                                            {subItem.icon}
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul> : null
                                    }
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

    // {/* {SidebarData.map((item, index) => {
    //                         return (
    //                             <li key={index} className={item.cName}>
    //                                 <Link to={item.path} onClick={showSidebar}>
    //                                     {item.icon}
    //                                     <span>{item.title}</span>
    //                                 </Link>
    //                             </li>
    //                         )
    //                     })} */}