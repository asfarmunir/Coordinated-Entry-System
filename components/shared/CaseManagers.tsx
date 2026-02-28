"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface CaseManager {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  status: "active" | "inactive";
  lastLogin: string;
  createdDate: string;
  permissions: Permission[];
  isExpanded?: boolean;
}

const CaseManagers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState<CaseManager | null>(
    null,
  );
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // New Case Manager Form State
  const [newManager, setNewManager] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    phoneExt: "",
    alternatePhone: "",
    alternatePhoneExt: "",
    email: "",
    disableLogin: false,
  });

  // All available permissions
  const allPermissions: Permission[] = [
    // Participant Management
    {
      id: "view-participants",
      name: "View Participants",
      description: "View participant profiles and information",
      category: "Participant Management",
    },
    {
      id: "edit-participants",
      name: "Edit Participants",
      description: "Edit participant profiles and information",
      category: "Participant Management",
    },
    {
      id: "add-participants",
      name: "Add Participants",
      description: "Register new participants to the system",
      category: "Participant Management",
    },
    {
      id: "delete-participants",
      name: "Delete Participants",
      description: "Remove participants from the system",
      category: "Participant Management",
    },
    {
      id: "view-documents",
      name: "View Documents",
      description: "Access participant documents",
      category: "Participant Management",
    },
    {
      id: "upload-documents",
      name: "Upload Documents",
      description: "Upload documents for participants",
      category: "Participant Management",
    },

    // Referral Management
    {
      id: "view-referrals",
      name: "View Referrals",
      description: "View all referrals",
      category: "Referral Management",
    },
    {
      id: "create-referrals",
      name: "Create Referrals",
      description: "Create new referrals",
      category: "Referral Management",
    },
    {
      id: "approve-referrals",
      name: "Approve Referrals",
      description: "Approve or reject referrals",
      category: "Referral Management",
    },
    {
      id: "close-referrals",
      name: "Close Referrals",
      description: "Close completed referrals",
      category: "Referral Management",
    },

    // Resource Management
    {
      id: "view-resources",
      name: "View Resources",
      description: "View available resources",
      category: "Resource Management",
    },
    {
      id: "manage-resources",
      name: "Manage Resources",
      description: "Add, edit, and delete resources",
      category: "Resource Management",
    },
    {
      id: "update-capacity",
      name: "Update Capacity",
      description: "Update resource availability and capacity",
      category: "Resource Management",
    },

    // Service Tracking
    {
      id: "log-services",
      name: "Log Services",
      description: "Record services provided to participants",
      category: "Service Tracking",
    },
    {
      id: "view-service-history",
      name: "View Service History",
      description: "View participant service history",
      category: "Service Tracking",
    },
    {
      id: "edit-service-logs",
      name: "Edit Service Logs",
      description: "Edit existing service logs",
      category: "Service Tracking",
    },
    {
      id: "delete-service-logs",
      name: "Delete Service Logs",
      description: "Delete service logs",
      category: "Service Tracking",
    },

    // Communication
    {
      id: "send-messages",
      name: "Send Messages",
      description: "Send messages to participants and staff",
      category: "Communication",
    },
    {
      id: "view-messages",
      name: "View Messages",
      description: "View message history",
      category: "Communication",
    },
    {
      id: "create-broadcasts",
      name: "Create Broadcasts",
      description: "Send broadcast messages",
      category: "Communication",
    },

    // Reporting & Analytics
    {
      id: "view-reports",
      name: "View Reports",
      description: "Access reports and analytics",
      category: "Reporting & Analytics",
    },
    {
      id: "generate-reports",
      name: "Generate Reports",
      description: "Create custom reports",
      category: "Reporting & Analytics",
    },
    {
      id: "export-data",
      name: "Export Data",
      description: "Export data and reports",
      category: "Reporting & Analytics",
    },

    // Case Manager Management
    {
      id: "view-case-managers",
      name: "View Case Managers",
      description: "View case manager directory",
      category: "Case Manager Management",
    },
    {
      id: "manage-case-managers",
      name: "Manage Case Managers",
      description: "Add, edit, and remove case managers",
      category: "Case Manager Management",
    },
    {
      id: "manage-permissions",
      name: "Manage Permissions",
      description: "Modify case manager permissions",
      category: "Case Manager Management",
    },
  ];

  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(),
  );

  // Mock case managers data
  const [caseManagers, setCaseManagers] = useState<CaseManager[]>([
    {
      id: "STF-001",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sjohnson@hopehousing.org",
      phone: "(555) 123-4567",
      status: "active",
      lastLogin: "2025-11-09 09:30 AM",
      createdDate: "2025-01-15",
      permissions: [
        allPermissions.find((p) => p.id === "manage-resources")!,
        allPermissions.find((p) => p.id === "approve-referrals")!,
        allPermissions.find((p) => p.id === "view-reports")!,
        allPermissions.find((p) => p.id === "manage-case-managers")!,
        allPermissions.find((p) => p.id === "edit-participants")!,
      ],
    },
    {
      id: "STF-002",
      firstName: "Michael",
      lastName: "Chen",
      email: "mchen@hopehousing.org",
      phone: "(555) 234-5678",
      status: "active",
      lastLogin: "2025-11-09 08:15 AM",
      createdDate: "2025-02-20",
      permissions: [
        allPermissions.find((p) => p.id === "view-participants")!,
        allPermissions.find((p) => p.id === "create-referrals")!,
      ],
    },
    {
      id: "STF-003",
      firstName: "Jennifer",
      lastName: "Martinez",
      email: "jmartinez@hopehousing.org",
      phone: "(555) 345-6789",
      status: "active",
      lastLogin: "2025-11-08 04:45 PM",
      createdDate: "2025-03-10",
      permissions: [
        allPermissions.find((p) => p.id === "view-participants")!,
        allPermissions.find((p) => p.id === "log-services")!,
        allPermissions.find((p) => p.id === "send-messages")!,
      ],
    },
    {
      id: "STF-004",
      firstName: "David",
      lastName: "Thompson",
      email: "dthompson@hopehousing.org",
      phone: "(555) 456-7890",
      status: "inactive",
      lastLogin: "2025-10-28 02:20 PM",
      createdDate: "2025-04-05",
      permissions: [],
    },
  ]);

  const filteredManagers = caseManagers.filter(
    (manager) =>
      manager.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${manager.firstName} ${manager.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleAddManager = () => {
    // Add logic here
    console.log("Adding manager:", newManager);
    setShowAddModal(false);
    setNewManager({
      firstName: "",
      lastName: "",
      phone: "",
      phoneExt: "",
      alternatePhone: "",
      alternatePhoneExt: "",
      email: "",
      disableLogin: false,
    });
  };

  const handleOpenPermissions = (manager: CaseManager) => {
    setSelectedManager(manager);
    setSelectedPermissions(new Set(manager.permissions.map((p) => p.id)));
    setShowPermissionsModal(true);
  };

  const handleSavePermissions = () => {
    // Save permissions logic here
    console.log("Saving permissions:", Array.from(selectedPermissions));
    setShowPermissionsModal(false);
  };

  const togglePermission = (permissionId: string) => {
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setSelectedPermissions(newPermissions);
  };

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: Permission[] } = {};
    allPermissions.forEach((permission) => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  const getCategoryCount = (category: string) => {
    const categoryPerms = allPermissions.filter((p) => p.category === category);
    const selectedCount = categoryPerms.filter((p) =>
      selectedPermissions.has(p.id),
    ).length;
    return { selected: selectedCount, total: categoryPerms.length };
  };

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Participant Management"]),
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Case Manager Management"
        description="Manage case managers, roles, and permissions"
      />

      {/* Search and Filters */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search case managers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-primary w-full md:w-fit text-primary-foreground hover:opacity-90 whitespace-nowrap"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Case Manager
        </Button>
      </div>

      {/* Case Managers Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-foreground w-12"></th>
                <th className="text-left p-4 text-nowrap text-sm font-semibold text-foreground">
                  Case Manager ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Contact
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="text-left text-nowrap p-4 text-sm font-semibold text-foreground">
                  Last Login
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredManagers.map((manager) => (
                <>
                  <tr key={manager.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <button
                        onClick={() => toggleRow(manager.id)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 text-foreground transition-transform ${
                            expandedRows.has(manager.id)
                              ? "rotate-0"
                              : "-rotate-90"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-primary">
                        {manager.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {manager.firstName} {manager.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created: {manager.createdDate}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <svg
                            className="w-4 h-4 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {manager.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <svg
                            className="w-4 h-4 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {manager.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          manager.status === "active"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {manager.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex text-nowrap items-center gap-2 text-sm text-foreground">
                        <svg
                          className="w-4 h-4 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {manager.lastLogin}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenPermissions(manager)}
                          className="px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Permissions
                        </button>
                        <button
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            manager.status === "active"
                              ? "text-foreground hover:bg-muted"
                              : "text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                          }`}
                        >
                          {manager.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                        <button className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRows.has(manager.id) && (
                    <tr>
                      <td colSpan={7} className="bg-muted/20 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-foreground">
                            Current Permissions ({manager.permissions.length})
                          </h4>
                          <Button
                            onClick={() => handleOpenPermissions(manager)}
                            size="sm"
                            className="bg-primary text-primary-foreground hover:opacity-90"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Add Permission
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {manager.permissions.map((permission) => (
                            <span
                              key={permission.id}
                              className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg flex items-center gap-2"
                            >
                              {permission.name}
                              <button className="hover:text-blue-900 dark:hover:text-blue-100">
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Case Manager Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Case Manager</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Create a new case manager account. You can assign permissions
              after creation.
            </p>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newManager.firstName}
                  onChange={(e) =>
                    setNewManager({ ...newManager, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Chase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newManager.lastName}
                  onChange={(e) =>
                    setNewManager({ ...newManager, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Sh"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Primary Phone
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newManager.phone}
                  onChange={(e) =>
                    setNewManager({ ...newManager, phone: e.target.value })
                  }
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="555-123-4567"
                />
                <div className="w-24">
                  <label className="block text-xs text-muted-foreground mb-1">
                    EXT.
                  </label>
                  <input
                    type="text"
                    value={newManager.phoneExt}
                    onChange={(e) =>
                      setNewManager({ ...newManager, phoneExt: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Alternate Phone
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newManager.alternatePhone}
                  onChange={(e) =>
                    setNewManager({
                      ...newManager,
                      alternatePhone: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="w-24">
                  <label className="block text-xs text-muted-foreground mb-1">
                    EXT.
                  </label>
                  <input
                    type="text"
                    value={newManager.alternatePhoneExt}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        alternatePhoneExt: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={newManager.email}
                onChange={(e) =>
                  setNewManager({ ...newManager, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="chase.tricitymhs@gmail.com"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="disableLogin"
                checked={newManager.disableLogin}
                onChange={(e) =>
                  setNewManager({
                    ...newManager,
                    disableLogin: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="disableLogin"
                className="text-sm text-muted-foreground"
              >
                Disable login for this agent?
              </label>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Need to resend Chases login information?
              </p>
              <button className="text-sm text-primary hover:underline">
                Click here to resend the welcome email
              </button>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <button className="text-sm text-primary hover:underline">
                  Click to Add image
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddManager}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              Add Case Manager
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Permissions Modal */}
      <Dialog
        open={showPermissionsModal}
        onOpenChange={setShowPermissionsModal}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Configure permissions for{" "}
              {selectedManager
                ? `${selectedManager.firstName} ${selectedManager.lastName}`
                : ""}{" "}
              [admin]
            </p>
          </DialogHeader>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {selectedPermissions.size} permissions currently assigned
            </p>
          </div>

          <div className="space-y-3 mt-4">
            {Object.entries(getPermissionsByCategory()).map(
              ([category, permissions]) => {
                const { selected, total } = getCategoryCount(category);
                return (
                  <div
                    key={category}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-foreground">
                        {category}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                          {selected}/{total}
                        </span>
                        <svg
                          className={`w-5 h-5 text-foreground transition-transform ${
                            expandedCategories.has(category)
                              ? "rotate-0"
                              : "-rotate-90"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedCategories.has(category) && (
                      <div className="p-4 space-y-3 bg-card">
                        {permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start gap-3"
                          >
                            <input
                              type="checkbox"
                              id={permission.id}
                              checked={selectedPermissions.has(permission.id)}
                              onChange={() => togglePermission(permission.id)}
                              className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                            />
                            <label
                              htmlFor={permission.id}
                              className="flex-1 cursor-pointer"
                            >
                              <p className="text-sm font-medium text-foreground">
                                {permission.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowPermissionsModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePermissions}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Permissions
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseManagers;
