"use server";

import { adminDb } from "@/lib/firebaseAdmin";

export async function setAdminFeedback(
  startupName: string,
  date: string,
  adminFeedback: string
): Promise<void> {
  try {
    // directly reference the doc by ID
    console.log(startupName, date, adminFeedback);
    const docRef = adminDb.collection(startupName).doc(date);

    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`No report found for date ${date} in ${startupName}`);
    }

    await docRef.update({ adminFeedback });

    console.log(`Admin feedback set for ${startupName} on ${date}`);
  } catch (err) {
    console.error("Error setting admin feedback:", err);
    throw err;
  }
}
