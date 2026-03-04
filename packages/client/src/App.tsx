import './App.css';
import { AppSidebar } from './components/sidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { MenuProvider } from './hooks/MenuContext';
import Content from './Content';

function App() {
  return (
    <MenuProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <main className="p-4 h-screen w-full flex flex-col">
          <SidebarTrigger />
          <Content />
        </main>
      </SidebarProvider>
    </MenuProvider>
  );
}

export default App;
