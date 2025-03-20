"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/about" className="text-primary font-medium">
              About
            </Link>
            <Link href="/donor" className="text-gray-600 hover:text-primary">
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">About Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At BloodConnect, our mission is to ensure a reliable supply of safe blood through a robust donor management system. We strive to connect donors with those in need and make the process seamless and efficient.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white border p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              We envision a world where everyone has timely access to the blood they need. Through technology and community engagement, we aim to bridge the gap between donors and recipients.
            </p>
          </div>

          {/* Values */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Compassion</li>
              <li>Integrity</li>
              <li>Innovation</li>
              <li>Community</li>
            </ul>
          </div>

          {/* Impact */}
          <div className="bg-white border p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-700">
              Since our inception, BloodConnect has facilitated thousands of successful blood donations, helping save countless lives and supporting communities worldwide.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                "BloodConnect made donating blood a breeze! The staff was friendly, and the process was simple. I feel great knowing my donation can save lives." - Alex Turner
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                "As a recipient, I am incredibly thankful for BloodConnect's efforts. Their system ensured I received the blood I needed promptly." - Jamie Lee
              </p>
            </div>
          </div>
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