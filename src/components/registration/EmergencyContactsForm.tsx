import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Trash2, Phone, User, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  authorizedForPickup: boolean;
}

interface EmergencyContactsFormProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onSave?: (data: { emergencyContacts: EmergencyContact[] }) => void;
  initialContacts?: EmergencyContact[];
}

const EmergencyContactsForm = ({
  onNext = () => {},
  onPrevious = () => {},
  onSave = () => {},
  initialContacts = [
    {
      id: "1",
      name: "Jane Smith",
      relationship: "Aunt",
      phone: "(555) 123-4567",
      authorizedForPickup: true,
    },
    {
      id: "2",
      name: "Robert Johnson",
      relationship: "Grandparent",
      phone: "(555) 987-6543",
      authorizedForPickup: false,
    },
  ],
}: EmergencyContactsFormProps) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(initialContacts);

  const form = useForm({
    defaultValues: {
      emergencyContacts: contacts,
    },
  });

  const addContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: "",
      relationship: "",
      phone: "",
      authorizedForPickup: false,
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const updateContact = (
    id: string,
    field: keyof EmergencyContact,
    value: any,
  ) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact,
      ),
    );
  };

  const handleSubmit = () => {
    onSave({ emergencyContacts: contacts });
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Emergency Contacts
          </CardTitle>
          <CardDescription>
            Please provide at least one emergency contact who can be reached if
            parents/guardians are unavailable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="p-4 border rounded-md bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Contact {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContact(contact.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Full Name"
                            className="pl-9"
                            value={contact.name}
                            onChange={(e) =>
                              updateContact(contact.id, "name", e.target.value)
                            }
                          />
                        </div>
                      </FormControl>
                    </FormItem>

                    <FormItem>
                      <FormLabel>Relationship to Child</FormLabel>
                      <Select
                        value={contact.relationship}
                        onValueChange={(value) =>
                          updateContact(contact.id, "relationship", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Grandparent">
                            Grandparent
                          </SelectItem>
                          <SelectItem value="Aunt/Uncle">Aunt/Uncle</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                          <SelectItem value="Friend">Family Friend</SelectItem>
                          <SelectItem value="Neighbor">Neighbor</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>

                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="(555) 123-4567"
                            className="pl-9"
                            value={contact.phone}
                            onChange={(e) =>
                              updateContact(contact.id, "phone", e.target.value)
                            }
                          />
                        </div>
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex items-center space-x-2 pt-7">
                      <input
                        type="checkbox"
                        id={`pickup-${contact.id}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={contact.authorizedForPickup}
                        onChange={(e) =>
                          updateContact(
                            contact.id,
                            "authorizedForPickup",
                            e.target.checked,
                          )
                        }
                      />
                      <label
                        htmlFor={`pickup-${contact.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Authorized for pickup
                      </label>
                    </FormItem>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addContact}
                className="w-full border-dashed"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Another Emergency Contact
              </Button>

              <FormDescription className="text-center mt-4">
                <div className="flex items-center justify-center text-amber-600">
                  <Heart className="h-4 w-4 mr-2" />
                  <span>
                    We recommend adding at least two emergency contacts
                  </span>
                </div>
              </FormDescription>
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={handleSubmit}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmergencyContactsForm;
