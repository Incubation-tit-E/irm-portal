"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Bell,
  Save,
  CheckCircle2,
  Shield,
  Database,
} from "lucide-react";
import { Switch } from "@radix-ui/react-switch";

export default function AdminSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "TechStart Incubator",
    adminName: "John Smith",
    email: "admin@techstart.com",
    phone: "+1 (555) 987-6543",
    website: "https://techstart.com",
    address: "123 Innovation Drive, Tech City, TC 12345",
    description:
      "Leading technology incubator focused on nurturing early-stage startups in AI, fintech, and healthcare sectors.",
    notifications: {
      newReports: true,
      weeklyDigest: true,
      systemAlerts: true,
      mentorUpdates: false,
    },
    systemSettings: {
      autoBackup: true,
      dataRetention: "12",
      requireFileUploads: false,
      enableAnalytics: true,
    },
  });

  const handleSave = () => {
    // Simulate saving
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handleSystemSettingChange = (key: string, value: boolean | string) => {
    setFormData((prev) => ({
      ...prev,
      systemSettings: {
        ...prev.systemSettings,
        [key]: value,
      },
    }));
  };

  if (isSaved) {
    return (
      <DashboardLayout role="admin" title="Settings">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Settings Saved Successfully!
                </h3>
                <p className="text-slate-600 mb-4">
                  Your organization settings and preferences have been updated.
                </p>
                <Button onClick={() => setIsSaved(false)}>
                  Continue Editing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin" title="Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Program Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Program Statistics
            </CardTitle>
            <CardDescription>
              Current program metrics and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">4</p>
                <p className="text-sm text-slate-600">Active Startups</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">45</p>
                <p className="text-sm text-slate-600">Total Reports</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">89%</p>
                <p className="text-sm text-slate-600">Response Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">2.1h</p>
                <p className="text-sm text-slate-600">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Organization Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Organization Information
            </CardTitle>
            <CardDescription>
              Update your incubator organization details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      organizationName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminName">Admin Name</Label>
                <Input
                  id="adminName"
                  value={formData.adminName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      adminName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Organization Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Manage how you receive updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Report Notifications</Label>
                  <p className="text-sm text-slate-500">
                    Get notified immediately when startups submit new reports
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.newReports}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("newReports", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-slate-500">
                    Receive a weekly summary of all startup activities and
                    progress
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.weeklyDigest}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("weeklyDigest", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-slate-500">
                    Get alerts about system maintenance, updates, and issues
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.systemAlerts}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("systemAlerts", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mentor Updates</Label>
                  <p className="text-sm text-slate-500">
                    Receive updates about mentor activities and feedback
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.mentorUpdates}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("mentorUpdates", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>
              Configure system-wide settings and data management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-slate-500">
                    Automatically backup all data daily
                  </p>
                </div>
                <Switch
                  checked={formData.systemSettings.autoBackup}
                  onCheckedChange={(checked) =>
                    handleSystemSettingChange("autoBackup", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Retention Period</Label>
                  <p className="text-sm text-slate-500">
                    How long to keep report data (in months)
                  </p>
                </div>
                <Input
                  type="number"
                  value={formData.systemSettings.dataRetention}
                  onChange={(e) =>
                    handleSystemSettingChange("dataRetention", e.target.value)
                  }
                  className="w-20"
                  min="1"
                  max="60"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require File Uploads</Label>
                  <p className="text-sm text-slate-500">
                    Make file attachments mandatory for all reports
                  </p>
                </div>
                <Switch
                  checked={formData.systemSettings.requireFileUploads}
                  onCheckedChange={(checked) =>
                    handleSystemSettingChange("requireFileUploads", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Analytics</Label>
                  <p className="text-sm text-slate-500">
                    Collect usage analytics to improve the platform
                  </p>
                </div>
                <Switch
                  checked={formData.systemSettings.enableAnalytics}
                  onCheckedChange={(checked) =>
                    handleSystemSettingChange("enableAnalytics", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="min-w-[120px]">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
