"use client"

import { type ReactElement, useState } from "react"
import Link from "next/link"
import { Droplet, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"

// Sample blood request data
const bloodRequests = [
  {
    id: 1,
    patientName: "John Doe",
    bloodType: "A+",
    units: 2,
    hospital: "City General Hospital",
    urgency: "High",
    location: "New York, NY",
    contactNumber: "+1 (555) 123-4567",
    postedDate: "2024-03-20",
    status: "Active",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    bloodType: "O-",
    units: 1,
    hospital: "Memorial Hospital",
    urgency: "Medium",
    location: "Los Angeles, CA",
    contactNumber: "+1 (555) 987-6543",
    postedDate: "2024-03-19",
    status: "Active",
  },
  // Add more sample requests as needed
]

export default function RequestsPage(): ReactElement {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBloodType, setSelectedBloodType] = useState("all")
  const [selectedUrgency, setSelectedUrgency] = useState("all")

  // Filter requests based on search query and filters
  const filteredRequests = bloodRequests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBloodType = selectedBloodType === "all" ? true : request.bloodType === selectedBloodType
    const matchesUrgency = selectedUrgency === "all" ? true : request.urgency === selectedUrgency

    return matchesSearch && matchesBloodType && matchesUrgency
  })

  const getUrgencyColor = (urgency: string): string => {
    switch (urgency.toLowerCase()) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-orange-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Droplet className="h-8 w-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">BloodConnect</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-white/80 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-white/80 font-medium">
              About
            </Link>
            <Link href="/donor" className="text-white hover:text-white/80 font-medium">
              Donor
            </Link>
            <Link href="/requests" className="text-white hover:text-white/80 font-medium">
              Requests
            </Link>
            <Link href="/contact" className="text-white hover:text-white/80 font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Blood Requests</h2>
          <Link href="/requests/new">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Create New Request
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by location, hospital, or patient name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blood Types</SelectItem>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency Levels</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Requests List */}
        <div className="grid gap-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{request.patientName}</h3>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Blood Type:</span> {request.bloodType}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Units Required:</span> {request.units}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Hospital:</span> {request.hospital}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Location:</span> {request.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Contact:</span> {request.contactNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`font-medium ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency} Urgency
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Posted on {request.postedDate}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Contact
                  </Button>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Respond to Request
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No blood requests found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 