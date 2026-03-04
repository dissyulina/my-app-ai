import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TbMessageChatbot } from 'react-icons/tb';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useMenu } from '../../hooks/MenuContext';

const menuItem = [
  {
    id: '1',
    title: 'Chatbot',
    icon: <TbMessageChatbot />,
    iconName: 'IoChatbubbleEllipsesOutline',
  },
  {
    id: '2',
    title: 'Review Summarizer',
    icon: <HiOutlineSparkles />,
    iconName: 'HiOutlineSparkles',
  },
];

export function AppSidebar() {
  const { activeMenu, setActiveMenu } = useMenu();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenu>
          {menuItem.map((item) => (
            <SidebarMenuItem
              key={item.id}
              className="flex justify-content-center align-middle ps-2"
            >
              <SidebarMenuButton
                className="w-100"
                isActive={activeMenu === item.id}
                onClick={() => setActiveMenu(item.id)}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
