
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBeer } from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import * as GiIcons from 'react-icons/gi';
// import * as MdIcons from 'react-icons/md';

// export const SidebarData = [
//     {
//         title: 'Trang Chủ DashBoard',
//         path: '/',
//         icon: <AiIcons.AiFillHome />,
//         cName: 'nav-text'
//     },
//     {
//         title: 'Khách Sạn',
//         path: '/hotel',
//         icon: <AiIcons.AiFillBank />,
//         cName: 'nav-text'
//     },
//     {
//         title: 'Công ty du lịch',
//         path: '/firm',
//         icon: <GiIcons.GiFactory />,
//         cName: 'nav-text'
//     },
//     {
//         title: 'Nhà hàng',
//         path: '/restau',
//         icon: <IoIcons.IoIosCafe />,
//         cName: 'nav-text'
//     },
//     {
//         title: 'Địa điểm',
//         path: '/place',
//         icon: <MdIcons.MdPlace />,
//         cName: 'nav-text'
//     }
// ]

import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: ' Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: ' Danh Sách Tour',
        path: '/tour',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: ' Loại Tour',
        path: '/category',
        icon: <AiIcons.AiFillAppstore />,
        cName: 'nav-text'
    }
    , {
        title: 'Người dùng',
        path: '/user',
        icon: <IoIcons.IoMdContact />,
        cName: 'nav-text'
    }


];
