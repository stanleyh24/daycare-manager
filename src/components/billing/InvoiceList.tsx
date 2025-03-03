import React, { useState } from "react";
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
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  id: string;
  invoiceNumber: string;
  childName: string;
  parentName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "cancelled";
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

interface InvoiceListProps {
  invoices?: Invoice[];
  onViewInvoice?: (id: string) => void;
  onEditInvoice?: (id: string) => void;
  onDeleteInvoice?: (id: string) => void;
  onCreateInvoice?: () => void;
}

const defaultInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2023-001",
    childName: "Emma Johnson",
    parentName: "Sarah Johnson",
    amount: 450.0,
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    status: "paid",
    items: [
      {
        description: "Monthly Tuition - May 2023",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
      {
        description: "Activity Fee",
        quantity: 1,
        unitPrice: 50.0,
        total: 50.0,
      },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-2023-002",
    childName: "Noah Williams",
    parentName: "Michael Williams",
    amount: 475.0,
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    status: "paid",
    items: [
      {
        description: "Monthly Tuition - May 2023",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
      {
        description: "Extended Hours",
        quantity: 5,
        unitPrice: 15.0,
        total: 75.0,
      },
    ],
  },
  {
    id: "3",
    invoiceNumber: "INV-2023-003",
    childName: "Olivia Brown",
    parentName: "Jennifer Brown",
    amount: 400.0,
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    status: "pending",
    items: [
      {
        description: "Monthly Tuition - May 2023",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
    ],
  },
  {
    id: "4",
    invoiceNumber: "INV-2023-004",
    childName: "Liam Davis",
    parentName: "Robert Davis",
    amount: 450.0,
    issueDate: "2023-04-01",
    dueDate: "2023-04-15",
    status: "overdue",
    items: [
      {
        description: "Monthly Tuition - April 2023",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
      {
        description: "Late Pickup Fee",
        quantity: 1,
        unitPrice: 50.0,
        total: 50.0,
      },
    ],
  },
  {
    id: "5",
    invoiceNumber: "INV-2023-005",
    childName: "Ava Miller",
    parentName: "Jessica Miller",
    amount: 425.0,
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    status: "pending",
    items: [
      {
        description: "Monthly Tuition - May 2023",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
      {
        description: "Art Supplies",
        quantity: 1,
        unitPrice: 25.0,
        total: 25.0,
      },
    ],
  },
];

const InvoiceList = ({
  invoices = defaultInvoices,
  onViewInvoice = () => {},
  onEditInvoice = () => {},
  onDeleteInvoice = () => {},
  onCreateInvoice = () => {},
}: InvoiceListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);

  // Filter invoices based on search term and filters
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      searchTerm === "" ||
      invoice.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === null || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (id: string) => {
    setInvoiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (invoiceToDelete) {
      onDeleteInvoice(invoiceToDelete);
      setInvoiceToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Overdue
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 flex items-center gap-1">
            <Trash2 className="h-3 w-3" />
            Cancelled
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
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>
              Manage all invoices and billing records
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by invoice #, child or parent..."
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <TableHead className="w-[120px]">
                    <div className="flex items-center space-x-1">
                      <span>Invoice #</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Child</span>
                    </div>
                  </TableHead>
                  <TableHead>Parent/Guardian</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Amount</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Issue Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Due Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="h-12 w-12 text-gray-300 mb-2" />
                        <p className="mb-2">No invoices found</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onCreateInvoice}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Create New Invoice
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>{invoice.childName}</TableCell>
                      <TableCell>{invoice.parentName}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
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
                              onClick={() => onViewInvoice(invoice.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditInvoice(invoice.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(invoice.id)}
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
              invoice from the system.
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

export default InvoiceList;
