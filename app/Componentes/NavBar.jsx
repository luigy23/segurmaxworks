import React from 'react'
import Link from 'next/link';

import { Button, LinkIcon, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'

const NavBar = () => {
  return (
    <Navbar className='bg-smoke-900 text-slate-50 dark'>
    <NavbarContent >
      <NavbarItem >
        <Link href='/' className='hover:text-slate-200'>
          Home
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button color='primary'>
        <Link href='/new' className='hover:text-slate-200'>
          Nuevo
        </Link>
        </Button>
        </NavbarItem>

    </NavbarContent>
  </Navbar>
  )
}

export default NavBar