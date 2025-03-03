import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Phone,
  User,
  Users,
  Heart,
  AlertCircle,
  Edit,
} from "lucide-react";

interface Parent {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  isEmergencyContact: boolean;
  isAuthorizedForPickup: boolean;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isAuthorizedForPickup: boolean;
}

interface Document {
  id: string;
  name: string;
  dateUploaded: string;
  status: "verified" | "pending" | "expired";
}

interface MedicalInfo {
  allergies: string[];
  medications: string[];
  conditions: string[];
  bloodType: string;
  doctorName: string;
  doctorPhone: string;
}

interface ChildDetailsProps {
  childId?: string;
  child?: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    enrollmentDate: string;
    enrollmentStatus: "active" | "waitlist" | "former";
    classroom: string;
    profileImage?: string;
  };
  parents?: Parent[];
  emergencyContacts?: EmergencyContact[];
  documents?: Document[];
  medicalInfo?: MedicalInfo;
  onEdit?: (section: string) => void;
}

const ChildDetails = ({
  childId = "1",
  child = {
    id: "1",
    firstName: "Emma",
    lastName: "Johnson",
    dateOfBirth: "2019-05-15",
    gender: "Female",
    address: "123 Main Street, Anytown, CA 12345",
    enrollmentDate: "2022-09-01",
    enrollmentStatus: "active",
    classroom: "Sunshine Room",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  parents = [
    {
      id: "1",
      name: "John Johnson",
      relationship: "Father",
      phone: "(555) 123-4567",
      email: "john.johnson@example.com",
      address: "123 Main Street, Anytown, CA 12345",
      isEmergencyContact: true,
      isAuthorizedForPickup: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      relationship: "Mother",
      phone: "(555) 987-6543",
      email: "sarah.johnson@example.com",
      address: "123 Main Street, Anytown, CA 12345",
      isEmergencyContact: true,
      isAuthorizedForPickup: true,
    },
  ],
  emergencyContacts = [
    {
      id: "1",
      name: "Robert Smith",
      relationship: "Grandfather",
      phone: "(555) 234-5678",
      isAuthorizedForPickup: true,
    },
    {
      id: "2",
      name: "Jennifer Williams",
      relationship: "Aunt",
      phone: "(555) 345-6789",
      isAuthorizedForPickup: false,
    },
  ],
  documents = [
    {
      id: "1",
      name: "Birth Certificate",
      dateUploaded: "2022-08-15",
      status: "verified",
    },
    {
      id: "2",
      name: "Immunization Records",
      dateUploaded: "2022-08-20",
      status: "verified",
    },
    {
      id: "3",
      name: "Medical Authorization Form",
      dateUploaded: "2022-08-25",
      status: "verified",
    },
    {
      id: "4",
      name: "Photo Release Form",
      dateUploaded: "2022-08-25",
      status: "pending",
    },
  ],
  medicalInfo = {
    allergies: ["Peanuts", "Penicillin"],
    medications: ["Asthma inhaler as needed"],
    conditions: ["Mild asthma"],
    bloodType: "A+",
    doctorName: "Dr. Michael Chen",
    doctorPhone: "(555) 456-7890",
  },
  onEdit = (section) => console.log(`Edit ${section}`),
}: ChildDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "waitlist":
        return "bg-yellow-100 text-yellow-800";
      case "former":
        return "bg-gray-100 text-gray-800";
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      {/* Child Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary/10">
            <AvatarImage
              src={child.profileImage}
              alt={`${child.firstName} ${child.lastName}`}
            />
            <AvatarFallback>{`${child.firstName.charAt(0)}${child.lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{`${child.firstName} ${child.lastName}`}</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {calculateAge(child.dateOfBirth)} years old
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {child.classroom}
              </Badge>
              <Badge className={`${getStatusColor(child.enrollmentStatus)}`}>
                {child.enrollmentStatus.charAt(0).toUpperCase() +
                  child.enrollmentStatus.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
        <Button
          onClick={() => onEdit("personal")}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Child
        </Button>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">
                      Full Name:
                    </span>{" "}
                    <span>{`${child.firstName} ${child.lastName}`}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">
                      Date of Birth:
                    </span>{" "}
                    <span>{formatDate(child.dateOfBirth)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Gender:</span>{" "}
                    <span>{child.gender}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Address:</span>{" "}
                    <span className="flex items-start gap-1">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {child.address}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">
                      Enrollment Date:
                    </span>{" "}
                    <span>{formatDate(child.enrollmentDate)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">
                      Classroom:
                    </span>{" "}
                    <span>{child.classroom}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Parents/Guardians
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parents.map((parent) => (
                    <div key={parent.id} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{parent.name}</div>
                        <div className="text-sm text-gray-500">
                          {parent.relationship}
                        </div>
                        <div className="text-sm flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" />
                          {parent.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-gray-500">
                          {contact.relationship}
                        </div>
                        <div className="text-sm flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </div>
                        {contact.isAuthorizedForPickup && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            Authorized for pickup
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Parents/Guardians
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit("parents")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {parents.map((parent) => (
                  <div
                    key={parent.id}
                    className="border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{parent.name}</div>
                        <div className="text-sm text-gray-500">
                          {parent.relationship}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-12">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-500">
                            Phone:
                          </span>{" "}
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {parent.phone}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-500">
                            Email:
                          </span>{" "}
                          <span>{parent.email}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-500">
                            Address:
                          </span>{" "}
                          <span className="flex items-start gap-1">
                            <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {parent.address}
                          </span>
                        </div>
                        <div className="text-sm space-x-2">
                          {parent.isEmergencyContact && (
                            <Badge variant="outline" className="text-xs">
                              Emergency Contact
                            </Badge>
                          )}
                          {parent.isAuthorizedForPickup && (
                            <Badge variant="outline" className="text-xs">
                              Authorized for Pickup
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit("emergency")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <Avatar>
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-gray-500">
                            {contact.relationship}
                          </div>
                        </div>
                        {contact.isAuthorizedForPickup && (
                          <Badge variant="outline" className="text-xs">
                            Authorized for Pickup
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm flex items-center gap-1 mt-2">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical Tab */}
        <TabsContent value="medical" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Medical Information
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit("medical")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Allergies</h3>
                  {medicalInfo.allergies.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {medicalInfo.allergies.map((allergy, index) => (
                        <li key={index} className="text-sm">
                          {allergy}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No known allergies</p>
                  )}

                  <h3 className="font-medium mt-4 mb-2">Medical Conditions</h3>
                  {medicalInfo.conditions.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {medicalInfo.conditions.map((condition, index) => (
                        <li key={index} className="text-sm">
                          {condition}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No medical conditions
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Medications</h3>
                  {medicalInfo.medications.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {medicalInfo.medications.map((medication, index) => (
                        <li key={index} className="text-sm">
                          {medication}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No medications</p>
                  )}

                  <div className="mt-4 space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Blood Type:</span>{" "}
                      <span>{medicalInfo.bloodType}</span>
                    </div>

                    <h3 className="font-medium mt-2">Primary Physician</h3>
                    <div className="text-sm">
                      <span className="font-medium text-gray-500">Doctor:</span>{" "}
                      <span>{medicalInfo.doctorName}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-500">Phone:</span>{" "}
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {medicalInfo.doctorPhone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Required Documents
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit("documents")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Documents
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">{document.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Uploaded on {formatDate(document.dateUploaded)}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(document.status)}>
                      {document.status.charAt(0).toUpperCase() +
                        document.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildDetails;
