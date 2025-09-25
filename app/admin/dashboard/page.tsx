"use client";

import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  FileText,
  MessageCircle,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { getAllReports, ReportData } from "@/firebaseFunctions/ReportActions";
import { getAllStartup } from "@/firebaseFunctions/utils";
import { setAdminFeedback } from "@/firebaseFunctions/adminFeedbacks";

export default function AdminDashboardPage() {
  const [feedbacks, setFeedbacks] = useState<{ [key: string]: string }>({});
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [startupReports, setStartupReposts] = useState<
    { id: string; data: ReportData }[]
  >([]);

  useEffect(() => {
    async function loadData() {
      try {
        const startups = await getAllStartup();
        console.log(startups);

        const reportsArray = await Promise.all(
          startups.map((startup) => getAllReports(startup))
        );

        const allReports = reportsArray.flat();

        setStartupReposts(allReports);
        console.log(allReports);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }

    loadData();
  }, []);

  const handleFeedbackSubmit = async (
    startup: string,
    date: string,
    adminFeedback: string
  ) => {
    try {
      await setAdminFeedback(startup, date, adminFeedback);

      // Update state locally so UI reflects instantly
      setStartupReposts((prev) =>
        prev.map((report) =>
          report.data.startupName === startup && report.id === date
            ? { ...report, data: { ...report.data, adminFeedback } }
            : report
        )
      );

      // clear textarea for that report
      setFeedbacks((prev) => ({
        ...prev,
        [`${startup}-${date}`]: "",
      }));
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Startups
                  </p>
                  <p className="text-3xl font-bold text-slate-900">2</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Reports Today
                  </p>
                  <p className="text-3xl font-bold text-slate-900">--</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Pending Reviews
                  </p>
                  <p className="text-3xl font-bold text-slate-900">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Avg Response Time
                  </p>
                  <p className="text-3xl font-bold text-slate-900">2h</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Latest reports submitted by startups in the incubation program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {startupReports.map((report) => {
                const feedbackKey = `${report.data.startupName}-${report.id}`;
                return (
                  <div
                    key={feedbackKey}
                    className="border border-slate-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {report.data.startupName}
                          </h3>
                          <Badge
                            variant="outline"
                            className="flex items-center space-x-1"
                          >
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(report.id).toLocaleDateString()}
                            </span>
                          </Badge>
                          {report.data.fileName && (
                            <Badge
                              variant="secondary"
                              className="flex items-center space-x-1"
                            >
                              <FileText className="h-3 w-3" />
                              <span>Attachment</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setExpandedReport(
                            expandedReport === report.id ? null : report.id
                          )
                        }
                      >
                        {expandedReport === report.id ? "Collapse" : "Expand"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">
                          Work Done
                        </h4>
                        <p className="text-sm text-slate-600 line-clamp-3">
                          {report.data.workDone}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">
                          Blockers
                        </h4>
                        <p className="text-sm text-slate-600 line-clamp-3">
                          {report.data.blockers}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">
                          Tomorrow&apos;s Plan
                        </h4>
                        <p className="text-sm text-slate-600 line-clamp-3">
                          {report.data.planForTomorrow}
                        </p>
                      </div>
                    </div>

                    {expandedReport === report.id && (
                      <div className="space-y-4">
                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-slate-700 mb-2">
                              Work Done (Full)
                            </h4>
                            <p className="text-sm text-slate-600">
                              {report.data.workDone}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-700 mb-2">
                              Blockers (Full)
                            </h4>
                            <p className="text-sm text-slate-600">
                              {report.data.blockers}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-700 mb-2">
                              Tomorrow&apos;s Plan (Full)
                            </h4>
                            <p className="text-sm text-slate-600">
                              {report.data.planForTomorrow}
                            </p>
                          </div>
                        </div>

                        {report.data.fileName && (
                          <div>
                            <h4 className="font-medium text-slate-700 mb-2">
                              Attached File
                            </h4>
                            <Badge variant="secondary">
                              {report.data.fileName}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    <Separator className="my-4" />

                    {/* Admin Feedback Section */}
                    <div className="space-y-3">
                      {report.data.adminFeedback && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800">
                                Previous Feedback
                              </p>
                              <p className="text-sm text-green-700">
                                {report.data.adminFeedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Textarea
                          placeholder="Add feedback for this report..."
                          value={feedbacks[feedbackKey] || ""}
                          onChange={(e) =>
                            setFeedbacks((prev) => ({
                              ...prev,
                              [feedbackKey]: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <Button
                          onClick={() =>
                            handleFeedbackSubmit(
                              report.data.startupName,
                              report.id,
                              feedbacks[feedbackKey] as string
                            )
                          }
                          disabled={!feedbacks[feedbackKey]?.trim()}
                          className="self-end"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Send Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
