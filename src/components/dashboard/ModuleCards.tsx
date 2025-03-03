import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  School,
  Calendar,
  ClipboardList,
  BookOpen,
  DollarSign,
} from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const ModuleCard = ({
  title,
  description,
  icon,
  href,
  color = "bg-blue-100",
}: ModuleCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md bg-white">
      <div className={`h-2 ${color}`} />
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${color}`}>{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={href}>Access Module</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface ModuleCardsProps {
  modules?: ModuleCardProps[];
}

const ModuleCards = ({ modules }: ModuleCardsProps) => {
  const defaultModules: ModuleCardProps[] = [
    {
      title: "Registration",
      description:
        "Register new children, manage profiles, and update information",
      icon: <UserPlus size={24} />,
      href: "/registration",
      color: "bg-blue-100",
    },
    {
      title: "Staff Management",
      description:
        "Manage staff information, qualifications, and classroom assignments",
      icon: <Users size={24} />,
      href: "/staff",
      color: "bg-green-100",
    },
    {
      title: "Classroom Organization",
      description: "Organize classrooms, assign children, and manage capacity",
      icon: <School size={24} />,
      href: "/classrooms",
      color: "bg-purple-100",
    },
    {
      title: "Health & Attendance",
      description:
        "Track daily attendance, health incidents, and medical information",
      icon: <ClipboardList size={24} />,
      href: "/health-attendance",
      color: "bg-amber-100",
    },
    {
      title: "Billing & Payments",
      description:
        "Create invoices, record payments, and manage financial transactions",
      icon: <DollarSign size={24} />,
      href: "/billing",
      color: "bg-emerald-100",
    },
    {
      title: "Enrollment Tracking",
      description:
        "Monitor enrollment status, waiting lists, and program participation",
      icon: <BookOpen size={24} />,
      href: "/enrollment",
      color: "bg-rose-100",
    },
    {
      title: "Calendar & Events",
      description: "Schedule and manage events, holidays, and important dates",
      icon: <Calendar size={24} />,
      href: "/calendar",
      color: "bg-cyan-100",
    },
  ];

  const displayModules = modules || defaultModules;

  return (
    <div className="w-full bg-white p-6">
      <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayModules.map((module, index) => (
          <ModuleCard key={index} {...module} />
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
