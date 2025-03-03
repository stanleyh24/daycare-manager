import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  BookOpen,
  Clipboard,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
}

const Sidebar = ({ className, collapsed = false }: SidebarProps) => {
  const modules = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Registration",
      icon: <Clipboard className="h-5 w-5" />,
      path: "/registration",
    },
    {
      name: "Staff Management",
      icon: <Users className="h-5 w-5" />,
      path: "/staff",
    },
    {
      name: "Classroom Organization",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/classrooms",
    },
    {
      name: "Health & Attendance",
      icon: <Calendar className="h-5 w-5" />,
      path: "/attendance",
    },
    {
      name: "Billing & Payments",
      icon: <DollarSign className="h-5 w-5" />,
      path: "/billing",
    },
    {
      name: "Enrollment Tracking",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/enrollment",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white",
        collapsed ? "w-20" : "w-64",
        className,
      )}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-center">
          {collapsed ? (
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
          ) : (
            <div className="text-xl font-bold text-center">
              Child Care Management
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {modules.map((module) => (
            <Link
              key={module.path}
              to={module.path}
              className={cn(
                "flex items-center px-3 py-3 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900",
                collapsed ? "justify-center" : "justify-start",
              )}
            >
              {module.icon}
              {!collapsed && <span className="ml-3">{module.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center text-slate-300 hover:bg-slate-800 hover:text-white",
              collapsed ? "justify-center px-2" : "justify-start",
            )}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center text-slate-300 hover:bg-slate-800 hover:text-white",
              collapsed ? "justify-center px-2" : "justify-start",
            )}
          >
            <HelpCircle className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Help</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center text-slate-300 hover:bg-slate-800 hover:text-white",
              collapsed ? "justify-center px-2" : "justify-start",
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
