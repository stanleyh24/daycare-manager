import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, DollarSign, FileText, CreditCard } from "lucide-react";

import InvoiceList from "./InvoiceList";
import PaymentList from "./PaymentList";
import InvoiceForm from "./InvoiceForm";
import PaymentForm from "./PaymentForm";

type BillingView =
  | "invoices"
  | "payments"
  | "createInvoice"
  | "createPayment"
  | "viewInvoice"
  | "viewPayment";

interface BillingModuleProps {
  initialView?: BillingView;
  selectedInvoiceId?: string;
  selectedPaymentId?: string;
}

const BillingModule = ({
  initialView = "invoices",
  selectedInvoiceId = "",
  selectedPaymentId = "",
}: BillingModuleProps) => {
  const [view, setView] = useState<BillingView>(initialView);
  const [invoiceId, setInvoiceId] = useState<string>(selectedInvoiceId);
  const [paymentId, setPaymentId] = useState<string>(selectedPaymentId);
  const [activeTab, setActiveTab] = useState<string>("invoices");

  const handleCreateInvoice = () => {
    setView("createInvoice");
  };

  const handleCreatePayment = () => {
    setView("createPayment");
  };

  const handleViewInvoice = (id: string) => {
    setInvoiceId(id);
    setView("viewInvoice");
  };

  const handleViewPayment = (id: string) => {
    setPaymentId(id);
    setView("viewPayment");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "invoices") {
      setView("invoices");
    } else if (value === "payments") {
      setView("payments");
    }
  };

  const handleBackToList = () => {
    if (activeTab === "invoices") {
      setView("invoices");
    } else {
      setView("payments");
    }
  };

  const handleInvoiceComplete = (data: any) => {
    console.log("Invoice created:", data);
    setView("invoices");
  };

  const handlePaymentComplete = (data: any) => {
    console.log("Payment recorded:", data);
    setView("payments");
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Billing & Payments
            </h1>
            <p className="text-gray-500 mt-1">
              Manage invoices, record payments, and track financial transactions
            </p>
          </div>

          <div className="flex gap-2">
            {view !== "invoices" && view !== "payments" && (
              <Button variant="outline" onClick={handleBackToList}>
                Back to List
              </Button>
            )}
            {view === "invoices" && (
              <Button onClick={handleCreateInvoice}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            )}
            {view === "payments" && (
              <Button onClick={handleCreatePayment}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="bg-white rounded-lg shadow-sm">
          {(view === "invoices" || view === "payments") && (
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="invoices" className="mt-0">
                <InvoiceList
                  onViewInvoice={handleViewInvoice}
                  onCreateInvoice={handleCreateInvoice}
                />
              </TabsContent>

              <TabsContent value="payments" className="mt-0">
                <PaymentList
                  onViewPayment={handleViewPayment}
                  onCreatePayment={handleCreatePayment}
                />
              </TabsContent>
            </Tabs>
          )}

          {view === "createInvoice" && (
            <div className="p-6">
              <InvoiceForm onComplete={handleInvoiceComplete} />
            </div>
          )}

          {view === "createPayment" && (
            <div className="p-6">
              <PaymentForm onComplete={handlePaymentComplete} />
            </div>
          )}

          {view === "viewInvoice" && (
            <div className="p-6">
              <InvoiceForm
                invoiceId={invoiceId}
                readOnly={true}
                onComplete={handleInvoiceComplete}
              />
            </div>
          )}

          {view === "viewPayment" && (
            <div className="p-6">
              <PaymentForm
                paymentId={paymentId}
                readOnly={true}
                onComplete={handlePaymentComplete}
              />
            </div>
          )}
        </div>

        {/* Quick stats or info cards - only shown on list views */}
        {(view === "invoices" || view === "payments") && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Total Invoiced</h3>
                  <p className="text-3xl font-bold">$24,850</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-green-500 font-medium">↑ 8%</span> from
                last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Total Received</h3>
                  <p className="text-3xl font-bold">$22,340</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-green-500 font-medium">↑ 12%</span> from
                last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Outstanding</h3>
                  <p className="text-3xl font-bold">$2,510</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-red-500 font-medium">4</span> overdue
                invoices
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingModule;
