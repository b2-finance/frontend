'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import NavbarItem, { NavbarItemProps } from './navbar-item';
import NavbarSubmenu, { NavbarSubmenuLinks } from './navbar-submenu';
import routes from '@/common/routes';
import DashboardIcon from '@/common/icons/dashboard-icon';
import TransactionsIcon from '@/common/icons/transactions-icon';
import LedgerIcon from '@/common/icons/ledger-icon';
import AccountsIcon from '@/common/icons/accounts-icon';
import CompaniesIcon from '@/common/icons/companies-icon';
import AssetsIcon from '@/common/icons/assets-icon';
import ReportsIcon from '@/common/icons/reports-icon';
import BalanceSheetIcon from '@/common/icons/balance-sheet-icon';
import IncomeStatementIcon from '@/common/icons/income-statement-icon';
import CashFlowIcon from '@/common/icons/cash-flow-icon';
import VarianceIcon from '@/common/icons/variance-icon';
import PlanningIcon from '@/common/icons/planning-icon';
import BudgetIcon from '@/common/icons/budget-icon';
import ForecastIcon from '@/common/icons/forecast-icon';

/*
  FIXME
  Known issues:
  
  When navbar is collapsed and hover submenu is open, if submenu has
  enough links to overflow past the viewport bottom, causes viewport to scroll.
  Ideally the overflow should be hidden.
*/

interface NavbarItemProperties
  extends Pick<NavbarItemProps, 'href' | 'icon' | 'label'> {
  sub?: NavbarSubmenuLinks[];
}

export const NAVBAR_ITEMS: NavbarItemProperties[] = [
  {
    href: routes.dashboard,
    icon: <DashboardIcon />,
    label: 'Dashboard'
  },
  {
    icon: <TransactionsIcon />,
    label: 'Transactions',
    sub: [
      {
        href: routes.ledger,
        icon: <LedgerIcon />,
        label: 'Ledger'
      },
      {
        href: routes.accounts,
        icon: <AccountsIcon />,
        label: 'Accounts'
      },
      {
        href: routes.companies,
        icon: <CompaniesIcon />,
        label: 'Companies'
      }
    ]
  },
  {
    href: routes.assets,
    icon: <AssetsIcon />,
    label: 'Assets'
  },
  {
    icon: <ReportsIcon />,
    label: 'Reports',
    sub: [
      {
        href: routes.balanceSheet,
        icon: <BalanceSheetIcon />,
        label: 'Balance Sheet'
      },
      {
        href: routes.incomeStatement,
        icon: <IncomeStatementIcon />,
        label: 'Income Statement'
      },
      {
        href: routes.cashFlow,
        icon: <CashFlowIcon />,
        label: 'Cash Flow'
      },
      {
        href: routes.variance,
        icon: <VarianceIcon />,
        label: 'Variance'
      }
    ]
  },
  {
    icon: <PlanningIcon />,
    label: 'Planning',
    sub: [
      {
        href: routes.budget,
        icon: <BudgetIcon />,
        label: 'Budget'
      },
      {
        href: routes.forecast,
        icon: <ForecastIcon />,
        label: 'Forecast'
      }
    ]
  }
];

/**
 * A sidebar navigation menu.
 *
 * @returns A JSX element.
 */
export default function Navbar() {
  // The href of the active navbar item.
  const [active, setActive] = useState<string>(usePathname());

  // When true, submenus are visible on hover.
  const [showSubsOnHover, setShowSubsOnHover] = useState(true);

  /*
    By default, submenus remain open after clicking the top-level
    navbar item (or the submenu itself) because it receives focus
    after the click. To ensure submenus are only visible on hover,
    blur the active element to remove focus from the submenu.
  */
  const blur = () => (document.activeElement as HTMLElement).blur();

  /*
    By default, after clicking a link in a submenu, the submenu
    remains visible because the link received focus. To hide the
    submenu after clicking a link, showSubOnHover is temporarily
    disabled. This useEffect immediately reenables hovering.  
  */
  useEffect(() => {
    if (!showSubsOnHover) setShowSubsOnHover(true);
  }, [showSubsOnHover]);

  return (
    <nav className="p-2 bg-base-200 text-base-content shadow-lg">
      <ul>
        {NAVBAR_ITEMS.map(({ href, icon, label, sub }) => {
          if (sub) {
            return (
              <li key={label} className="group" onClick={blur}>
                <NavbarItem
                  icon={icon}
                  label={label}
                  active={!!sub.find(({ href }) => href === active)}
                />
                <div
                  className={clsx(
                    'hidden',
                    showSubsOnHover && [
                      'group-hover:block',
                      'group-focus-within:block',
                      'absolute',
                      'left-12', // 40px icon + 8px navbar padding
                      '-translate-y-10', // 40px icon
                      'pl-2',
                      'z-10'
                    ]
                  )}
                >
                  <NavbarSubmenu
                    title={label}
                    links={sub}
                    active={active}
                    handleClick={(href: string) => {
                      setActive(href);
                      setShowSubsOnHover(false);
                    }}
                  />
                </div>
              </li>
            );
          } else {
            return (
              <li
                key={label}
                onClick={() => {
                  setActive(href ?? '');
                  blur();
                }}
              >
                <NavbarItem
                  href={href}
                  icon={icon}
                  label={label}
                  active={href === active}
                />
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
