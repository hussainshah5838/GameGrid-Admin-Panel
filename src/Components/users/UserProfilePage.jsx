"use client"

// Pages/users/UserProfilePage.jsx (DARK THEME to match your table)
import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserData } from "../../Data/mockData";
import { StatusPill, DateCell, UserCell } from "../../Components/ui/shared/TablePrimitives";
import {
  MdArrowBack,
  MdEdit,
  MdBlock,
  MdEmail,
  MdOutlineCalendarMonth,
  MdVerified,
  MdTrendingUp,
  MdGamepad,
  MdFavorite,
  MdChat,
  MdDownload,
  MdNotifications,
  MdShield,
  MdKey,
  MdDevices,
  MdCreditCard,
  MdCheckCircle,
  MdWarning,
  MdInfo,
} from "react-icons/md";

/* ------------------------------- tokens ------------------------------- */
const ACCENT = "#D0EA59";            // matches your table "View" button
const BG_CARD = "#0C0F14";           // table container
const BG_PANEL = "#0A0D12";          // table header / inner surfaces
const RING = "ring-1 ring-white/10"; // consistent subtle ring

/* ------------------------------ primitives ---------------------------- */
const SectionCard = ({ title, subtitle, right, id, children, className = "" }) => (
  <section
    id={id}
    className={`rounded-2xl ${RING} shadow-md overflow-hidden bg-[${BG_CARD}] text-white ${className}`}
    style={{ backgroundColor: BG_CARD }}
  >
    <div
      className="flex items-start justify-between gap-3 px-5 py-4 border-b border-white/10"
      style={{ backgroundColor: BG_PANEL }}
    >
      <div>
        <h2 className="text-sm md:text-base font-semibold text-white">{title}</h2>
        {subtitle ? <p className="text-xs md:text-sm text-white/70 mt-0.5">{subtitle}</p> : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
    <div className="p-5">{children}</div>
  </section>
);

const Tag = ({ icon, children }) => (
  <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium bg-white/[0.06] border border-white/10 text-white/90">
    {icon ? <span className="opacity-80">{icon}</span> : null}
    {children}
  </span>
);

const Badge = ({ tone = "neutral", children }) => {
  const map = {
    neutral: "bg-white/[0.08] text-white",
    green: "bg-emerald-500/20 text-emerald-300",
    amber: "bg-amber-500/20 text-amber-300",
    purple: "bg-purple-500/20 text-purple-300",
    blue: "bg-blue-500/20 text-blue-300",
    rose: "bg-rose-500/20 text-rose-300",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${map[tone] || map.neutral}`}>
      {children}
    </span>
  );
};

const InfoRow = ({ label, children }) => (
  <div className="flex items-center justify-between py-3 px-2 rounded-lg bg-white/[0.04] border border-white/10">
    <span className="text-sm font-medium text-white/70">{label}</span>
    <span className="text-sm font-semibold text-white">{children}</span>
  </div>
);

const TrendPill = ({ trend }) => {
  if (!trend) return null;
  const positive = String(trend).trim().startsWith("+");
  return (
    <span className={`text-xs font-medium flex items-center gap-1 ${positive ? "text-emerald-300" : "text-rose-300"}`}>
      <MdTrendingUp size={12} />
      {trend}
    </span>
  );
};

const StatCard = ({ title, value, icon, trend, tone = "blue" }) => {
  const bg = {
    blue: "from-blue-400/10 to-blue-300/5",
    green: "from-emerald-400/10 to-emerald-300/5",
    purple: "from-purple-400/10 to-purple-300/5",
    amber: "from-amber-400/10 to-amber-300/5",
  }[tone];
  const iconBg = {
    blue: "bg-blue-500/30",
    green: "bg-emerald-500/30",
    purple: "bg-purple-500/30",
    amber: "bg-amber-500/30",
  }[tone];

  return (
    <div className={`rounded-xl p-4 border border-white/10 bg-gradient-to-br ${bg}`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${iconBg} text-white`}>{icon}</div>
        <TrendPill trend={trend} />
      </div>
      <div className="text-xs font-medium text-white/70 mb-1">{title}</div>
      <div className="text-2xl font-extrabold text-white">{value}</div>
    </div>
  );
};

