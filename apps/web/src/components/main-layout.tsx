import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Fragment, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { classNames } from '@/lib/utils';
import { ModeToggle } from './mode-toggle';

interface LayoutProps {
  children?: ReactNode;
  route: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, route }) => {
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const teams = [
    { id: 1, name: 'Halyk Platinum', href: '#', initial: 'H', current: true },
    { id: 2, name: 'Kaspi Gold', href: '#', initial: 'U', current: false },
    { id: 3, name: 'BCC Iron Card', href: '#', initial: 'B', current: false },
  ];

  const userNavigation = [
    {
      name: 'Your profile',
      href: '/profile',
      onClick: () => {},
    },
    {
      name: 'Sign out',
      href: '/auth',
      // Define onClick behavior for 'Sign out'
      onClick: () => {
        logout();
      },
    },
  ];

  const navigation = [
    { name: 'Мои карты', href: '/cards', icon: CreditCardIcon },
  ];

  const currentNavigationItem = React.useMemo(() => {
    return navigation.map((item) => ({
      ...item,
      current: item.href === `/${route}`,
    }));
  }, [route, navigation]);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/70" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 bg-background">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <Button
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center justify-center">
                    <img
                      className="h-16 w-auto mt-6"
                      src="https://shop.cardpicker.de/wp-content/uploads/2020/11/cardpicker-logo.png"
                      alt="CardPicker"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-6">
                      <li>
                        {currentNavigationItem.map((item, idx) => (
                          <Button
                            asChild
                            className={classNames(
                              'justify-start group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                              item.current
                                ? 'text-primary font-bold'
                                : 'font-semibold'
                            )}
                            key={idx}
                            variant={item.current ? 'ghost' : 'ghost'}
                          >
                            <Link to={item.href}>
                              <item.icon
                                className={classNames(
                                  'h-6 w-6 shrink-0 ',
                                  item.current
                                    ? 'text-primary font-bold'
                                    : 'font-semibold'
                                )}
                              />
                              {item.name}
                            </Link>
                          </Button>
                        ))}
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6">
                          Your teams
                        </div>
                      </li>
                      <li>
                        {teams.map((item, ifx) => (
                          <Button
                            asChild
                            key={ifx}
                            className={classNames(
                              item.current
                                ? 'bg-background text-foreground'
                                : '',
                              'justify-start group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                            variant={item.current ? 'secondary' : 'ghost'}
                          >
                            <Link to={item.href}>
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 text-[0.625rem] font-medium">
                                {item.initial}
                              </span>
                              <span className="truncate">{item.name}</span>
                            </Link>
                          </Button>
                        ))}
                      </li>
                      <li className="mt-auto">
                        <a
                          href="#"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          Настройки
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-gray-200 shadow-lg">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <img
              className="h-16 w-auto mt-6"
              src="https://shop.cardpicker.de/wp-content/uploads/2020/11/cardpicker-logo.png"
              alt="CardPicker"
            />
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-6">
              <li>
                {currentNavigationItem.map((item, idx) => (
                  <Button
                    asChild
                    className={classNames(
                      'justify-start group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                      item.current ? 'text-primary font-bold' : 'font-semibold'
                    )}
                    key={idx}
                    variant={item.current ? 'ghost' : 'ghost'}
                  >
                    <Link to={item.href}>
                      <item.icon
                        className={classNames(
                          'h-6 w-6 shrink-0 ',
                          item.current
                            ? 'text-primary font-bold'
                            : 'font-semibold'
                        )}
                      />
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </li>
              <li>
                <div className="text-xs font-semibold leading-6">
                  Your cards
                </div>
              </li>
              <li>
                {teams.map((item, ifx) => (
                  <Button
                    asChild
                    key={ifx}
                    className={classNames(
                      item.current ? 'bg-background text-foreground' : '',
                      'justify-start group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                    variant={item.current ? 'secondary' : 'ghost'}
                  >
                    <Link to={item.href}>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 text-[0.625rem] font-medium group-hover:text-background">
                        {item.initial}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </Button>
                ))}
              </li>
              <li className="mt-auto">
                <Button className="border-0" asChild variant={'outline'}>
                  <div className="">
                    <Link
                      to="settings"
                      className="group -mx-5 flex gap-x-2 font-semibold"
                    >
                      <Cog6ToothIcon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      Настройки
                    </Link>
                  </div>
                </Button>
                <a href="#" className=""></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 bg-background">
          <Button
            variant="outline"
            className="-m-2.5 p-2.5 lg:hidden border-0"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Button>
          <div
            className="h-6 w-px bg-background lg:hidden"
            aria-hidden="true"
          />
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form
              className="relative flex flex-1 items-center"
              action="#"
              method="GET"
            >
              <Label className="sr-only">Search</Label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  id="search-field"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-background placeholder-background focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </div>
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button className="-m-2.5 p-2.5 border-0" variant={'outline'}>
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
              <ModeToggle />
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6"
                      aria-hidden="true"
                    >
                      {user?.name} {user?.surname}
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-background py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        <Button
                          asChild
                          variant={'ghost'}
                          className={classNames(
                            'block px-3 py-1 text-sm leading-6',
                            ''
                          )}
                          onClick={() => {
                            if (item.name === 'Sign out') {
                              logout();
                            }
                          }}
                        >
                          <a href={item.href}>{item.name}</a>
                        </Button>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
