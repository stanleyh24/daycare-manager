import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Plus, Calculator } from "lucide-react";

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

const invoiceItemSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1" }),
  unitPrice: z.coerce
    .number()
    .min(0, { message: "Unit price must be at least 0" }),
});

const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Invoice number is required" }),
  childId: z.string().min(1, { message: "Child is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  items: z
    .array(invoiceItemSchema)
    .min(1, { message: "At least one item is required" }),
  notes: z.string().optional(),
});

interface InvoiceFormProps {
  invoiceId?: string;
  readOnly?: boolean;
  onComplete?: (data: z.infer<typeof invoiceSchema>) => void;
}

interface Child {
  id: string;
  name: string;
  parentName: string;
}

const defaultChildren: Child[] = [
  { id: "1", name: "Emma Johnson", parentName: "Sarah Johnson" },
  { id: "2", name: "Noah Williams", parentName: "Michael Williams" },
  { id: "3", name: "Olivia Brown", parentName: "Jennifer Brown" },
  { id: "4", name: "Liam Davis", parentName: "Robert Davis" },
  { id: "5", name: "Ava Miller", parentName: "Jessica Miller" },
];

const defaultInvoice = {
  invoiceNumber:
    "INV-" +
    new Date().getFullYear() +
    "-" +
    String(Math.floor(Math.random() * 1000)).padStart(3, "0"),
  childId: "",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  status: "pending",
  items: [
    {
      description: "Monthly Tuition",
      quantity: 1,
      unitPrice: 400,
    },
  ],
  notes: "",
};

const InvoiceForm = ({
  invoiceId,
  readOnly = false,
  onComplete = () => {},
}: InvoiceFormProps) => {
  const [children] = useState<Child[]>(defaultChildren);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [total, setTotal] = useState<number>(0);

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultInvoice,
  });

  const { fields, append, remove } = form.useFieldArray({
    name: "items",
    control: form.control,
  });

  // Calculate total whenever items change
  useEffect(() => {
    const items = form.getValues("items");
    const calculatedTotal = items.reduce((sum, item) => {
      return sum + (item.quantity || 0) * (item.unitPrice || 0);
    }, 0);
    setTotal(calculatedTotal);
  }, [form.watch("items"), form]);

  // Update selected child when childId changes
  useEffect(() => {
    const childId = form.getValues("childId");
    if (childId) {
      const child = children.find((c) => c.id === childId) || null;
      setSelectedChild(child);
    }
  }, [form.watch("childId"), children]);

  // Load invoice data if editing
  useEffect(() => {
    if (invoiceId) {
      // In a real app, you would fetch the invoice data from your API
      // For this example, we'll just use a mock invoice
      const mockInvoice = {
        invoiceNumber: "INV-2023-001",
        childId: "1",
        issueDate: "2023-05-01",
        dueDate: "2023-05-15",
        status: "pending",
        items: [
          {
            description: "Monthly Tuition - May 2023",
            quantity: 1,
            unitPrice: 400,
          },
          {
            description: "Activity Fee",
            quantity: 1,
            unitPrice: 50,
          },
        ],
        notes: "Please pay by the due date to avoid late fees.",
      };

      form.reset(mockInvoice);
      const child = children.find((c) => c.id === mockInvoice.childId) || null;
      setSelectedChild(child);
    }
  }, [invoiceId, form, children]);

  const onSubmit = (data: z.infer<typeof invoiceSchema>) => {
    onComplete(data);
  };

  const addItem = () => {
    append({
      description: "",
      quantity: 1,
      unitPrice: 0,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {readOnly
            ? "Invoice Details"
            : invoiceId
              ? "Edit Invoice"
              : "Create New Invoice"}
        </CardTitle>
        <CardDescription>
          {readOnly
            ? "View the details of this invoice"
            : invoiceId
              ? "Update the invoice information"
              : "Create a new invoice for a child"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="INV-YYYY-XXX"
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
                name="childId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={readOnly}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a child" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {children.map((child) => (
                          <SelectItem key={child.id} value={child.id}>
                            {child.name} ({child.parentName})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} readOnly={readOnly} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} readOnly={readOnly} />
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Invoice Items</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-3">Unit Price</div>
                  <div className="col-span-1"></div>
                </div>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-6">
                      <FormField
                        control={form.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Item description"
                                {...field}
                                readOnly={readOnly}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                {...field}
                                readOnly={readOnly}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`items.${index}.unitPrice`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5">
                                  $
                                </span>
                                <Input
                                  type="number"
                                  min="0"
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
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {!readOnly && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          disabled={fields.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {!readOnly && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes or payment instructions"
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
                  {invoiceId ? "Update Invoice" : "Create Invoice"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      {readOnly && (
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => window.print()}>
            Print Invoice
          </Button>
          <Button onClick={() => onComplete(form.getValues())}>
            Back to Invoices
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default InvoiceForm;
