"use client"

import { useState, useEffect } from "react"
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
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Search,
  Ticket,
  Clock,
  CheckCircle,
  AlertTriangle,
  Monitor,
  MapPin,
  Calendar,
  Video,
  Wrench,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface TicketData {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "resolved"
  location: "onsite" | "remote"
  device: string
  reportedBy: string
  assignedTo: string
  dateReported: string
  lastUpdated: string
}

const mockTickets: TicketData[] = [
  {
    id: "TK-001",
    title: "Computer won't start",
    description: "Desktop computer in accounting department won't power on after power outage",
    priority: "high",
    status: "open",
    location: "onsite",
    device: "Dell OptiPlex 7090",
    reportedBy: "Sarah Johnson",
    assignedTo: "John Smith",
    dateReported: "2024-01-15 09:30",
    lastUpdated: "2024-01-15 09:30",
  },
  {
    id: "TK-002",
    title: "Slow internet connection",
    description: "Internet speed significantly reduced, affecting productivity",
    priority: "medium",
    status: "in-progress",
    location: "remote",
    device: "Network Infrastructure",
    reportedBy: "Mike Davis",
    assignedTo: "John Smith",
    dateReported: "2024-01-14 14:20",
    lastUpdated: "2024-01-15 08:45",
  },
  {
    id: "TK-003",
    title: "Printer not responding",
    description: "HP LaserJet printer not responding to print commands",
    priority: "low",
    status: "resolved",
    location: "onsite",
    device: "HP LaserJet Pro 400",
    reportedBy: "Lisa Chen",
    assignedTo: "John Smith",
    dateReported: "2024-01-13 11:15",
    lastUpdated: "2024-01-14 16:30",
  },
  {
    id: "TK-004",
    title: "Email server down",
    description: "Unable to send or receive emails company-wide",
    priority: "urgent",
    status: "open",
    location: "remote",
    device: "Exchange Server",
    reportedBy: "IT Department",
    assignedTo: "John Smith",
    dateReported: "2024-01-15 10:45",
    lastUpdated: "2024-01-15 10:45",
  },
]

export function TechnicianDashboard() {
  const [tickets, setTickets] = useState<TicketData[]>(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [notifications, setNotifications] = useState(2)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setNotifications((prev) => prev + 1)
        toast({
          title: "New Ticket Assigned",
          description: "A new high-priority ticket has been assigned to you.",
        })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500"
      case "in-progress":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleStatusChange = (ticketId: string, newStatus: "in-progress" | "resolved") => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus, lastUpdated: new Date().toLocaleString() } : ticket,
      ),
    )
    toast({
      title: "Ticket Updated",
      description: `Ticket ${ticketId} marked as ${newStatus}`,
    })
  }

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openTickets = filteredTickets.filter((t) => t.status === "open")
  const inProgressTickets = filteredTickets.filter((t) => t.status === "in-progress")
  const resolvedTickets = filteredTickets.filter((t) => t.status === "resolved")

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Smith</p>
              <p className="text-sm text-muted-foreground">Senior Technician</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Ticket className="w-4 h-4" />
                <span>My Tickets</span>
                <Badge variant="secondary" className="ml-auto">
                  {openTickets.length + inProgressTickets.length}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
                {notifications > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {notifications}
                  </Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Wrench className="w-4 h-4" />
                <span>Tools</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">Technician Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative bg-transparent">
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{openTickets.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressTickets.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resolvedTickets.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4h</div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Tickets Tabs */}
          <Tabs defaultValue="open" className="space-y-4">
            <TabsList>
              <TabsTrigger value="open">Open ({openTickets.length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({inProgressTickets.length})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({resolvedTickets.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="open">
              <Card>
                <CardHeader>
                  <CardTitle>Open Tickets</CardTitle>
                  <CardDescription>Tickets awaiting assignment or action</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Reported</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {openTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{ticket.title}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-xs">{ticket.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>
                              {ticket.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {ticket.location === "onsite" ? (
                                <MapPin className="w-4 h-4" />
                              ) : (
                                <Monitor className="w-4 h-4" />
                              )}
                              {ticket.location}
                            </div>
                          </TableCell>
                          <TableCell>{ticket.device}</TableCell>
                          <TableCell>{ticket.dateReported}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleStatusChange(ticket.id, "in-progress")}>
                                Start Work
                              </Button>
                              {ticket.location === "remote" && (
                                <Button size="sm" variant="outline">
                                  <Video className="w-4 h-4 mr-1" />
                                  Remote
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="in-progress">
              <Card>
                <CardHeader>
                  <CardTitle>In Progress Tickets</CardTitle>
                  <CardDescription>Tickets currently being worked on</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Started</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inProgressTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{ticket.title}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-xs">{ticket.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>
                              {ticket.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {ticket.location === "onsite" ? (
                                <MapPin className="w-4 h-4" />
                              ) : (
                                <Monitor className="w-4 h-4" />
                              )}
                              {ticket.location}
                            </div>
                          </TableCell>
                          <TableCell>{ticket.device}</TableCell>
                          <TableCell>{ticket.lastUpdated}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(ticket.id, "resolved")}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resolved">
              <Card>
                <CardHeader>
                  <CardTitle>Resolved Tickets</CardTitle>
                  <CardDescription>Recently completed tickets</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Resolved</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resolvedTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{ticket.title}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-xs">{ticket.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>
                              {ticket.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {ticket.location === "onsite" ? (
                                <MapPin className="w-4 h-4" />
                              ) : (
                                <Monitor className="w-4 h-4" />
                              )}
                              {ticket.location}
                            </div>
                          </TableCell>
                          <TableCell>{ticket.device}</TableCell>
                          <TableCell>{ticket.lastUpdated}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Resolved
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
