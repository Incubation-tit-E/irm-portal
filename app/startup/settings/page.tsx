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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Building2, Bell, Save, CheckCircle2 } from "lucide-react";

export default function StartupSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    startupName: "TechFlow AI",
    founderName: "Sarah Chen",
    email: "sarah@techflow.ai",
    phone: "+1 (555) 123-4567",
    website: "https://techflow.ai",
    sector: "Artificial Intelligence",
    description:
      "Building next-generation AI solutions for enterprise automation and workflow optimization.",
    notifications: {
      emailReports: true,
      feedbackAlerts: true,
      weeklyDigest: false,
      mentorUpdates: true,
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

  if (isSaved) {
    return (
      <DashboardLayout role="startup" title="Settings">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Settings Saved Successfully!
                </h3>
                <p className="text-slate-600 mb-4">
                  Your profile and notification preferences have been updated.
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
    <DashboardLayout role="startup" title="Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your startup profile and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startupName">Startup Name</Label>
                <Input
                  id="startupName"
                  value={formData.startupName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startupName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founderName">Founder Name</Label>
                <Input
                  id="founderName"
                  value={formData.founderName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      founderName: e.target.value,
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sector: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
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
                  <Label>Email Report Confirmations</Label>
                  <p className="text-sm text-slate-500">
                    Receive email confirmations when you submit daily reports
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.emailReports}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("emailReports", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Admin Feedback Alerts</Label>
                  <p className="text-sm text-slate-500">
                    Get notified immediately when admins provide feedback on
                    your reports
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.feedbackAlerts}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("feedbackAlerts", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Progress Digest</Label>
                  <p className="text-sm text-slate-500">
                    Receive a weekly summary of your progress and achievements
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
                  <Label>Mentor Updates</Label>
                  <p className="text-sm text-slate-500">
                    Get updates about mentor sessions and program announcements
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

        {/* Program Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Program Status
            </CardTitle>
            <CardDescription>
              Your current status in the incubation program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Program Status</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Cohort</span>
                <Badge variant="outline">2024 Spring Batch</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Program Duration</span>
                <span className="text-slate-600">
                  6 months (3 months remaining)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Reports Submitted</span>
                <span className="text-slate-600">45 reports</span>
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
