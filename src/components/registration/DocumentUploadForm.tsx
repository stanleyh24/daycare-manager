import React, { useState } from "react";
import { Upload, FileText, X, AlertCircle, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Document {
  id: string;
  name: string;
  file: File | null;
  status: "pending" | "uploaded" | "error";
  required: boolean;
}

interface DocumentUploadFormProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onSave?: (documents: Document[]) => void;
}

const DocumentUploadForm = ({
  onNext = () => {},
  onPrevious = () => {},
  onSave = () => {},
}: DocumentUploadFormProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Birth Certificate",
      file: null,
      status: "pending",
      required: true,
    },
    {
      id: "2",
      name: "Immunization Records",
      file: null,
      status: "pending",
      required: true,
    },
    {
      id: "3",
      name: "Medical Authorization Form",
      file: null,
      status: "pending",
      required: true,
    },
    {
      id: "4",
      name: "Emergency Contact Form",
      file: null,
      status: "pending",
      required: true,
    },
    {
      id: "5",
      name: "Photo Release Form",
      file: null,
      status: "pending",
      required: false,
    },
  ]);

  const handleFileChange = (id: string, file: File | null) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.id === id
          ? { ...doc, file, status: file ? "uploaded" : "pending" }
          : doc,
      ),
    );
  };

  const removeFile = (id: string) => {
    handleFileChange(id, null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required documents are uploaded
    const missingRequired = documents.filter(
      (doc) => doc.required && doc.status !== "uploaded",
    );

    if (missingRequired.length > 0) {
      // Mark missing required documents as error
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.required && doc.status !== "uploaded"
            ? { ...doc, status: "error" }
            : doc,
        ),
      );
      return;
    }

    onSave(documents);
    onNext();
  };

  const isFormComplete = documents.every(
    (doc) => !doc.required || doc.status === "uploaded",
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Required Documents</h2>
          <p className="text-gray-600 mb-4">
            Please upload the following documents to complete the registration
            process. All required documents must be submitted before proceeding.
          </p>

          {documents.some((doc) => doc.status === "error") && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Missing Required Documents</AlertTitle>
              <AlertDescription>
                Please upload all required documents before proceeding.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((document) => (
              <Card
                key={document.id}
                className={`border ${document.status === "error" ? "border-red-500" : ""}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    {document.name}
                    {document.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {document.required
                      ? "Required document"
                      : "Optional document"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {document.file ? (
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center overflow-hidden">
                        <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span className="truncate">{document.file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(document.id)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <Label
                        htmlFor={`file-${document.id}`}
                        className="sr-only"
                      >
                        Upload {document.name}
                      </Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor={`file-${document.id}`}
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${document.status === "error" ? "border-red-300" : "border-gray-300"}`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-1 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, PNG, JPG or GIF (max. 10MB)
                            </p>
                          </div>
                          <Input
                            id={`file-${document.id}`}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileChange(document.id, file);
                            }}
                            accept=".pdf,.png,.jpg,.jpeg,.gif"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  {document.status === "uploaded" && (
                    <div className="text-green-600 text-sm flex items-center">
                      <Check className="h-4 w-4 mr-1" /> Document uploaded
                    </div>
                  )}
                  {document.status === "error" && (
                    <div className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> Required document
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button type="submit" disabled={!isFormComplete}>
            {isFormComplete
              ? "Complete Registration"
              : "Upload Required Documents"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUploadForm;
