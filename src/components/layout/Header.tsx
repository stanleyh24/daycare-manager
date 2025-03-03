import React, { useState } from "react";
import { Bell, Search, Settings, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onLogout?: () => void;
}

const Header = ({
  userName = "Sarah Johnson",
  userRole = "Administrator",
  notificationCount = 3,
  onLogout = () => console.log("Logout clicked"),
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="lg:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4">
                <h2 className="text-lg font-bold">Child Care Management</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4 mt-6">
                <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Dashboard
                </a>
                <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Registration
                </a>
                <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Staff Management
                </a>
                <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Classroom Organization
                </a>
                <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Health & Attendance
                </a>
                <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Enrollment Tracking
                </a>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search..."
          className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                  {notificationCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">New Child Registration</span>
                  <span className="text-xs text-gray-500">
                    Emma Thompson was registered by parent
                  </span>
                  <span className="text-xs text-gray-400">10 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Document Uploaded</span>
                  <span className="text-xs text-gray-500">
                    Medical form for Alex Johnson was uploaded
                  </span>
                  <span className="text-xs text-gray-400">1 hour ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Staff Assignment</span>
                  <span className="text-xs text-gray-500">
                    Ms. Parker was assigned to Sunshine Room
                  </span>
                  <span className="text-xs text-gray-400">Yesterday</span>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 p-1 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt={userName}
                />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-gray-500">{userRole}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
