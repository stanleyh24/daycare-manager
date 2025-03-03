import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ModuleCards from "./dashboard/ModuleCards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Clock, TrendingUp, Users } from "lucide-react";

const Home = () => {
  // Mock data for stats and recent activities
  const stats = [
    {
      title: "Total Children",
      value: "42",
      icon: <Users className="h-5 w-5" />,
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Staff Members",
      value: "18",
      icon: <Users className="h-5 w-5" />,
      change: "+2",
      color: "bg-green-500",
    },
    {
      title: "Classrooms",
      value: "6",
      icon: <BarChart3 className="h-5 w-5" />,
      change: "100%",
      color: "bg-purple-500",
    },
    {
      title: "Attendance Rate",
      value: "94%",
      icon: <Calendar className="h-5 w-5" />,
      change: "+3%",
      color: "bg-amber-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      activity: "Emma Thompson was registered",
      time: "10 minutes ago",
      type: "registration",
    },
    {
      id: 2,
      activity: "Medical form for Alex Johnson was uploaded",
      time: "1 hour ago",
      type: "document",
    },
    {
      id: 3,
      activity: "Ms. Parker was assigned to Sunshine Room",
      time: "Yesterday",
      type: "staff",
    },
    {
      id: 4,
      activity: "Noah Williams marked absent",
      time: "Yesterday",
      type: "attendance",
    },
    {
      id: 5,
      activity: "Olivia Brown moved from waitlist to active",
      time: "2 days ago",
      type: "enrollment",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-100">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Child Care Management
            </h1>
            <p className="text-gray-500 mt-1">
              Here's what's happening in your daycare today
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Generate Reports</Button>
            <Button>Quick Actions</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.color} bg-opacity-10`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Cards */}
        <ModuleCards />

        {/* Recent Activity */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and activities in your daycare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="p-2 rounded-full bg-gray-100">
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.activity}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <Link to="#" className="text-sm text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 p-2 rounded-md text-center min-w-[50px]">
                    <div className="text-xs">JUN</div>
                    <div className="font-bold">15</div>
                  </div>
                  <div>
                    <p className="font-medium">Parent-Teacher Meeting</p>
                    <p className="text-sm text-gray-500">3:00 PM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-800 p-2 rounded-md text-center min-w-[50px]">
                    <div className="text-xs">JUN</div>
                    <div className="font-bold">22</div>
                  </div>
                  <div>
                    <p className="font-medium">Summer Festival</p>
                    <p className="text-sm text-gray-500">10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View Calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary" />
                  <span>Review new registration applications (3)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary" />
                  <span>Verify staff certifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary" />
                  <span>Update emergency contact information</span>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Quick Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <span>📄</span> Staff Handbook
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <span>📄</span> Emergency Procedures
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <span>📄</span> Curriculum Guidelines
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <span>📄</span> Parent Communication Templates
                </Link>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                Resource Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
