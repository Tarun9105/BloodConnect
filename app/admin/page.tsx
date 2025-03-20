"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  ChevronDown,
  Droplet,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute top-4 left-4 z-10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2 flex items-center">
              <Droplet className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-lg font-semibold">BloodConnect</h2>
            </div>
            <div className="px-4">
              <Input placeholder="Search..." />
            </div>
            <nav className="space-y-1 px-2">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/admin/donors"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Donors
              </Link>
              <Link
                href="/admin/requests"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <MessageSquare className="h-5 w-5" />
                Requests
              </Link>
              <Link
                href="/admin/appointments"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Calendar className="h-5 w-5" />
                Appointments
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <Droplet className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-lg font-semibold">BloodConnect</h1>
          </div>
          <div className="px-4 mb-6">
            <Input placeholder="Search..." />
          </div>
          <nav className="flex-1 px-2 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/donors"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Donors
            </Link>
            <Link
              href="/admin/requests"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <MessageSquare className="h-5 w-5" />
              Requests
            </Link>
            <Link
              href="/admin/appointments"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Calendar className="h-5 w-5" />
              Appointments
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        <div className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            {/* Header */}
            <header className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span>Admin User</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Dashboard Content */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="donors">Donors</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Donors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,248</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">+12%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-red-500">-8%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Donations This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">89</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">+18%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">New Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">+6%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions and updates in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 border-b pb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">New donor registered</p>
                          <p className="text-sm text-muted-foreground">John Smith (A+) registered as a new donor</p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 border-b pb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">New blood request</p>
                          <p className="text-sm text-muted-foreground">
                            City Hospital requested O- blood for emergency
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 border-b pb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Donation appointment completed</p>
                          <p className="text-sm text-muted-foreground">
                            Sarah Johnson completed her donation appointment
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Settings className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">System update</p>
                          <p className="text-sm text-muted-foreground">The system was updated to version 2.1.0</p>
                          <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="donors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donor Management</CardTitle>
                    <CardDescription>View and manage all registered donors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Input placeholder="Search donors..." className="max-w-sm" />
                      <Button>Add New Donor</Button>
                    </div>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                        <div>Name</div>
                        <div>Blood Type</div>
                        <div>Contact</div>
                        <div>Location</div>
                        <div>Last Donation</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="grid grid-cols-6 gap-4 p-4 items-center">
                            <div>John Smith</div>
                            <div>A+</div>
                            <div>john@example.com</div>
                            <div>New York, NY</div>
                            <div>{i % 2 === 0 ? "Never" : "Jan 15, 2023"}</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Requests</CardTitle>
                    <CardDescription>Manage blood donation requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Input placeholder="Search requests..." className="max-w-sm" />
                      <Button>Add New Request</Button>
                    </div>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                        <div>Requestor</div>
                        <div>Blood Type</div>
                        <div>Urgency</div>
                        <div>Location</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="grid grid-cols-6 gap-4 p-4 items-center">
                            <div>{i % 2 === 0 ? "City Hospital" : "Jane Doe"}</div>
                            <div>{["A+", "O-", "B+", "AB-", "O+"][i - 1]}</div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${i % 3 === 0 ? "bg-red-100 text-red-800" : i % 2 === 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                              >
                                {i % 3 === 0 ? "Critical" : i % 2 === 0 ? "Urgent" : "Normal"}
                              </span>
                            </div>
                            <div>Boston, MA</div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {i % 2 === 0 ? "Fulfilled" : "Pending"}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Appointments</CardTitle>
                    <CardDescription>Manage scheduled donation appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Input placeholder="Search appointments..." className="max-w-sm" />
                      <Button>Schedule Appointment</Button>
                    </div>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                        <div>Donor</div>
                        <div>Date & Time</div>
                        <div>Location</div>
                        <div>Blood Type</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="grid grid-cols-6 gap-4 p-4 items-center">
                            <div>Sarah Johnson</div>
                            <div>Mar {10 + i}, 2023 - 10:00 AM</div>
                            <div>Central Blood Bank</div>
                            <div>{["A+", "O-", "B+", "AB-", "O+"][i - 1]}</div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${i % 3 === 0 ? "bg-green-100 text-green-800" : i % 2 === 0 ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {i % 3 === 0 ? "Completed" : i % 2 === 0 ? "Confirmed" : "Scheduled"}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

