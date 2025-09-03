// RightSidebar.jsx
import React from "react";
import { IoClose, IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

/* ---- mock data ---- */
const notifications = [
  { id: 1, title: "Payment Received", desc: "Payment made by a user" },
  { id: 2, title: "Subscription Active", desc: "User upgraded to Premium" },
  { id: 3, title: "Server Alert", desc: "High CPU usage detected" },
];

const messages = [
  {
    id: "alex",
    name: "Alex Benjamin",
    text: "Hi Buddy!👋",
    avatar: "https://i.pravatar.cc/64?img=11",
    unread: 1,
  },
  {
    id: "jerry",
    name: "Jerry Maguire",
    text: "Let’s catch up tomorrow!",
    avatar: "https://i.pravatar.cc/64?img=12",
    unread: 2,
  },
  {
    id: "jane",
    name: "Jane Smith",
    text: "Thanks for the update ✅",
    avatar: "https://i.pravatar.cc/64?img=13",
    unread: 0,
  },
];

const contacts = [
  { id: 1, name: "Alex Benjamin", avatar: "https://i.pravatar.cc/64?img=11" },
  { id: 2, name: "Jerry Maguire", avatar: "https://i.pravatar.cc/64?img=12" },
  { id: 3, name: "Jane Smith", avatar: "https://i.pravatar.cc/64?img=13" },
];

const RightSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1000] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* panel */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 w-72 sm:w-80 
        bg-brand-surface text-white z-[1001]
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0
        border-l border-[#D0EA59]`}
      >
        <button
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-[#D0EA59]/20 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>

        <div className="h-full overflow-y-auto p-4 space-y-6">
          {/* Notifications */}
          <section>
            <h3 className="text-[15px] font-semibold text-white">
              Notifications
            </h3>
            <div className="mt-3 space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <span className="h-10 w-10 rounded-xl bg-[#D0EA59] text-black grid place-items-center">
                    <IoCameraOutline size={20} />
                  </span>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium">{n.title}</div>
                    <div className="text-xs opacity-80">{n.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-px bg-[#D0EA59]/40" />
          </section>

          {/* Messages */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-white">
                Messages
              </h3>
              <button
                className="text-[#D0EA59] text-xs font-medium hover:underline"
                onClick={() => {
                  navigate("/messages");
                  setIsOpen?.(false);
                }}
              >
                Show All
              </button>
            </div>

            <div className="mt-3 space-y-3" role="list">
              {messages.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="listitem"
                  onClick={() => {
                    navigate(`/messages/${m.id}`);
                    setIsOpen?.(false);
                  }}
                  className="w-full flex items-center justify-between rounded-lg hover:bg-[#D0EA59]/20 p-1.5 focus:outline-none focus:ring-2 focus:ring-[#D0EA59]/40"
                  aria-label={`Open chat with ${m.name}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">{m.name}</div>
                      <div className="text-xs opacity-80">{m.text}</div>
                    </div>
                  </div>

                  {m.unread ? (
                    <span className="h-5 w-5 rounded-full bg-[#D0EA59] text-black text-[11px] grid place-items-center font-semibold">
                      {m.unread}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="mt-4 h-px bg-[#D0EA59]/40" />
          </section>

          {/* Contacts */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-white">
                Contacts
              </h3>
              <button className="text-[#D0EA59] text-xs font-medium hover:underline">
                Show All
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="text-sm font-medium">{c.name}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};

export default RightSidebar;




