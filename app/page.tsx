import { CustomerChat } from "@/components/CustomerChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowRight, MessageSquare, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-4 pointer-events-none">
        {Array.from({ length: 12 * 8 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-gray-800/20 h-full" />
        ))}
      </div>

      {/* Blue Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-white rounded-md" />
          <span className="font-medium">Support Hub</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Home
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Help Center
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              FAQs
            </a>
          </div>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            Resources
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Get Support
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-12">
        {/* Beta Banner */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm">✨ 24/7 Customer Support Available!</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-medium mb-6 leading-tight">
            Excellence in Every
            <br />
            Customer Interaction.
          </h1>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Customer service shouldn&apos;t be complicated. We&apos;re here to
            provide you with seamless support and solutions when you need them
            most.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/customerchat">
              <Button className="bg-indigo-600 hover:bg-indigo-700 px-6">
                The Admin Chat Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#0A0B0F]"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                Trusted by over +50K
                <br />
                satisfied customers.
              </span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {/* Phone Support */}
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h3 className="text-lg font-medium mb-2">24/7 Phone Support</h3>
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-xl">Support Line</span>
                </div>
                <Button variant="ghost" size="sm">
                  Call Now
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-mono">1-800-SUPPORT</span>
                </div>
                <Button variant="ghost" size="sm">
                  Copy
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h3 className="text-lg font-medium mb-2">24/7 Phone Support</h3>
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-xl">Support Line</span>
                </div>
                <Button variant="ghost" size="sm">
                  Call Now
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-mono">1-800-SUPPORT</span>
                </div>
                <Button variant="ghost" size="sm">
                  Copy
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h3 className="text-lg font-medium mb-2">24/7 Phone Support</h3>
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-xl">Support Line</span>
                </div>
                <Button variant="ghost" size="sm">
                  Call Now
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-mono">1-800-SUPPORT</span>
                </div>
                <Button variant="ghost" size="sm">
                  Copy
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <CustomerChat />
    </div>
  );
}
