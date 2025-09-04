import React, { useMemo, useState } from "react";
import FeedbackTable from "../Components/feedback/FeedbackTable";
import FeedbackFilters from "../Components/feedback/FeedbackFilters";
import ReplyDrawer from "../Components/feedback/ReplyDrawer";
import { feedbackRows as seed } from "../Data/mockData";

export default function FeedbackPage() {
  const [rows, setRows] = useState(seed);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((r) => {
      const matchText =
        r.user.name.toLowerCase().includes(q) ||
        r.user.email.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);
      const matchType = type === "all" || r.type === type;
      const matchStatus = status === "all" || r.status === status;
      return matchText && matchType && matchStatus;
    });
  }, [rows, search, type, status]);

  const openItem = (item) => {
    setActive(item);
    setDrawerOpen(true);
  };

  const onReply = async ({ id, status, reply }) => {
    // TODO: call your API to send email/notification + update status
    // await api.post("/feedback/reply", { id, status, reply })

    // Local optimistic update
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setDrawerOpen(false);
  };

  return (
    <div className="p-4 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Feedback</h1>
        <button
          onClick={() => {
            setSearch(""); setType("all"); setStatus("all");
          }}
          className="h-9 px-3 rounded-lg text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/5"
        >
          Reset filters
        </button>
      </div>

      <FeedbackFilters
        search={search} setSearch={setSearch}
        type={type} setType={setType}
        status={status} setStatus={setStatus}
      />

      <FeedbackTable rows={filtered} onOpen={openItem} />

      <ReplyDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        item={active}
        onReply={onReply}
      />
    </div>
  );
}
