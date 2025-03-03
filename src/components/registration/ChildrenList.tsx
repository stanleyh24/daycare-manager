import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Download,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  enrollmentDate: string;
  status: "active" | "inactive" | "waitlist";
  classroom: string | null;
}

interface ChildrenListProps {
  children?: Child[];
  onViewChild?: (id: string) => void;
  onEditChild?: (id: string) => void;
  onDeleteChild?: (id: string) => void;
  onAddChild?: () => void;
}

const defaultChildren: Child[] = [
  {
    id: "1",
    firstName: "Emma",
    lastName: "Johnson",
    dateOfBirth: "2019-05-12",
    gender: "female",
    parentName: "Sarah Johnson",
    enrollmentDate: "2022-09-01",
    status: "active",
    classroom: "Sunshine Room",
  },
  {
    id: "2",
    firstName: "Noah",
    lastName: "Williams",
    dateOfBirth: "2020-02-23",
    gender: "male",
    parentName: "Michael Williams",
    enrollmentDate: "2023-01-15",
    status: "active",
    classroom: "Rainbow Room",
  },
  {
    id: "3",
    firstName: "Olivia",
    lastName: "Brown",
    dateOfBirth: "2019-11-05",
    gender: "female",
    parentName: "Jennifer Brown",
    enrollmentDate: "2022-08-10",
    status: "inactive",
    classroom: null,
  },
  {
    id: "4",
    firstName: "Liam",
    lastName: "Davis",
    dateOfBirth: "2020-07-18",
    gender: "male",
    parentName: "Robert Davis",
    enrollmentDate: "2023-03-22",
    status: "waitlist",
    classroom: null,
  },
  {
    id: "5",
    firstName: "Ava",
    lastName: "Miller",
    dateOfBirth: "2019-09-30",
    gender: "female",
    parentName: "Jessica Miller",
    enrollmentDate: "2022-10-05",
    status: "active",
    classroom: "Sunshine Room",
  },
];

const ChildrenList = ({
  children = defaultChildren,
  onViewChild = () => {},
  onEditChild = () => {},
  onDeleteChild = () => {},
  onAddChild = () => {},
}: ChildrenListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [classroomFilter, setClassroomFilter] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState<string | null>(null);

  // Get unique classrooms for filter dropdown
  const classrooms = Array.from(
    new Set(
      children
        .filter((child) => child.classroom)
        .map((child) => child.classroom),
    ),
  );

  // Filter children based on search term and filters
  const filteredChildren = children.filter((child) => {
    const matchesSearch =
      searchTerm === "" ||
      child.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.parentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === null || child.status === statusFilter;

    const matchesClassroom =
      classroomFilter === null ||
      (classroomFilter === "none"
        ? child.classroom === null
        : child.classroom === classroomFilter);

    return matchesSearch && matchesStatus && matchesClassroom;
  });

  const handleDeleteClick = (id: string) => {
    setChildToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (childToDelete) {
      onDeleteChild(childToDelete);
      setChildToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inactive
          </Badge>
        );
      case "waitlist":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Waitlist
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Children</CardTitle>
            <CardDescription>
              Manage all registered children in the system
            </CardDescription>
          </div>
          <Button onClick={onAddChild}>
            <Plus className="h-4 w-4 mr-2" /> Add New Child
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or parent..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) =>
                  setStatusFilter(value === "all" ? null : value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="waitlist">Waitlist</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setClassroomFilter(value === "all" ? null : value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by classroom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classrooms</SelectItem>
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom} value={classroom || ""}>
                      {classroom}
                    </SelectItem>
                  ))}
                  <SelectItem value="none">No Classroom</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Date of Birth</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Parent/Guardian</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Classroom</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChildren.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <p className="mb-2">No children found</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onAddChild}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add New Child
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredChildren.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell className="font-medium">
                        {child.firstName} {child.lastName}
                      </TableCell>
                      <TableCell>
                        {new Date(child.dateOfBirth).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{child.parentName}</TableCell>
                      <TableCell>{getStatusBadge(child.status)}</TableCell>
                      <TableCell>
                        {child.classroom || (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onViewChild(child.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditChild(child.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(child.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              child's record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ChildrenList;
