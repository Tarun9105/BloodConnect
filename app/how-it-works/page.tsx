"use client"

import Link from "next/link"
import { Droplet, User, Calendar, Heart, Shield, Clock } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: User,
      title: "Register",
      description: "Create your account and complete your profile with your blood type and contact information.",
    },
    {
      icon: Calendar,
      title: "Schedule Appointment",
      description: "Choose a convenient time and location for your donation.",
    },
    {
      icon: Shield,
      title: "Health Check",
      description: "Complete a quick health screening to ensure you're eligible to donate.",
    },
    {
      icon: Droplet,
      title: "Donate Blood",
      description: "The donation process takes about 8-10 minutes. You'll be monitored throughout.",
    },
    {
      icon: Clock,
      title: "Recovery",
      description: "Rest for 15 minutes after donation and enjoy refreshments provided.",
    },
    {
      icon: Heart,
      title: "Save Lives",
      description: "Your donation can save up to three lives. Track your impact in your dashboard.",
    },
  ]

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
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-gray-600">
            Learn about the blood donation process and how you can make a difference
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Eligibility Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Eligibility Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">You can donate if you:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Are at least 18 years old</li>
                <li>Weigh at least 50 kg</li>
                <li>Are in good health</li>
                <li>Have not donated blood in the last 56 days</li>
                <li>Have no recent tattoos or piercings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">You cannot donate if you:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Have any blood-borne diseases</li>
                <li>Are pregnant or recently gave birth</li>
                <li>Have taken certain medications recently</li>
                <li>Have traveled to high-risk areas</li>
                <li>Have had recent surgery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/appointments"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Schedule Your Donation
          </Link>
        </div>
      </div>
    </main>
  )
} 