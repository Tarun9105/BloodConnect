"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Droplet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function RegisterPage() {
  const [userType, setUserType] = useState("donor")
  const [isLoading, setIsLoading] = useState(false)

  // Donor form state
  const [donorForm, setDonorForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    bloodType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    hasDonatedBefore: "no",
    hasMedicalConditions: "no",
  })

  // Acceptor form state
  const [acceptorForm, setAcceptorForm] = useState({
    acceptorName: "",
    acceptorType: "",
    acceptorEmail: "",
    acceptorPhone: "",
    acceptorPassword: "",
    acceptorConfirmPassword: "",
    acceptorAddress: "",
    acceptorCity: "",
    acceptorState: "",
    acceptorZipCode: "",
    acceptorLicense: "",
  })

  const { signUp } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleDonorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setDonorForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleAcceptorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setAcceptorForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (donorForm.password !== donorForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // Prepare user data for Firebase
      const userData = {
        displayName: `${donorForm.firstName} ${donorForm.lastName}`,
        role: "donor",
        phoneNumber: donorForm.phone,
        bloodType: donorForm.bloodType,
        address: donorForm.address,
        city: donorForm.city,
        state: donorForm.state,
        zipCode: donorForm.zipCode,
        dateOfBirth: donorForm.dob,
        gender: donorForm.gender,
        hasDonatedBefore: donorForm.hasDonatedBefore === "yes",
        hasMedicalConditions: donorForm.hasMedicalConditions === "yes",
      }

      await signUp(donorForm.email, donorForm.password, userData)

      toast({
        title: "Success",
        description: "Your donor account has been created successfully",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (acceptorForm.acceptorPassword !== acceptorForm.acceptorConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // Prepare user data for Firebase
      const userData = {
        displayName: acceptorForm.acceptorName,
        role: "acceptor",
        phoneNumber: acceptorForm.acceptorPhone,
        acceptorType: acceptorForm.acceptorType,
        address: acceptorForm.acceptorAddress,
        city: acceptorForm.acceptorCity,
        state: acceptorForm.acceptorState,
        zipCode: acceptorForm.acceptorZipCode,
        licenseNumber: acceptorForm.acceptorLicense,
      }

      await signUp(acceptorForm.acceptorEmail, acceptorForm.acceptorPassword, userData)

      toast({
        title: "Success",
        description: "Your acceptor account has been created successfully",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted">
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
            <Link href="/donors" className="text-white hover:text-white/80 font-medium">
              Donors
            </Link>
            <Link href="/requests" className="text-white hover:text-white/80 font-medium">
              Requests
            </Link>
            <Link href="/contact" className="text-white hover:text-white/80 font-medium">
              Contact
            </Link>
          </nav>
          <div>
            <Link href="/login">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Create an Account</CardTitle>
            <CardDescription>Join our community to donate or request blood</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="donor" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="donor">Register as Donor</TabsTrigger>
                <TabsTrigger value="acceptor">Register as Acceptor</TabsTrigger>
              </TabsList>

              <TabsContent value="donor">
                <form onSubmit={handleDonorSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={donorForm.firstName}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={donorForm.lastName}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={donorForm.email}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={donorForm.phone}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={donorForm.password}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={donorForm.confirmPassword}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={donorForm.dob}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value) => setDonorForm((prev) => ({ ...prev, gender: value }))}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        onValueChange={(value) => setDonorForm((prev) => ({ ...prev, bloodType: value }))}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="bloodType">
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      value={donorForm.address}
                      onChange={handleDonorChange}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={donorForm.city}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={donorForm.state}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="Zip Code"
                        value={donorForm.zipCode}
                        onChange={handleDonorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Have you donated blood before?</Label>
                    <RadioGroup
                      defaultValue="no"
                      className="flex space-x-4"
                      value={donorForm.hasDonatedBefore}
                      onValueChange={(value) => setDonorForm((prev) => ({ ...prev, hasDonatedBefore: value }))}
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="donatedYes" />
                        <Label htmlFor="donatedYes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="donatedNo" />
                        <Label htmlFor="donatedNo">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Do you have any medical conditions?</Label>
                    <RadioGroup
                      defaultValue="no"
                      className="flex space-x-4"
                      value={donorForm.hasMedicalConditions}
                      onValueChange={(value) => setDonorForm((prev) => ({ ...prev, hasMedicalConditions: value }))}
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="medicalYes" />
                        <Label htmlFor="medicalYes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="medicalNo" />
                        <Label htmlFor="medicalNo">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Register as Donor"}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Login
                    </Link>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="acceptor">
                <form onSubmit={handleAcceptorSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="acceptorName">Name</Label>
                      <Input
                        id="acceptorName"
                        placeholder="Enter your name or organization name"
                        value={acceptorForm.acceptorName}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acceptorType">Acceptor Type</Label>
                      <Select
                        onValueChange={(value) => setAcceptorForm((prev) => ({ ...prev, acceptorType: value }))}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="acceptorType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="bloodBank">Blood Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="acceptorEmail">Email</Label>
                      <Input
                        id="acceptorEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={acceptorForm.acceptorEmail}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acceptorPhone">Phone Number</Label>
                      <Input
                        id="acceptorPhone"
                        placeholder="Enter your phone number"
                        value={acceptorForm.acceptorPhone}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="acceptorPassword">Password</Label>
                      <Input
                        id="acceptorPassword"
                        type="password"
                        placeholder="Create a password"
                        value={acceptorForm.acceptorPassword}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acceptorConfirmPassword">Confirm Password</Label>
                      <Input
                        id="acceptorConfirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={acceptorForm.acceptorConfirmPassword}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="acceptorAddress">Address</Label>
                    <Input
                      id="acceptorAddress"
                      placeholder="Enter your address"
                      value={acceptorForm.acceptorAddress}
                      onChange={handleAcceptorChange}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="acceptorCity">City</Label>
                      <Input
                        id="acceptorCity"
                        placeholder="City"
                        value={acceptorForm.acceptorCity}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acceptorState">State</Label>
                      <Input
                        id="acceptorState"
                        placeholder="State"
                        value={acceptorForm.acceptorState}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acceptorZipCode">Zip Code</Label>
                      <Input
                        id="acceptorZipCode"
                        placeholder="Zip Code"
                        value={acceptorForm.acceptorZipCode}
                        onChange={handleAcceptorChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="acceptorLicense">License/Registration Number (for hospitals/blood banks)</Label>
                    <Input
                      id="acceptorLicense"
                      placeholder="Enter license or registration number if applicable"
                      value={acceptorForm.acceptorLicense}
                      onChange={handleAcceptorChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Register as Acceptor"}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Login
                    </Link>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

