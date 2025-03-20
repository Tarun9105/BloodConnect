"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, ChevronDown, Droplet, LogOut, MessageSquare, Search, Settings, User } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardPage() {
  const { user, userData, loading, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !userData) {
    return null // This will redirect in the useEffect
  }

  const isDonor = userData.role === "donor"

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Droplet className="h-8 w-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">BloodConnect</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span>{userData.displayName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {isDonor ? (
            <Link href="/appointments/schedule">
              <Button>Schedule Donation</Button>
            </Link>
          ) : (
            <Link href="/requests/new">
              <Button>Request Blood</Button>
            </Link>
          )}
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {isDonor ? (
              <>
                <TabsTrigger value="donations">My Donations</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="requests">My Requests</TabsTrigger>
                <TabsTrigger value="donors">Find Donors</TabsTrigger>
              </>
            )}
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Welcome, {userData.displayName}</CardTitle>
                  <CardDescription>
                    {isDonor ? "Thank you for being a blood donor!" : "Thank you for being part of our community!"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{userData.email}</span>
                    </div>
                    {isDonor && userData.bloodType && (
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Blood Type: <strong>{userData.bloodType}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {isDonor ? (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Donation Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Donations</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Donation</span>
                          <span className="font-medium">Never</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Next Eligible Date</span>
                          <span className="font-medium">Now</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Upcoming Appointment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">You have no upcoming appointments</p>
                        <Link href="/appointments/schedule">
                          <Button variant="outline" size="sm">
                            Schedule Donation
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Request Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Requests</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Active Requests</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Fulfilled Requests</span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Link href="/requests/new">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            New Blood Request
                          </Button>
                        </Link>
                        <Link href="/donors">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Search className="mr-2 h-4 w-4" />
                            Find Donors
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent activity to display</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isDonor ? (
            <>
              <TabsContent value="donations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation History</CardTitle>
                    <CardDescription>Record of your blood donations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>You haven't made any donations yet</p>
                      <Link href="/appointments/schedule" className="mt-4 inline-block">
                        <Button>Schedule Your First Donation</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>My Appointments</CardTitle>
                        <CardDescription>Manage your donation appointments</CardDescription>
                      </div>
                      <Link href="/appointments/schedule">
                        <Button>Schedule New</Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>You have no scheduled appointments</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="requests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>My Blood Requests</CardTitle>
                        <CardDescription>Manage your blood requests</CardDescription>
                      </div>
                      <Link href="/requests/new">
                        <Button>New Request</Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>You haven't made any blood requests yet</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="donors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Find Blood Donors</CardTitle>
                    <CardDescription>Search for eligible donors by blood type and location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">Blood Type</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="">Any Blood Type</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input type="text" placeholder="City or Zip Code" className="w-full p-2 border rounded-md" />
                      </div>
                    </div>
                    <Button className="w-full">Search Donors</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={userData.displayName || ""}
                        className="w-full p-2 border rounded-md"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={userData.email || ""}
                        className="w-full p-2 border rounded-md"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="text"
                        value={userData.phoneNumber || ""}
                        className="w-full p-2 border rounded-md"
                        disabled
                      />
                    </div>
                    {isDonor && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Blood Type</label>
                        <input
                          type="text"
                          value={userData.bloodType || ""}
                          className="w-full p-2 border rounded-md"
                          disabled
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Link href="/profile/edit">
                      <Button>Edit Profile</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

