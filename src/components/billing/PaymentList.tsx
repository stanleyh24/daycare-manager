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
  CreditCard,
  CheckCircle,
  AlertCircle,
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

interface Payment {
  id: string;
  paymentNumber: string;
  invoiceNumber: string;
  childName: string;
  parentName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: "credit" | "debit" | "cash" | "check" | "bank" | "other";
  status: "completed" | "pending" | "failed" | "refunded";
  notes?: string;
}

interface PaymentListProps {
  payments?: Payment[];
  onViewPayment?: (id: string) => void;
  onEditPayment?: (id: string) => void;
  onDeletePayment?: (id: string) => void;
  onCreatePayment?: () => void;
}

const defaultPayments: Payment[] = [
  {
    id: "1",
    paymentNumber: "PAY-2023-001",
    invoiceNumber: "INV-2023-001",
    childName: "Emma Johnson",
    parentName: "Sarah Johnson",
    amount: 450.0,
    paymentDate: "2023-05-10",
    paymentMethod: "credit",
    status: "completed",
  },
  {
    id: "2",
    paymentNumber: "PAY-2023-002",
    invoiceNumber: "INV-2023-002",
    childName: "Noah Williams",
    parentName: "Michael Williams",
    amount: 475.0,
    paymentDate: "2023-05-12",
    paymentMethod: "bank",
    status: "completed",
  },
  {
    id: "3",
    paymentNumber: "PAY-2023-003",
    invoiceNumber: "INV-2023-005",
    childName: "Ava Miller",
    parentName: "Jessica Miller",
    amount: 425.0,
    paymentDate: "2023-05-14",
    paymentMethod: "check",
    status: "pending",
    notes: "Check #1234 - waiting to clear",
  },
  {
    id: "4",
    paymentNumber: "PAY-2023-004",
    invoiceNumber: "INV-2023-003",
    childName: "Olivia Brown",
    parentName: "Jennifer Brown",
    amount: 400.0,
    paymentDate: "2023-05-15",
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "5",
    paymentNumber: "PAY-2023-005",
    invoiceNumber: "INV-2023-004",
    childName: "Liam Davis",
    parentName: "Robert Davis",
    amount: 450.0,
    paymentDate: "2023-05-16",
    paymentMethod: "debit",
    status: "failed",
    notes: "Card declined - contacted parent",
  },
];

const PaymentList = ({
  payments = defaultPayments,
  onViewPayment = () => {},
  onEditPayment = () => {},
  onDeletePayment = () => {},
  onCreatePayment = () => {},
}: PaymentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [methodFilter, setMethodFilter] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      searchTerm === "" ||
      payment.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === null || payment.status === statusFilter;

    const matchesMethod =
      methodFilter === null || payment.paymentMethod === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleDeleteClick = (id: string) => {
    setPaymentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (paymentToDelete) {
      onDeletePayment(paymentToDelete);
      setPaymentToDelete(null);
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
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Refunded
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit":
      case "debit":
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case "cash":
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case "check":
        return <FileText className="h-4 w-4 text-gray-500" />;
      case "bank":
        return <Building className="h-4 w-4 text-purple-500" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Payments</CardTitle>
            <CardDescription>
              Track all payment transactions and records
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
                placeholder="Search by payment #, invoice #, child or parent..."
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setMethodFilter(value === "all" ? null : value)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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
                      <span>Payment #</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Child</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Amount</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <CreditCard className="h-12 w-12 text-gray-300 mb-2" />
                        <p className="mb-2">No payments found</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onCreatePayment}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Record New Payment
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.paymentNumber}
                      </TableCell>
                      <TableCell>{payment.invoiceNumber}</TableCell>
                      <TableCell>{payment.childName}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                      <TableCell className="capitalize">
                        <div className="flex items-center gap-1">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          {payment.paymentMethod.replace("-", " ")}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                              onClick={() => onViewPayment(payment.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditPayment(payment.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(payment.id)}
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
              payment record from the system.
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

export default PaymentList;

// Missing imports for icons
const DollarSign = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const Building = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);
