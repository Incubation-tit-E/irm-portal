"use server";

import { adminDb } from "@/lib/firebaseAdmin";

export type ReportData = {
  workDone: string;
  blockers: string;
  startupName: string;
  planForTomorrow: string;
  adminFeedback?: string;
  fileName?: string;
};

export async function saveReport(data: ReportData) {
  try {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-16"

    await adminDb
      .collection(data.startupName)
      .doc(today)
      .set(data, { merge: true }); // merge in case you want to update later

    console.log("DONE");

    return { success: true, message: "Report saved successfully" };
  } catch (error) {
    console.error("Error saving report:", error);
    return { success: false, message: "Failed to save report" };
  }
}

export async function getAllReports(
  startup: string
): Promise<{ id: string; data: ReportData }[]> {
  try {
    const snapshot = await adminDb.collection(startup).get();

    const reports = snapshot.docs.map((doc) => ({
      id: doc.id, // date as ID
      data: doc.data() as ReportData,
    }));

    return reports;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
}
