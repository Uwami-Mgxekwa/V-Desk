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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Plus, Upload, Ticket, History, HelpCircle, MapPin, Monitor, Clock, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface UserTicket {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "resolved"
  location: "onsite" | "remote"
  dateSubmitted: string
  lastUpdated: string
  assignedTechnician?: string
}

const userTickets: UserTicket[] = [
  {
    id: "TK-005",
    title: "Laptop screen flickering",
    description: "My laptop screen has been flickering intermittently",
    priority: "medium",
    status: "in-progress",
    location: "onsite",
    dateSubmitted: "2024-01-14 10:30",
    lastUpdated: "2024-01-15 09:15",
    assignedTechnician: "John Smith",
  },
  {
    id: "TK-006",
    title: "Cannot access shared drive",
    description: "Unable to connect to the company shared drive from home",
    priority: "high",
    status: "open",
    location: "remote",
    dateSubmitted: "2024-01-15 08:45",
    lastUpdated: "2024-01-15 08:45",
  },
  {
    id: "TK-007",
    title: "Printer paper jam",
    description: "Office printer has a paper jam that I cannot clear",
    priority: "low",
    status: "resolved",
    location: "onsite",
    dateSubmitted: "2024-01-12 14:20",
    lastUpdated: "2024-01-13 11:30",
    assignedTechnician: "Sarah Johnson",
  },
]

export function EndUserDashboard() {
  const [tickets, setTickets] = useState<UserTicket[]>(userTickets)
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    location: "onsite" as const,
    device: "",
  })

  const handleSubmitTicket = () => {
    if (!newTicket.title || !newTicket.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const ticket: UserTicket = {
      id: `TK-${String(Date.now()).slice(-3)}`,
      title: newTicket.title,
      description: newTicket.description,
      priority: newTicket.priority,
      status: "open",
      location: newTicket.location,
      dateSubmitted: new Date().toLocaleString(),
      lastUpdated: new Date().toLocaleString(),
    }

    setTickets((prev) => [ticket, ...prev])
    setNewTicket({
      title: "",
      description: "",
      priority: "medium",
      location: "onsite",
      device: "",
    })
    setShowNewTicketForm(false)

    toast({
      title: "Ticket Submitted",
      description: `Your ticket ${ticket.id} has been submitted successfully`,
    })
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

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">End User</p>
              <p className="text-sm text-muted-foreground">Employee</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setShowNewTicketForm(true)}>
                <Plus className="w-4 h-4" />
                <span>New Ticket</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Ticket className="w-4 h-4" />
                <span>My Tickets</span>
                <Badge variant="secondary" className="ml-auto">
                  {tickets.filter((t) => t.status !== "resolved").length}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <History className="w-4 h-4" />
                <span>Ticket History</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <HelpCircle className="w-4 h-4" />
                <span>Help & FAQ</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">End User Portal</h1>
          </div>
          <Button onClick={() => setShowNewTicketForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "open").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "in-progress").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "resolved").length}</div>
              </CardContent>
            </Card>
          </div>

          {/* New Ticket Form */}
          {showNewTicketForm && (
            <Card>
              <CardHeader>
                <CardTitle>Submit New Ticket</CardTitle>
                <CardDescription>Describe your issue and we'll assign a technician to help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about the issue..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <Select
                      value={newTicket.priority}
                      onValueChange={(value: any) => setNewTicket((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="device">Affected Device</Label>
                    <Input
                      id="device"
                      placeholder="e.g., Dell Laptop, HP Printer"
                      value={newTicket.device}
                      onChange={(e) => setNewTicket((prev) => ({ ...prev, device: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Resolution Location</Label>
                  <RadioGroup
                    value={newTicket.location}
                    onValueChange={(value: any) => setNewTicket((prev) => ({ ...prev, location: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onsite" id="onsite" />
                      <Label htmlFor="onsite" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        On-site visit required
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="remote" id="remote" />
                      <Label htmlFor="remote" className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        Remote assistance preferred
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Screenshots, error logs, or other relevant files
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
                  <Button variant="outline" onClick={() => setShowNewTicketForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* My Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>My Tickets</CardTitle>
              <CardDescription>Track the status of your submitted tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">{ticket.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>{ticket.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(ticket.status)} text-white`}>{ticket.status}</Badge>
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
                      <TableCell>
                        {ticket.assignedTechnician ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {ticket.assignedTechnician
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{ticket.assignedTechnician}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{ticket.dateSubmitted}</TableCell>
                      <TableCell className="text-sm">{ticket.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
