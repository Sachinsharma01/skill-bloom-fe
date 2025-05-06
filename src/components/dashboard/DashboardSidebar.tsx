import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Book, List } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useIsMobile } from '../../hooks/use-mobile'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', tab: 'overview' },
  { icon: Book, label: 'Portfolio', path: '/portfolio', tab: 'portfolio' },
  { icon: List, label: 'Enrolled Resources', path: '/enrolled-resources', tab: 'enrolled-resources' },
]

export const DashboardSidebar = ({ onClick, selectedTab }: { onClick: (tab: string) => void, selectedTab: string }) => {
  const location = useLocation()
  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        'bg-gradient-to-b from-indigo-600 to-purple-600 text-white',
        'w-full h-full p-4 md:p-6 mt-8',
        'flex flex-row md:flex-col items-center md:items-start',
        'overflow-x-auto md:overflow-y-auto',
      )}
    >
      <nav
        className={cn(
          'flex flex-row md:flex-col gap-1 md:gap-2',
          'w-full md:space-y-2 overflow-x-auto md:overflow-x-visible',
        )}
      >
        <TooltipProvider delayDuration={0}>
          {menuItems.map((item) => (
            <Tooltip key={item.path}>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    'flex items-center md:space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap',
                    'min-w-[80px] md:min-w-0 justify-center md:justify-start',
                    selectedTab === item.tab ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80',
                  )}
                  onClick={() => onClick(item.tab)}
                >
                  <item.icon size={20} />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="md:hidden bg-white/90 text-purple-800 font-medium"
              >
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </div>
  )
}
