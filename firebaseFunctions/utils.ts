"use server";

import { adminDb } from "@/lib/firebaseAdmin";

export async function getUserStartup(uid: string): Promise<string | null> {
  try {
    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const data = userDoc.data();
    return data?.startup || null;
  } catch (err) {
    console.error("Error fetching startup:", err);
    throw err;
  }
}

export async function getAllStartup(): Promise<string[]> {
  try {
    const collections = await adminDb.listCollections();

    return collections.map((col) => col.id).filter((id) => id !== "users"); // exclude "user"
  } catch (err) {
    console.error("Error fetching collections:", err);
    throw err;
  }
}
