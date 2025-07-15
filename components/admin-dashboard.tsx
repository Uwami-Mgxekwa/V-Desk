"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, Settings, BarChart3, Download, UserCheck, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const ticketAnalytics = [
  { name: "Mon", open: 12, resolved: 8 },
  { name: "Tue", open: 15, resolved: 12 },
  { name: "Wed", open: 8, resolved: 14 },
  { name: "Thu", open: 18, resolved: 16 },
  { name: "Fri", open: 22, resolved: 18 },
  { name: "Sat", open: 5, resolved: 8 },
  { name: "Sun", open: 3, resolved: 5 },
]

const priorityData = [
  { name: "Low", value: 35, color: "#10b981" },
  { name: "Medium", value: 40, color: "#f59e0b" },
  { name: "High", value: 20, color: "#f97316" },
  { name: "Urgent", value: 5, color: "#ef4444" },
]

const technicians = [
  {
    id: "1",
    name: "John Smith",
    email: "john@company.com",
    role: "Senior Technician",
    status: "active",
    tickets: 15,
    avgResolution: "2.4h",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Technician",
    status: "active",
    tickets: 12,
    avgResolution: "3.1h",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike@company.com",
    role: "Junior Technician",
    status: "active",
    tickets: 8,
    avgResolution: "4.2h",
  },
  {
    id: "4",
    name: "Lisa Chen",
    email: "lisa@company.com",
    role: "Technician",
    status: "offline",
    tickets: 10,
    avgResolution: "2.8h",
  },
]

export function AdminDashboard() {
  const [selectedTechnician, setSelectedTechnician] = useState("")

  const exportData = (type: string) => {
    // Simulate export functionality
    const data = type === "tickets" ? "Ticket data exported" : "Performance data exported"
    alert(`${data} - This would download a CSV/PDF file`)
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-muted-foreground">System Administrator</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users className="w-4 h-4" />
                <span>Technicians</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="w-4 h-4" />
                <span>System Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Download className="w-4 h-4" />
                <span>Reports</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">Administrator Dashboard</h1>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Technicians</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 offline</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.1h</div>
                <p className="text-xs text-muted-foreground">-0.3h from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">+2% from last week</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="analytics" className="space-y-4">
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="technicians">Technicians</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Trends</CardTitle>
                    <CardDescription>Open vs Resolved tickets over the last week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={ticketAnalytics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="open" fill="#3b82f6" name="Open" />
                        <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Priority Distribution</CardTitle>
                    <CardDescription>Breakdown of tickets by priority level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={priorityData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {priorityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="technicians">
              <Card>
                <CardHeader>
                  <CardTitle>Technician Management</CardTitle>
                  <CardDescription>Manage technician assignments and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Filter by technician" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Technicians</SelectItem>
                          {technicians.map((tech) => (
                            <SelectItem key={tech.id} value={tech.id}>
                              {tech.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button>Add Technician</Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Technician</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Active Tickets</TableHead>
                          <TableHead>Avg Resolution</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {technicians.map((tech) => (
                          <TableRow key={tech.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {tech.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{tech.name}</p>
                                  <p className="text-sm text-muted-foreground">{tech.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{tech.role}</TableCell>
                            <TableCell>
                              <Badge variant={tech.status === "active" ? "default" : "secondary"}>{tech.status}</Badge>
                            </TableCell>
                            <TableCell>{tech.tickets}</TableCell>
                            <TableCell>{tech.avgResolution}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  Assign
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Export Reports</CardTitle>
                  <CardDescription>Generate and download system reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Ticket Logs</CardTitle>
                        <CardDescription>Complete ticket history and details</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button onClick={() => exportData("tickets")} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Export Ticket Data
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Performance Summary</CardTitle>
                        <CardDescription>Technician performance metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button onClick={() => exportData("performance")} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Export Performance Data
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">System Analytics</CardTitle>
                        <CardDescription>Overall system usage and trends</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button onClick={() => exportData("analytics")} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Export Analytics
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Custom Report</CardTitle>
                        <CardDescription>Generate custom filtered reports</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure Report
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
