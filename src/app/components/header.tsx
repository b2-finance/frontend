import routes from '@/utils/routes';
import Link from 'next/link';

interface NavLink {
  display: string;
  href: string;
}

export default function Header() {
  const navLinks: NavLink[] = [
    {
      display: 'Home',
      href: routes.home
    },
    {
      display: 'Dashboard',
      href: routes.dashboard
    },
    {
      display: 'Settings',
      href: routes.settings
    }
  ];
  return (
    <>
      <header className="fixed w-screen flex flex-row bg-appBlueDark text-white py-3 px-8">
        <nav>
          <ul className=" flex flex-row gap-1">
            {navLinks?.map(({ display, href }) => (
              <li key={display}>
                <Link className="block p-2 hover:text-appGreenMed" href={href}>
                  {display}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div id="header-spacer" className="h-[64px]" />
    </>
  );
}
