"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { saveReport } from "@/firebaseFunctions/ReportActions";
import { useAuth } from "@/lib/stores/useAuth";

export default function StartupReportPage() {
  const [formData, setFormData] = useState({
    workDone: "",
    blockers: "",
    planForTomorrow: "",
    fileName: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);

    saveReport({
      startupName: user?.startupName as string,
      ...formData,
    });

    // Reset form
    setFormData({
      workDone: "",
      blockers: "",
      planForTomorrow: "",
      fileName: "",
    });
  };

  const handleFileUpload = () => {
    // Simulate file selection
    const mockFileName =
      "daily_report_" + new Date().toISOString().split("T")[0] + ".pdf";
    setFormData((prev) => ({ ...prev, fileName: mockFileName }));
  };

  if (isSubmitted) {
    return (
      <DashboardLayout role="startup" title="Submit Daily Report">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Report Submitted Successfully!
                </h3>
                <p className="text-slate-600 mb-4">
                  Your daily report has been submitted and will be reviewed by
                  the admin team.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Submit Another Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="startup" title="Submit Daily Report">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Daily Progress Report</CardTitle>
            <CardDescription>
              Share your daily progress, challenges, and plans with the
              incubation team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="workDone">Work Done Today *</Label>
                <Textarea
                  id="workDone"
                  placeholder="Describe the work you completed today, key achievements, milestones reached, and any significant progress made..."
                  value={formData.workDone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      workDone: e.target.value,
                    }))
                  }
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blockers">Blockers & Challenges *</Label>
                <Textarea
                  id="blockers"
                  placeholder="What obstacles or challenges did you encounter? What's preventing you from moving forward faster?"
                  value={formData.blockers}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      blockers: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planForTomorrow">Plan for Tomorrow *</Label>
                <Textarea
                  id="planForTomorrow"
                  placeholder="What are your key priorities and goals for tomorrow? What specific tasks will you focus on?"
                  value={formData.planForTomorrow}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      planForTomorrow: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Supporting Documents (Optional)</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  {formData.fileName ? (
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-sm">
                        {formData.fileName}
                      </Badge>
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleFileUpload}
                        >
                          Choose Different File
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-8 w-8 text-slate-400" />
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleFileUpload}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload File
                        </Button>
                      </div>
                      <p className="text-sm text-slate-500">
                        Upload any relevant documents, screenshots, or files
                        (PDF, DOC, XLS)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="flex-1">
                  Submit Report
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData({
                      workDone: "",
                      blockers: "",
                      planForTomorrow: "",
                      fileName: "",
                    })
                  }
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
