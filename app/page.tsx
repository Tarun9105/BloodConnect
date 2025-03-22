"use client"

import { type ReactElement } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Droplet, Search, Users, LogOut, User, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useStats } from "@/hooks/use-stats"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function HomePage(): ReactElement {
  const { user, userData, signOut } = useAuth()
  const { stats, isLoading, error } = useStats()

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Droplet className="h-8 w-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">BloodConnect</h1>
          </div>
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
          <div className="flex space-x-3">
            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="hidden md:block">
                  <Button className="bg-white text-primary hover:bg-white/90">Register</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                    <User className="h-4 w-4 mr-2" />
                    {userData?.displayName || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[url('/images/blood_donation.jpg')] bg-cover bg-center min-h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
          <div className="space-y-8">
            <h1 className="text-7xl md:text-9xl font-bold text-white leading-tight">
              Donate Blood,<br />
              <span className="text-primary">Save Lives</span>
            </h1>
            <p className="text-2xl md:text-4xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Your donation can make a difference in someone's life.<br />
              Join our community of donors today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <Link href="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-xl px-12 py-8 rounded-full transform hover:scale-105 transition-all duration-300">
                  Become a Donor
                </Button>
              </Link>
              <Link href="/requests">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-xl px-12 py-8 rounded-full border-white transform hover:scale-105 transition-all duration-300">
                  Request Blood
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-16">
              <Link 
                href="/blood-types" 
                className="text-white/80 hover:text-white flex items-center justify-center group"
              >
                <span className="text-xl">Learn about Blood Types</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-white/80 hover:text-white flex items-center justify-center group"
              >
                <span className="text-xl">How It Works</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/register" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Register</h3>
                <p className="text-gray-600">Create your account and join our community of donors.</p>
              </div>
            </Link>
            <Link href="/donors" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Donors</h3>
                <p className="text-gray-600">Search for blood donors based on type and location.</p>
              </div>
            </Link>
            <Link href="/appointments" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                <p className="text-gray-600">Book your donation appointment at a convenient time.</p>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/how-it-works"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Learn More About the Process
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-10 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded"></div>
                </div>
              ) : error ? (
                <div className="text-white/80">
                  <h3 className="text-4xl font-bold mb-2">-</h3>
                  <p className="text-white/80">Registered Donors</p>
                </div>
              ) : (
                <>
                  <h3 className="text-4xl font-bold mb-2">{stats.registeredDonors}+</h3>
                  <p className="text-white/80">Registered Donors</p>
                </>
              )}
            </div>
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-10 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded"></div>
                </div>
              ) : error ? (
                <div className="text-white/80">
                  <h3 className="text-4xl font-bold mb-2">-</h3>
                  <p className="text-white/80">Successful Donations</p>
                </div>
              ) : (
                <>
                  <h3 className="text-4xl font-bold mb-2">{stats.successfulDonations}+</h3>
                  <p className="text-white/80">Successful Donations</p>
                </>
              )}
            </div>
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-10 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded"></div>
                </div>
              ) : error ? (
                <div className="text-white/80">
                  <h3 className="text-4xl font-bold mb-2">-</h3>
                  <p className="text-white/80">Lives Saved</p>
                </div>
              ) : (
                <>
                  <h3 className="text-4xl font-bold mb-2">{stats.livesSaved}+</h3>
                  <p className="text-white/80">Lives Saved</p>
                </>
              )}
            </div>
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-10 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded"></div>
                </div>
              ) : error ? (
                <div className="text-white/80">
                  <h3 className="text-4xl font-bold mb-2">-</h3>
                  <p className="text-white/80">Partner Hospitals</p>
                </div>
              ) : (
                <>
                  <h3 className="text-4xl font-bold mb-2">{stats.partnerHospitals}+</h3>
                  <p className="text-white/80">Partner Hospitals</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Donate Blood?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Lives</h3>
              <p className="text-gray-600">One donation can save up to three lives. Your blood can help patients in critical need.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Benefits</h3>
              <p className="text-gray-600">Regular donation helps maintain healthy iron levels and reduces the risk of heart disease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
              <p className="text-gray-600">Join a community of donors and make a lasting impact on your local healthcare system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Emergency Blood Need?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            If you're in urgent need of blood, our emergency response team is available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/emergency">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
                Emergency Request
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 text-lg px-8 py-6">
                Contact Emergency Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of donors and help save lives. Your contribution matters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Register as Donor
              </Button>
            </Link>
            <Link href="/learn-more">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Droplet className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-bold">BloodConnect</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Connecting donors with those in need to save lives through blood donation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/donors" className="text-muted-foreground hover:text-primary">
                    Find Donors
                  </Link>
                </li>
                <li>
                  <Link href="/requests" className="text-muted-foreground hover:text-primary">
                    Blood Requests
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/eligibility" className="text-muted-foreground hover:text-primary">
                    Eligibility
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="not-italic text-muted-foreground">
                <p className="mb-2">123 Blood Center St.</p>
                <p className="mb-2">City, State 12345</p>
                <p className="mb-2">Email: info@bloodconnect.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

