"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DonorPage() {
  const eligibilityCriteria = [
    "Age between 18-65 years",
    "Weight above 50kg",
    "No chronic medical conditions",
    "No recent surgeries",
    "No current medications",
    "Good general health",
  ]

  const donationProcess = [
    {
      title: "Registration",
      description: "Fill out necessary forms and provide identification",
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
    },
    {
      title: "Health Screening",
      description: "Quick medical check-up and blood pressure measurement",
      icon: <AlertCircle className="w-6 h-6 text-primary" />,
    },
    {
      title: "Donation",
      description: "The actual donation process takes about 10-15 minutes",
      icon: <Clock className="w-6 h-6 text-primary" />,
    },
    {
      title: "Recovery",
      description: "Short rest period with refreshments provided",
      icon: <Calendar className="w-6 h-6 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary text-2xl">🩸</span>
            <span className="text-xl font-bold">BloodConnect</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link href="/donor" className="text-primary font-medium">
              Donor
            </Link>
            <Link href="/requests" className="text-gray-600 hover:text-primary">
              Requests
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Become a Blood Donor</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your donation can save up to three lives. Join our community of donors and make a difference today.
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg">
              Register as Donor
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Eligibility Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Eligibility Criteria</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-6">Basic Requirements</h3>
              <ul className="space-y-4">
                {eligibilityCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-6">Important Notes</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• Must wait 56 days between whole blood donations</li>
                <li>• Must not have had a tattoo in the last 4 months</li>
                <li>• Must not have traveled to certain countries recently</li>
                <li>• Must not have certain medical conditions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Donation Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Donation Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {donationProcess.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4">{step.icon}</div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of blood donors and help save lives. Register now to start your journey of making a difference.
          </p>
          <Link href="/register">
            <Button size="lg">Register as Donor</Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="#" className="hover:opacity-80">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Instagram size={24} />
            </Link>
          </div>
          <p className="mb-4">Contact us at: <a href="mailto:info@bloodconnect.com" className="underline">info@bloodconnect.com</a></p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            Get Involved
          </Link>
        </div>
      </footer>
    </div>
  )
} 