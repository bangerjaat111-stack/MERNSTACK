import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useAuth } from '../../Context/DataContext'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";




export default function Profile() {
  const Navigate = useNavigate()
  const { setsignin } = useAuth()

  const handleLogout = () => {
    setsignin(false)
    Navigate('/signin')
  }

  const menuitems = [
    {
      icon: <CgProfile />,
      label: 'Profile',
      link :'/profile',

      action: null
    },
    {
      icon: <IoIosSettings />,
      label: "Setting",
      link: '/setting',
      action: null
    },
    {
      icon: <PiSignOut />,
      label: 'signout',
      link: null,
      action: handleLogout

    }

  ]
  return (
    <div>
      <Menu as="div" className="relative ml-3">
        <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
          />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          {
            menuitems.map((item, index) => (
              <MenuItem key={index} >
                {({ active }) => (
                  item.link ? (
                    <Link to={item.link}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${active
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300'
                        }`}>

                      <div className='flex items-center gap-3'>

                        {item.icon}
                        <span>{item.label}</span>

                      </div>
                    </Link>
                  ) : (
                    <button onClick={item.action}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${active
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300'
                        }`}
                    >
                      <div className='flex items-center gap-3'>
                        {item.icon}
                        <span>{item.label}</span>

                      </div>

                    </button>
                  )
                )}
              </MenuItem>

            ))
          }
            
        </MenuItems>
      </Menu>

    </div >
  )
}
