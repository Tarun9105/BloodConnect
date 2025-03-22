"use client"

import Link from "next/link"
import { Droplet, ArrowLeft } from "lucide-react"

export default function BloodTypesPage() {
  const bloodTypes = [
    {
      type: "A+",
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
      description: "A positive blood type is one of the most common blood types.",
    },
    {
      type: "A-",
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"],
      description: "A negative blood type is rare and valuable for donations.",
    },
    {
      type: "B+",
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
      description: "B positive blood type is common in certain populations.",
    },
    {
      type: "B-",
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"],
      description: "B negative blood type is rare and valuable for donations.",
    },
    {
      type: "AB+",
      canDonateTo: ["AB+"],
      canReceiveFrom: ["All Types"],
      description: "AB positive is the universal recipient blood type.",
    },
    {
      type: "AB-",
      canDonateTo: ["AB+", "AB-"],
      canReceiveFrom: ["A-", "B-", "AB-", "O-"],
      description: "AB negative is one of the rarest blood types.",
    },
    {
      type: "O+",
      canDonateTo: ["A+", "B+", "AB+", "O+"],
      canReceiveFrom: ["O+", "O-"],
      description: "O positive is the most common blood type.",
    },
    {
      type: "O-",
      canDonateTo: ["All Types"],
      canReceiveFrom: ["O-"],
      description: "O negative is the universal donor blood type.",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-white hover:text-white/80">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <Droplet className="h-8 w-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">BloodConnect</h1>
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blood Types and Compatibility</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding blood types and their compatibility is crucial for successful blood donation.
            Learn about your blood type and how it can help others.
          </p>
        </div>

        {/* Blood Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bloodTypes.map((bloodType) => (
            <div
              key={bloodType.type}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{bloodType.type}</h3>
              </div>
              <p className="text-gray-600 mb-4">{bloodType.description}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Can Donate To:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {bloodType.canDonateTo.map((type) => (
                      <li key={type}>{type}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Can Receive From:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {bloodType.canReceiveFrom.map((type) => (
                      <li key={type}>{type}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Important Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Universal Donor</h3>
              <p className="text-gray-600">
                O negative blood type is known as the universal donor because it can be given to patients of any blood type.
                This makes it particularly valuable in emergency situations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Universal Recipient</h3>
              <p className="text-gray-600">
                AB positive blood type is known as the universal recipient because they can receive blood from any blood type.
                However, they can only donate to other AB positive recipients.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Rare Blood Types</h3>
              <p className="text-gray-600">
                AB negative and B negative are among the rarest blood types. Regular donations from these blood types are
                crucial for maintaining adequate blood supply.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Blood Type Distribution</h3>
              <p className="text-gray-600">
                Blood type distribution varies by population and ethnicity. Understanding this helps in maintaining a diverse
                blood supply to meet community needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 