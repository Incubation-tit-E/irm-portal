"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, MessageCircle, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllReports, ReportData } from "@/firebaseFunctions/ReportActions";
import { useAuth } from "@/lib/stores/useAuth";

export default function StartupHistoryPage() {
  const [startupReports, setStartupReposts] = useState<
    { id: string; data: ReportData }[]
  >([]);

  const { user } = useAuth();

  useEffect(() => {
    async function lodeData() {
      const res = await getAllReports(user?.startupName as string);
      setStartupReposts(res);
      console.log(res);
    }
    lodeData();
  }, [user]);

  return (
    <DashboardLayout role="startup" title="Report History">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Report History</CardTitle>
            <CardDescription>
              View all your previously submitted daily reports and admin
              feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {startupReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="outline"
                        className="flex items-center space-x-1"
                      >
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(report.id).toLocaleDateString()}</span>
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
                      {report.data.adminFeedback && (
                        <Badge
                          variant="default"
                          className="flex items-center space-x-1 bg-green-600"
                        >
                          <MessageCircle className="h-3 w-3" />
                          <span>Feedback Received</span>
                        </Badge>
                      )}
                    </div>
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

                  {report.data.adminFeedback && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <MessageCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Admin Feedback
                          </p>
                          <p className="text-sm text-blue-700">
                            {report.data.adminFeedback}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {report.data.fileName && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-600">
                          {report.data.fileName}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View File
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {startupReports.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No Reports Yet
                  </h3>
                  <p className="text-slate-600 mb-4">
                    You haven&apos;t submitted any reports yet. Start by
                    submitting your first daily report.
                  </p>
                  <Button>Submit Your First Report</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
