import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, DollarSign, FileText, Building } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const paymentSchema = z.object({
  paymentNumber: z.string().min(1, { message: "Payment number is required" }),
  invoiceId: z.string().min(1, { message: "Invoice is required" }),
  amount: z.coerce
    .number()
    .min(0.01, { message: "Amount must be greater than 0" }),
  paymentDate: z.string().min(1, { message: "Payment date is required" }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  notes: z.string().optional(),
});

interface PaymentFormProps {
  paymentId?: string;
  readOnly?: boolean;
  onComplete?: (data: z.infer<typeof paymentSchema>) => void;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  childName: string;
  parentName: string;
  amount: number;
  balance: number;
  dueDate: string;
}

const defaultInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2023-001",
    childName: "Emma Johnson",
    parentName: "Sarah Johnson",
    amount: 450.0,
    balance: 450.0,
    dueDate: "2023-05-15",
  },
  {
    id: "2",
    invoiceNumber: "INV-2023-002",
    childName: "Noah Williams",
    parentName: "Michael Williams",
    amount: 475.0,
    balance: 475.0,
    dueDate: "2023-05-15",
  },
  {
    id: "3",
    invoiceNumber: "INV-2023-003",
    childName: "Olivia Brown",
    parentName: "Jennifer Brown",
    amount: 400.0,
    balance: 400.0,
    dueDate: "2023-05-15",
  },
  {
    id: "4",
    invoiceNumber: "INV-2023-004",
    childName: "Liam Davis",
    parentName: "Robert Davis",
    amount: 450.0,
    balance: 450.0,
    dueDate: "2023-04-15",
  },
  {
    id: "5",
    invoiceNumber: "INV-2023-005",
    childName: "Ava Miller",
    parentName: "Jessica Miller",
    amount: 425.0,
    balance: 425.0,
    dueDate: "2023-05-15",
  },
];

const defaultPayment = {
  paymentNumber:
    "PAY-" +
    new Date().getFullYear() +
    "-" +
    String(Math.floor(Math.random() * 1000)).padStart(3, "0"),
  invoiceId: "",
  amount: 0,
  paymentDate: new Date().toISOString().split("T")[0],
  paymentMethod: "credit",
  status: "completed",
  notes: "",
};

const PaymentForm = ({
  paymentId,
  readOnly = false,
  onComplete = () => {},
}: PaymentFormProps) => {
  const [invoices] = useState<Invoice[]>(defaultInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: defaultPayment,
  });

  // Update selected invoice and amount when invoiceId changes
  useEffect(() => {
    const invoiceId = form.getValues("invoiceId");
    if (invoiceId) {
      const invoice = invoices.find((inv) => inv.id === invoiceId) || null;
      setSelectedInvoice(invoice);
      if (invoice && !paymentId) {
        form.setValue("amount", invoice.balance);
      }
    }
  }, [form.watch("invoiceId"), invoices, form, paymentId]);

  // Load payment data if editing
  useEffect(() => {
    if (paymentId) {
      // In a real app, you would fetch the payment data from your API
      // For this example, we'll just use a mock payment
      const mockPayment = {
        paymentNumber: "PAY-2023-001",
        invoiceId: "1",
        amount: 450.0,
        paymentDate: "2023-05-10",
        paymentMethod: "credit",
        status: "completed",
        notes: "Payment received via credit card",
      };

      form.reset(mockPayment);
      const invoice =
        invoices.find((inv) => inv.id === mockPayment.invoiceId) || null;
      setSelectedInvoice(invoice);
    }
  }, [paymentId, form, invoices]);

  const onSubmit = (data: z.infer<typeof paymentSchema>) => {
    onComplete(data);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit":
      case "debit":
        return <CreditCard className="h-5 w-5" />;
      case "cash":
        return <DollarSign className="h-5 w-5" />;
      case "check":
        return <FileText className="h-5 w-5" />;
      case "bank":
        return <Building className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {readOnly
            ? "Payment Details"
            : paymentId
              ? "Edit Payment"
              : "Record New Payment"}
        </CardTitle>
        <CardDescription>
          {readOnly
            ? "View the details of this payment"
            : paymentId
              ? "Update the payment information"
              : "Record a new payment for an invoice"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="paymentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="PAY-YYYY-XXX"
                        {...field}
                        readOnly={readOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoiceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={readOnly}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an invoice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {invoices.map((invoice) => (
                          <SelectItem key={invoice.id} value={invoice.id}>
                            {invoice.invoiceNumber} - {invoice.childName} (
                            {formatCurrency(invoice.balance)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedInvoice && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Invoice Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <span className="text-gray-500">Child:</span>{" "}
                      {selectedInvoice.childName}
                    </p>
                    <p>
                      <span className="text-gray-500">Parent:</span>{" "}
                      {selectedInvoice.parentName}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="text-gray-500">Total Amount:</span>{" "}
                      {formatCurrency(selectedInvoice.amount)}
                    </p>
                    <p>
                      <span className="text-gray-500">Balance Due:</span>{" "}
                      {formatCurrency(selectedInvoice.balance)}
                    </p>
                    <p>
                      <span className="text-gray-500">Due Date:</span>{" "}
                      {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          className="pl-7"
                          {...field}
                          readOnly={readOnly}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} readOnly={readOnly} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                      disabled={readOnly}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="credit" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                          Credit Card
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="debit" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                          Debit Card
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                          Cash
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="check" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          Check
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bank" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <Building className="h-4 w-4 mr-2 text-purple-500" />
                          Bank Transfer
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={readOnly}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes about the payment"
                      className="min-h-[100px]"
                      {...field}
                      readOnly={readOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!readOnly && (
              <div className="flex justify-end space-x-2">
                <Button type="submit">
                  {paymentId ? "Update Payment" : "Record Payment"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      {readOnly && (
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => window.print()}>
            Print Receipt
          </Button>
          <Button onClick={() => onComplete(form.getValues())}>
            Back to Payments
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PaymentForm;