const ActivityItem = ({ action, time, tone = "neutral" }) => {
  const map = {
    neutral: "bg-white/[0.04] border-white/10 text-white",
    green: "bg-emerald-500/10 border-emerald-400/30 text-emerald-200",
    amber: "bg-amber-500/10 border-amber-400/30 text-amber-200",
    rose: "bg-rose-500/10 border-rose-400/30 text-rose-200",
  };
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${map[tone] || map.neutral}`}>
      <span className="text-sm font-medium">{action}</span>
      <span className="text-xs font-medium opacity-80">{time}</span>
    </div>
  );
};

/* --------------------------------- page --------------------------------- */
export default function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview"); // overview | billing | access | notes | activity

  const decodedId = useMemo(() => {
    try {
      return decodeURIComponent(userId || "");
    } catch {
      return userId || "";
    }
  }, [userId]);

  const user = useMemo(() => UserData.find((u) => u.userId === decodedId), [decodedId]);

  if (!user) {
    return (
      <div className="space-y-4">
        <div className={`rounded-2xl ${RING} shadow-md p-6 flex items-center gap-4 text-white`} style={{ backgroundColor: BG_CARD }}>
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 grid place-items-center rounded-lg bg-white/10 hover:bg-white/15
                       focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
            title="Back"
          >
            <MdArrowBack size={20} />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-bold">User not found</h1>
            <p className="text-sm text-white/70">The profile you’re looking for doesn’t exist.</p>
          </div>
        </div>
        <Link
          to="/users"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg font-medium text-black"
          style={{ backgroundColor: ACCENT }}
        >
          Back to Users
        </Link>
      </div>
    );
  }

  // mock data (wire up later)
  const billingHistory = [
    { id: "inv_4821", date: "2025-08-28", item: user.plan, amount: user.amount, status: "Paid" },
    { id: "inv_4730", date: "2025-07-28", item: user.plan, amount: user.amount, status: "Paid" },
    { id: "inv_4639", date: "2025-06-28", item: user.plan, amount: user.amount, status: "Paid" },
  ];
  const devices = [
    { id: "dev-mac", name: "MacBook Pro • Chrome", last: "Today, 09:42", ip: "10.14.5.23", risk: "low" },
    { id: "dev-iphone", name: "iPhone 14 • Safari", last: "Yesterday, 22:10", ip: "10.14.6.18", risk: "low" },
    { id: "dev-win", name: "Windows • Edge", last: "Last week", ip: "192.168.0.71", risk: "med" },
  ];

  const TabLink = ({ id, children }) => (
    <button
      onClick={() => setTab(id)}
      className={`h-9 px-3 rounded-md text-sm font-medium transition-colors
        ${tab === id ? "text-black" : "text-white"}
      `}
      style={{
        backgroundColor: tab === id ? ACCENT : "rgba(255,255,255,0.08)",
        outline: "none",
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className={`rounded-2xl ${RING} shadow-md p-6 text-white`} style={{ backgroundColor: BG_CARD }}>
        <div className="flex flex-col xl:flex-row xl:items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="h-12 w-12 grid place-items-center rounded-xl bg-white/10 hover:bg-white/15
                         focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
              title="Back"
            >
              <MdArrowBack size={22} />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <UserCell avatar={user.avatar} />
                {user.status === "Active" && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-[rgb(12,15,20)] flex items-center justify-center">
                    <MdVerified size={10} className="text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <StatusPill status={user.status} />
                  <Badge tone={user.role === "Admin" ? "purple" : "blue"}>{user.role}</Badge>
                  <Tag>ID: {user.userId}</Tag>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <MdOutlineCalendarMonth size={16} />
                    Joined {user.joinDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdEmail size={16} />
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-3 xl:ml-auto">
            <button
              className="h-10 px-4 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium
                         focus:outline-none focus:ring-2 focus:ring-white/20 inline-flex items-center gap-2 transition-colors"
              title="Notify"
              type="button"
            >
              <MdNotifications size={18} />
              Notify
            </button>
            <button
              className="h-10 px-4 rounded-md text-black font-medium inline-flex items-center gap-2 transition-colors"
              title="Edit"
              type="button"
              style={{ backgroundColor: ACCENT }}
            >
              <MdEdit size={18} />
              Edit
            </button>
            <button
              className="h-10 px-4 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-medium
                         focus:outline-none focus:ring-2 focus:ring-rose-400/40 inline-flex items-center gap-2 transition-colors"
              title="Suspend"
              type="button"
            >
              <MdBlock size={18} />
              Suspend
            </button>
          </div>
        </div>

        {/* sticky subnav (dark) */}
        <div
          className="mt-5 sticky top-0 z-10 border-t border-white/10"
          style={{ backgroundColor: BG_PANEL, backdropFilter: "blur(6px)" }}
        >
          <div className="flex flex-wrap gap-2 p-3">
            <TabLink id="overview">Overview</TabLink>
            <TabLink id="billing">Billing</TabLink>
            <TabLink id="access">Access & Security</TabLink>
            <TabLink id="notes">Notes</TabLink>
            <TabLink id="activity">Activity</TabLink>
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <>
          <SectionCard
            title="Usage Analytics"
            subtitle="Key engagement metrics (last 30 days)"
            right={<Tag><MdInfo /> Realtime</Tag>}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="AI Queries" value="32" icon={<MdChat size={20} />} trend="+12%" tone="blue" />
              <StatCard title="Favorites" value="12" icon={<MdFavorite size={20} />} trend="+8%" tone="amber" />
              <StatCard title="Games Viewed" value="78" icon={<MdGamepad size={20} />} trend="+25%" tone="green" />
              <StatCard title="Last Research" value="Today" icon={<MdTrendingUp size={20} />} tone="purple" />
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <SectionCard id="account" title="Account Details" subtitle="Personal & account metadata" className="xl:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <InfoRow label="Full Name">{user.name}</InfoRow>
                  <InfoRow label="Email Address">
                    <a className="text-[--accent] underline decoration-white/20 hover:opacity-90" href={`mailto:${user.email}`} style={{ color: ACCENT }}>
                      {user.email}
                    </a>
                  </InfoRow>
                  <InfoRow label="User ID">{user.userId}</InfoRow>
                  <InfoRow label="Account Role">{user.role}</InfoRow>
                </div>
                <div className="space-y-2">
                  <InfoRow label="Current Status"><StatusPill status={user.status} /></InfoRow>
                  <InfoRow label="Member Since"><DateCell text={user.joinDate} /></InfoRow>
                  <InfoRow label="Last Activity"><DateCell text={user.date} /></InfoRow>
                  <InfoRow label="Messaging">{user.status === "Active" ? "✅ Enabled" : "❌ Restricted"}</InfoRow>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Subscription" subtitle="Plan & payment summary" right={<Badge tone="green"><MdCheckCircle /> Good standing</Badge>}>
              <div className="space-y-2">
                <InfoRow label="Current Plan"><span className="font-semibold text-white">{user.plan}</span></InfoRow>
                <InfoRow label="Monthly Amount"><span className="font-semibold" style={{ color: ACCENT }}>{user.amount}</span></InfoRow>
                <InfoRow label="Tier Level"><span className="font-semibold text-white">{user.subscription}</span></InfoRow>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  className="w-full h-10 rounded-md font-medium text-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20"
                  style={{ backgroundColor: ACCENT }}
                >
                  Manage Subscription
                </button>
              </div>
            </SectionCard>
          </div>
        </>
      )}

      {/* BILLING */}
      {tab === "billing" && (
        <SectionCard title="Billing History" subtitle="Invoices & payments" right={<Tag><MdCreditCard /> Stripe</Tag>}>
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead>
                <tr className="text-white/70 border-b border-white/10" style={{ backgroundColor: BG_PANEL }}>
                  <th className="text-left px-4 py-2">Invoice</th>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Item</th>
                  <th className="text-left px-4 py-2">Amount</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2 w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((r, i) => (
                  <tr
                    key={r.id}
                    className={`${i % 2 ? "bg-white/[0.02]" : "bg-transparent"} border-b border-white/10`}
                  >
                    <td className="px-4 py-2 font-medium text-white">{r.id}</td>
                    <td className="px-4 py-2 text-white/80">{r.date}</td>
                    <td className="px-4 py-2 text-white/80">{r.item}</td>
                    <td className="px-4 py-2 font-semibold text-white">{r.amount}</td>
                    <td className="px-4 py-2"><Badge tone="green">Paid</Badge></td>
                    <td className="px-4 py-2">
                      <button
                        className="h-8 px-3 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/20 inline-flex items-center gap-2"
                      >
                        <MdDownload size={16} /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* ACCESS & SECURITY */}
      {tab === "access" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <SectionCard
            title="Sign-in & Devices"
            subtitle="Recent sessions and device risk"
            right={<Tag><MdDevices /> {devices.length} devices</Tag>}
            className="xl:col-span-2"
          >
            <ul className="space-y-2">
              {devices.map((d) => (
                <li key={d.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 grid place-items-center rounded-md bg-white/10 text-white">
                      <MdDevices />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{d.name}</div>
                      <div className="text-xs text-white/70">Last: {d.last} • IP {d.ip}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={d.risk === "med" ? "amber" : "green"}>
                      {d.risk === "med" ? <><MdWarning /> Medium risk</> : <><MdCheckCircle /> Healthy</>}
                    </Badge>
                    <button className="h-8 px-3 rounded-md bg-white/10 hover:bg-white/15 text-white text-sm font-medium">
                      Sign out
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Permissions" subtitle="Role-based access controls" right={<Tag><MdShield /> RBAC</Tag>}>
            <div className="space-y-3">
              {[
                { id: "perm1", label: "View analytics dashboard", def: true },
                { id: "perm2", label: "Export data", def: true },
                { id: "perm3", label: "Manage users", def: user.role === "Admin" },
                { id: "perm4", label: "Billing management", def: user.role === "Admin" },
              ].map((p) => (
                <label key={p.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                  <span className="text-sm text-white flex items-center gap-2"><MdKey className="text-white/60" /> {p.label}</span>
                  <input type="checkbox" defaultChecked={p.def} className="h-4 w-4" style={{ accentColor: ACCENT }} />
                </label>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* NOTES */}
      {tab === "notes" && (
        <SectionCard title="Admin Notes" subtitle="Private notes visible to the admin team only">
          <div className="space-y-4">
            <textarea
              placeholder="Add internal notes about this user..."
              className="w-full min-h-[120px] rounded-lg bg-white/[0.04] border border-white/10 p-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent resize-none"
            />
            <div className="flex items-center gap-2">
              <button className="h-10 px-4 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors">
                Save Note
              </button>
              <button
                className="h-10 px-4 rounded-md font-medium text-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                style={{ backgroundColor: ACCENT }}
              >
                Message User
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ACTIVITY */}
      {tab === "activity" && (
        <SectionCard title="Recent Activity" subtitle="Audit trail of key actions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ActivityItem action="Opened application" time={user.date} tone="green" />
            <ActivityItem action="Queried AI Bot for game predictions" time="Today, 10:12 AM" />
            <ActivityItem action="Added 3 games to favorites" time="Yesterday" />
            <ActivityItem action="Updated subscription preferences" time="Last week" tone="amber" />
            <ActivityItem action="Completed profile verification" time="2 weeks ago" tone="green" />
            <ActivityItem action="Password changed" time="3 weeks ago" tone="amber" />
          </div>
        </SectionCard>
      )}

      {/* Footer */}
      <div className={`rounded-2xl ${RING} shadow-md p-6 text-white`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-sm">
              Profile prepared for <span className="font-semibold text-white">{user?.name || "User"}</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="text-sm">
              By <span className="font-semibold text-white">Astra Sinc</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/users"
              className="h-10 px-4 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium 
                         focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
            >
              Back to Users
            </Link>
            <button
              className="h-10 px-4 rounded-md text-black font-medium hover:opacity-90 
                         focus:outline-none focus:ring-2 focus:ring-white/20 inline-flex items-center gap-2 transition-colors"
              style={{ backgroundColor: ACCENT }}
            >
              <MdDownload size={18} />
              Export Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
