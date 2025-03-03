import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, FileText } from "lucide-react";

import ChildRegistrationForm from "./ChildRegistrationForm";
import ChildrenList from "./ChildrenList";
import ChildDetails from "./ChildDetails";

type RegistrationView = "list" | "add" | "view" | "edit";

interface RegistrationModuleProps {
  initialView?: RegistrationView;
  selectedChildId?: string;
}

const RegistrationModule = ({
  initialView = "list",
  selectedChildId = "",
}: RegistrationModuleProps) => {
  const [view, setView] = useState<RegistrationView>(initialView);
  const [childId, setChildId] = useState<string>(selectedChildId);

  const handleAddChild = () => {
    setView("add");
  };

  const handleViewChild = (id: string) => {
    setChildId(id);
    setView("view");
  };

  const handleEditChild = (id: string) => {
    setChildId(id);
    setView("edit");
  };

  const handleDeleteChild = (id: string) => {
    // In a real application, this would call an API to delete the child
    console.log(`Delete child with ID: ${id}`);
    // Then return to the list view
    setView("list");
  };

  const handleRegistrationComplete = (data: any) => {
    console.log("Registration completed:", data);
    setView("list");
  };

  const handleBackToList = () => {
    setView("list");
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Registration</h1>
            <p className="text-gray-500 mt-1">
              Manage child registrations, view details, and add new children to
              the system
            </p>
          </div>

          <div className="flex gap-2">
            {view !== "list" && (
              <Button variant="outline" onClick={handleBackToList}>
                Back to List
              </Button>
            )}
            {view === "list" && (
              <Button onClick={handleAddChild}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Child
              </Button>
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="bg-white rounded-lg shadow-sm">
          {view === "list" && (
            <ChildrenList
              onViewChild={handleViewChild}
              onEditChild={handleEditChild}
              onDeleteChild={handleDeleteChild}
              onAddChild={handleAddChild}
            />
          )}

          {view === "add" && (
            <div className="p-6">
              <ChildRegistrationForm onComplete={handleRegistrationComplete} />
            </div>
          )}

          {view === "view" && (
            <div className="p-6">
              <ChildDetails
                childId={childId}
                onEdit={(section) => {
                  console.log(`Edit section: ${section}`);
                  setView("edit");
                }}
              />
            </div>
          )}

          {view === "edit" && (
            <div className="p-6">
              <ChildRegistrationForm
                onComplete={handleRegistrationComplete}
                defaultValues={
                  {
                    // In a real application, you would fetch the child's data
                    // and populate the form with it
                  }
                }
              />
            </div>
          )}
        </div>

        {/* Quick stats or info cards - only shown on list view */}
        {view === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Total Children</h3>
                  <p className="text-3xl font-bold">42</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-green-500 font-medium">↑ 12%</span> from
                last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Active Enrollments</h3>
                  <p className="text-3xl font-bold">38</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-green-500 font-medium">↑ 8%</span> from
                last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-full">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Waitlist</h3>
                  <p className="text-3xl font-bold">7</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-red-500 font-medium">↑ 3</span> new
                additions
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModule;
