import React from "react";
import NotificationForm from "../Components/notifications/NotificationForm";
import { rowsData } from "../Data/mockData";


export default function NotificationsPage() {
  const handleSubmit = (payload) => {
    // Hook your API/Firestore/FCM logic here.
    // If mode === 'all', use payload.filters to compute target set backend-side.
    // If mode === 'specific', use payload.recipients (userIds array).
    console.log("Send notification payload:", payload);
    alert(`Notification queued:\n${JSON.stringify(payload, null, 2)}`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 shadow-md p-6">
        <NotificationForm users={rowsData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
