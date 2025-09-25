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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockReports, mockStartups } from "@/lib/mock-data";
import { Calendar, FileText, Search, Download, Eye } from "lucide-react";

export default function AdminReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStartup, setSelectedStartup] = useState("all");

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.workDone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.blockers.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStartup =
      selectedStartup === "all" || report.startupName === selectedStartup;

    return matchesSearch && matchesStartup;
  });

  return (
    <DashboardLayout role="admin" title="All Reports">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>
              Search and filter reports from all startups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  value={selectedStartup}
                  onChange={(e) => setSelectedStartup(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Startups</option>
                  {mockStartups.map((startup) => (
                    <option key={startup.id} value={startup.name}>
                      {startup.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>All Reports ({filteredReports.length})</CardTitle>
            <CardDescription>
              Complete list of reports submitted by all startups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {report.startupName}
                        </h3>
                        <Badge
                          variant="outline"
                          className="flex items-center space-x-1"
                        >
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                        </Badge>
                        {report.fileName && (
                          <Badge
                            variant="secondary"
                            className="flex items-center space-x-1"
                          >
                            <FileText className="h-3 w-3" />
                            <span>Attachment</span>
                          </Badge>
                        )}
                        {report.adminFeedback && (
                          <Badge className="bg-green-100 text-green-800">
                            Reviewed
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">
                        Work Done
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {report.workDone}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">
                        Blockers
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {report.blockers}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">
                        Tomorrow&apos;s Plan
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {report.planForTomorrow}
                      </p>
                    </div>
                  </div>

                  {report.adminFeedback && (
                    <>
                      <Separator className="my-4" />
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 mb-1">
                          Admin Feedback
                        </h4>
                        <p className="text-sm text-green-700">
                          {report.adminFeedback}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {filteredReports.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No Reports Found
                  </h3>
                  <p className="text-slate-600">
                    {searchTerm || selectedStartup !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "No reports have been submitted yet."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
