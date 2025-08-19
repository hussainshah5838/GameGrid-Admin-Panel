import React from "react";
import { IoClose, IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

/* ---- mock data ---- */
const notifications = [
  { id: 1, title: "Payment Received", desc: "Payment made by a user" },
  { id: 2, title: "Payment Received", desc: "Payment made by a user" },
  { id: 3, title: "Payment Received", desc: "Payment made by a user" },
];

const messages = [
  {
    id: 1,
    name: "Alex Benjamin",
    text: "Hi Buddy!👋",
    avatar: "https://i.pravatar.cc/64?img=11",
    unread: 1,
  },
  {
    id: 2,
    name: "Jerry Maguire",
    text: "Hi Buddy!👋",
    avatar: "https://i.pravatar.cc/64?img=12",
    unread: 1,
  },
  {
    id: 3,
    name: "Jane Smith",
    text: "Hi Buddy!👋",
    avatar: "https://i.pravatar.cc/64?img=13",
    unread: 1,
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
        className={`fixed lg:static inset-y-0 right-0 w-72 sm:w-80 bg-white z-[1001]
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0
        border-l border-gray-200`}
      >
        <button
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>

        <div className="h-full overflow-y-auto p-4 space-y-6">
          {/* Notifications */}
          <section>
            <h3 className="text-[15px] font-semibold text-gray-800">
              Notifications
            </h3>
            <div className="mt-3 space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <span className="h-10 w-10 rounded-xl bg-emerald-400/80 text-white grid place-items-center">
                    <IoCameraOutline size={20} />
                  </span>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-gray-800">
                      {n.title}
                    </div>
                    <div className="text-xs text-gray-400">{n.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-px bg-gray-200" />
          </section>

          {/* Messages */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-gray-800">
                Messages
              </h3>
              <button
                className="text-emerald-500 text-xs font-medium hover:underline"
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
                  className="w-full flex items-center justify-between rounded-lg hover:bg-gray-50 p-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  aria-label={`Open chat with ${m.name}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {m.name}
                      </div>
                      <div className="text-xs text-gray-400">{m.text}</div>
                    </div>
                  </div>

                  {m.unread ? (
                    <span className="h-5 w-5 rounded-full bg-pink-500 text-white text-[11px] grid place-items-center font-semibold">
                      {m.unread}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="mt-4 h-px bg-gray-200" />
          </section>

          {/* Contacts */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-gray-800">
                Contacts
              </h3>
              <button className="text-emerald-500 text-xs font-medium hover:underline">
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
                  <div className="text-sm text-gray-800 font-medium">
                    {c.name}
                  </div>
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
