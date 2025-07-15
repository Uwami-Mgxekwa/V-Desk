"use client"

import { useState } from "react"
import { TechnicianDashboard } from "@/components/technician-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { EndUserDashboard } from "@/components/end-user-dashboard"
import { Button } from "@/components/ui/button"
import { User, Shield, Users } from "lucide-react"

type UserRole = "technician" | "admin" | "enduser"

export default function Page() {
  const [currentRole, setCurrentRole] = useState<UserRole>("technician")

  const renderDashboard = () => {
    switch (currentRole) {
      case "technician":
        return <TechnicianDashboard />
      case "admin":
        return <AdminDashboard />
      case "enduser":
        return <EndUserDashboard />
      default:
        return <TechnicianDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Role Switcher - Demo purposes */}
      <div className="border-b bg-muted/40 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Issue Management System</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Switch Role:</span>
            <Button
              variant={currentRole === "technician" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentRole("technician")}
            >
              <User className="w-4 h-4 mr-2" />
              Technician
            </Button>
            <Button
              variant={currentRole === "admin" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentRole("admin")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Administrator
            </Button>
            <Button
              variant={currentRole === "enduser" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentRole("enduser")}
            >
              <Users className="w-4 h-4 mr-2" />
              End User
            </Button>
          </div>
        </div>
      </div>

      {renderDashboard()}
    </div>
  )
}
