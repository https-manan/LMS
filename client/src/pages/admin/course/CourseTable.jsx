import { Button } from '@/components/ui/button'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link, Outlet, useNavigate } from 'react-router-dom'

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const CourseTable = () => {
  return (
    <div className="p-6 mt-9 bg-gray-50 min-h-screen">
      <Link to='/admin/course/create'>
        <Button  className="mb-6 bg-black text-white hover:bg-black/90 rounded-lg px-5 py-2">
            Create new course
        </Button>
      </Link>
      <div flex>
              <div className="bg-white rounded-xl shadow-sm border">
        <Table>

          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-[400px] text-gray-500 font-medium">
                Title
              </TableHead>
              <TableHead className="text-gray-500 font-medium text-right">
                Price
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Status
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.invoice}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <TableCell className="font-medium py-4">
                  {invoice.invoice}
                </TableCell>

                <TableCell className="text-right py-4">
                  {invoice.totalAmount}
                </TableCell>

                <TableCell className="py-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    {invoice.paymentStatus}
                  </span>
                </TableCell>

                <TableCell className="py-4">
                  <Button className="bg-gray-100 text-black hover:bg-gray-200 rounded-md px-4 py-1.5">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter />
        </Table>
      </div>
      </div>
    </div>
  )
}

export default CourseTable
