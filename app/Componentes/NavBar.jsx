"use client"
import React from 'react'
import Link from 'next/link';

import { Button, Chip, LinkIcon, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { EditIcon } from '../Assets/Icons/EditIcon';
import { HouseIcon } from '../Assets/Icons/HouseIcon';
import { NewIcon } from '../Assets/Icons/NewIcon';
import { CalendarICon } from '../Assets/Icons/CalendarIcon';
import { UsersIcon } from '../Assets/Icons/UsersIcon';

const NavBar = () => {
  return (
    <Navbar  className='bg-smoke-900 dark text-slate-50 justify-center    ' >
    <NavbarContent className=' w-full gap-5'  justify='center'>

      <NavbarItem  >
        <Link href='/' className='link'>
        <HouseIcon/>
          <span>Inicio</span>
        </Link>
      </NavbarItem>
      <NavbarItem>
        
        <Link href='/new' className='link'>
          <NewIcon/>
          <span>
          Nuevo</span>
        </Link>
        
        </NavbarItem>
      <NavbarItem>
        <Link href='/agenda' className='link'>
          <CalendarICon/>
          <span>Agenda</span>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='/trabajadores' className='link'>
          <UsersIcon/>
          <span>Trabajadores</span>
        </Link>
      </NavbarItem>

    </NavbarContent>
  </Navbar>
  )
}

export default NavBar