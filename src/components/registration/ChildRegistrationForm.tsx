import React, { useState } from "react";
import { z } from "zod";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import PersonalDetailsForm from "./PersonalDetailsForm";
import ParentInformationForm from "./ParentInformationForm";
import EmergencyContactsForm from "./EmergencyContactsForm";
import DocumentUploadForm from "./DocumentUploadForm";

interface ChildRegistrationFormProps {
  onComplete?: (data: any) => void;
  defaultValues?: any;
}

const steps = [
  { id: "personal", label: "Personal Details" },
  { id: "parents", label: "Parent Information" },
  { id: "emergency", label: "Emergency Contacts" },
  { id: "documents", label: "Documents" },
];

const ChildRegistrationForm = ({
  onComplete = (data) => console.log("Registration completed:", data),
  defaultValues = {},
}: ChildRegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(defaultValues);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    // Only allow clicking on completed steps or the next available step
    if (completedSteps.includes(index) || index === currentStep) {
      setCurrentStep(index);
    }
  };

  const updateFormData = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
  };

  const handleComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    onComplete(formData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white">
      <Card className="shadow-sm">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="text-2xl font-bold">
            Child Registration
          </CardTitle>
          <CardDescription>
            Complete the following steps to register a child in the system.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex flex-col items-center ${index <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                    onClick={() => handleStepClick(index)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${completedSteps.includes(index) ? "bg-green-100 border-green-500 text-green-700" : index === currentStep ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-500"}`}
                    >
                      {completedSteps.includes(index) ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className="mt-2 text-sm font-medium">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-full h-1 bg-gray-200 flex-grow mx-2">
                      <div
                        className={`h-full ${index < currentStep ? "bg-green-500" : "bg-gray-200"}`}
                        style={{ width: index < currentStep ? "100%" : "0%" }}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Form Steps */}
          <Tabs value={steps[currentStep].id} className="w-full">
            <TabsContent value="personal" className="mt-0">
              <PersonalDetailsForm
                onSubmit={(data) => {
                  updateFormData({ personalDetails: data });
                  handleNext();
                }}
                defaultValues={formData.personalDetails}
              />
            </TabsContent>

            <TabsContent value="parents" className="mt-0">
              <ParentInformationForm
                onSubmit={(data) => {
                  updateFormData({ parentInformation: data });
                  handleNext();
                }}
                onBack={handlePrevious}
                defaultValues={formData.parentInformation}
              />
            </TabsContent>

            <TabsContent value="emergency" className="mt-0">
              <EmergencyContactsForm
                onSave={(data) => {
                  updateFormData({ emergencyContacts: data });
                  handleNext();
                }}
                onPrevious={handlePrevious}
                initialContacts={formData.emergencyContacts?.emergencyContacts}
              />
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <DocumentUploadForm
                onSave={(data) => {
                  updateFormData({ documents: data });
                  handleComplete();
                }}
                onPrevious={handlePrevious}
              />
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-6 bg-gray-50">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete}>Complete Registration</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChildRegistrationForm;
