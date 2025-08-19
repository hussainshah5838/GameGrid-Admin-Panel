import React, { createContext, useContext, useMemo, useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import {
  FiChevronRight,
  FiEdit2,
  FiX,
  FiEye,
  FiEyeOff,
  FiMail,
  FiPhone,
  FiBell,
  FiUser,
  FiFlag,
  FiLogOut,
} from "react-icons/fi";

/* ----------------------------------------------------------------------------
   Tiny UI kit (DRY)
----------------------------------------------------------------------------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className = "", ...rest }) => (
  <button
    className={`h-10 px-4 rounded-xl bg-[#7C5AC2] text-white font-medium hover:bg-[#6f50ba] active:bg-[#6247b1] transition ${className}`}
    {...rest}
  >
    {children}
  </button>
);

const GhostButton = ({ children, className = "", ...rest }) => (
  <button
    className={`h-10 px-4 rounded-xl bg-white text-gray-700 font-medium ring-1 ring-gray-200 hover:bg-gray-50 ${className}`}
    {...rest}
  >
    {children}
  </button>
);

const Input = React.forwardRef(function Input(
  { label, left, right, className = "", ...rest },
  ref
) {
  return (
    <label className="block">
      {label && <span className="block mb-1 text-[13px] text-gray-600">{label}</span>}
      <div className="relative">
        {left && <span className="absolute inset-y-0 left-3 grid place-items-center">{left}</span>}
        <input
          ref={ref}
          {...rest}
          className={`w-full h-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C5AC2]/60 focus:border-transparent
          ${left ? "pl-10" : "pl-3"} ${right ? "pr-10" : "pr-3"} ${className}`}
        />
        {right && <span className="absolute inset-y-0 right-3 grid place-items-center">{right}</span>}
      </div>
    </label>
  );
});

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange?.(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition
    ${checked ? "bg-pink-500" : "bg-gray-200"}`}
    type="button"
  >
    <span
      className={`h-5 w-5 rounded-full bg-white shadow transform transition
      ${checked ? "translate-x-5" : "translate-x-1"}`}
    />
  </button>
);

const Modal = ({ open, onClose, title, children, wide = false }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        ${wide ? "w-[680px]" : "w-[420px]"} max-w-[95vw]`}
      >
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#7C5AC2]">{title}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
              <FiX />
            </button>
          </div>
          <div className="mt-3">{children}</div>
        </Card>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------
   Profile Context (single source of truth)
----------------------------------------------------------------------------- */
const ProfileCtx = createContext(null);
const useProfile = () => useContext(ProfileCtx);

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "Jhon Doe",
    email: "example@email.com",
    phone: "(+1) 000 0000 000",
    avatar: "/assets/Avatar.jpg",
  });

  const [noti, setNoti] = useState({
    payments: true,
    order: true,
    messages: false,
  });

  const updateProfile = (patch) => setProfile((p) => ({ ...p, ...patch }));
  const value = useMemo(() => ({ profile, updateProfile, noti, setNoti }), [profile, noti]);

  return <ProfileCtx.Provider value={value}>{children}</ProfileCtx.Provider>;
};

/* ----------------------------------------------------------------------------
   Shared header card
----------------------------------------------------------------------------- */
const HeaderCard = ({ ctaText, onCta }) => {
  const { profile } = useProfile();
  return (
    <div className="bg-[#7C5AC2] text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{profile.name}</div>
          <div className="text-white/90 text-sm">{profile.email}</div>
        </div>
      </div>
      {ctaText && (
        <button
          onClick={onCta}
          className="h-9 px-3 rounded-lg bg-white text-[#7C5AC2] font-medium hover:bg-white/90"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------
   PAGE 1: Profile Hub (screenshot #1)
----------------------------------------------------------------------------- */
const ProfileHub = () => {
  const nav = useNavigate();
  const { noti, setNoti } = useProfile();

  return (
    <div className="space-y-4">
      <HeaderCard ctaText="Change Profile Settings" onCta={() => nav("details")} />

      <Card className="p-3 sm:p-4">
        <div className="divide-y divide-gray-200">
          {/* Account Settings */}
          <SectionRow
            icon={<FiUser />}
            title="Account Settings"
            subtitle="Email, password, authentication"
            onClick={() => nav("settings")}
          />

          {/* Notifications block (title row, then options) */}
          <div className="flex items-start gap-3 py-4">
            <IconBox><FiBell /></IconBox>
            <div className="flex-1">
              <div className="text-gray-900 font-semibold">Notifications</div>
              <div className="text-gray-400 text-[12px]">Allow notifications for an activity</div>

              <div className="mt-4 space-y-4">
                <ToggleRow
                  label="Payments"
                  checked={noti.payments}
                  onChange={(v) => setNoti((s) => ({ ...s, payments: v }))}
                />
                <ToggleRow
                  label="Order Completion"
                  checked={noti.order}
                  onChange={(v) => setNoti((s) => ({ ...s, order: v }))}
                />
                <ToggleRow
                  label="Messages"
                  checked={noti.messages}
                  onChange={(v) => setNoti((s) => ({ ...s, messages: v }))}
                />
              </div>
            </div>
            <div className="w-6 sm:w-8" />
          </div>

          {/* Report */}
          <SectionRow
            icon={<FiFlag />}
            title="Report"
            subtitle="Flags, technical issues"
            onClick={() => {/* open a report modal later */}}
          />

          {/* Logout */}
          <SectionRow
            icon={<FiLogOut />}
            title="Logout"
            onClick={() => nav("/auth/login")}
            chevron={false}
          />
        </div>
      </Card>
    </div>
  );
};

const IconBox = ({ children }) => (
  <span className="inline-flex h-10 w-10 rounded-xl bg-[#7C5AC2]/10 text-[#7C5AC2] items-center justify-center">
    {children}
  </span>
);

const SectionRow = ({ icon, title, subtitle, onClick, chevron = true }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-start gap-3 py-4 hover:bg-gray-50 rounded-xl px-1"
  >
    <IconBox>{icon}</IconBox>
    <div className="flex-1 text-left">
      <div className="text-gray-900 font-semibold">{title}</div>
      {subtitle && <div className="text-gray-400 text-[12px]">{subtitle}</div>}
    </div>
    {chevron && <FiChevronRight className="text-gray-400 mt-1" />}
  </button>
);

const ToggleRow = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700">{label}</span>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

/* ----------------------------------------------------------------------------
   PAGE 2: Profile Details (screenshot #2) + Edit modal (#3)
----------------------------------------------------------------------------- */
const ProfileDetails = () => {
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <HeaderCard
        ctaText="Edit Profile"
        onCta={() => setOpen(true)}
      />

      <Card className="p-3 sm:p-4">
        <RowKV label="Username" value={profile.name} />
        <RowKV label="Email" value={profile.email} />
        <RowKV label="Phone Number" value={profile.phone} />
      </Card>

      <EditProfileModal
        open={open}
        onClose={() => setOpen(false)}
        profile={profile}
        onSave={(vals) => {
          updateProfile(vals);
          setOpen(false);
        }}
      />
    </div>
  );
};

const RowKV = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50">
    <span className="text-gray-700">{label}</span>
    <span className="text-gray-500">{value}</span>
  </div>
);

const EditProfileModal = ({ open, onClose, profile, onSave }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  React.useEffect(() => {
    if (open) {
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
    }
  }, [open, profile]);

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile" wide>
      <div className="flex flex-col items-center">
        <img src={profile.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        <button className="text-[#7C5AC2] text-sm mt-2 hover:underline">
          Change Profile Picture
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <Input label="Username" value={name} onChange={(e) => setName(e.target.value)} left={<FiUser className="text-gray-400" />} />
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} left={<FiMail className="text-gray-400" />} />
        <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} left={<FiPhone className="text-gray-400" />} />
      </div>

      <div className="mt-5 flex gap-3">
        <Button className="flex-1" onClick={() => onSave({ name, email, phone })}>Save</Button>
        <GhostButton className="flex-1" onClick={onClose}>Cancel</GhostButton>
      </div>
    </Modal>
  );
};

/* ----------------------------------------------------------------------------
   PAGE 3: Account Settings (screenshot #4) + Email modal (#5) + Password modal (#6)
----------------------------------------------------------------------------- */
const AccountSettings = () => {
  const { profile, updateProfile } = useProfile();
  const [openEmail, setOpenEmail] = useState(false);
  const [openPwd, setOpenPwd] = useState(false);
  const [auth, setAuth] = useState("Phone Number");

  return (
    <div className="space-y-4">
      {/* simple breadcrumb like your header bar does; optional link back */}
      <div className="text-sm text-gray-400">
        <Link to="/profile" className="hover:underline text-[#7C5AC2]">Profile</Link>
        {" / "}
        <span className="text-gray-500">Profile Settings</span>
      </div>

      <Card className="p-3 sm:p-4">
        <div
          className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => setOpenEmail(true)}
        >
          <span className="text-gray-700">Login Email</span>
          <span className="text-gray-500">{profile.email}</span>
        </div>

        <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50">
          <span className="text-gray-700">Authentication</span>
          <select
            value={auth}
            onChange={(e) => setAuth(e.target.value)}
            className="h-9 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5AC2]/60"
          >
            <option>Phone Number</option>
            <option>Email</option>
            <option>Authenticator App</option>
          </select>
        </div>

        <div
          className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => setOpenPwd(true)}
        >
          <span className="text-gray-700">Change Password</span>
          <FiChevronRight className="text-gray-400" />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="px-8">Edit</Button>
      </div>

      <ConfirmEmailModal
        open={openEmail}
        initialEmail={profile.email}
        onClose={() => setOpenEmail(false)}
        onSave={(email) => {
          updateProfile({ email });
          setOpenEmail(false);
        }}
      />

      <ChangePasswordModal open={openPwd} onClose={() => setOpenPwd(false)} />
    </div>
  );
};

const ConfirmEmailModal = ({ open, onClose, initialEmail, onSave }) => {
  const [email, setEmail] = useState(initialEmail);
  React.useEffect(() => { if (open) setEmail(initialEmail); }, [open, initialEmail]);

  return (
    <Modal open={open} onClose={onClose} title="Confirm your email">
      <p className="text-sm text-gray-500">
        Enter your email to confirm your account login access
      </p>

      <div className="mt-3">
        <Input label="Login Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mt-5 flex gap-3">
        <Button className="flex-1" onClick={() => onSave(email)}>Save</Button>
        <GhostButton className="flex-1" onClick={onClose}>Cancel</GhostButton>
      </div>
    </Modal>
  );
};

const ChangePasswordModal = ({ open, onClose }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [cur, setCur] = useState("12345678");
  const [next, setNext] = useState("qwerty55%");

  React.useEffect(() => {
    if (open) { setCur(""); setNext(""); setShow1(false); setShow2(false); }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="Change Password">
      <p className="text-sm text-gray-500">
        Enter your email to confirm your account login access
      </p>

      <div className="mt-3 space-y-3">
        <Input
          label="Current Password"
          type={show1 ? "text" : "password"}
          value={cur}
          onChange={(e) => setCur(e.target.value)}
          right={
            <button onClick={() => setShow1((s) => !s)} type="button">
              {show1 ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />
        <Input
          label="New Password"
          type={show2 ? "text" : "password"}
          value={next}
          onChange={(e) => setNext(e.target.value)}
          right={
            <button onClick={() => setShow2((s) => !s)} type="button">
              {show2 ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />
      </div>

      <div className="mt-5 flex gap-3">
        <Button className="flex-1" onClick={onClose}>Save</Button>
        <GhostButton className="flex-1" onClick={onClose}>Cancel</GhostButton>
      </div>
    </Modal>
  );
};

/* ----------------------------------------------------------------------------
   Root: nested routes under /profile/*
----------------------------------------------------------------------------- */
const ProfilePage = () => {
  return (
    <ProfileProvider>
      <div className="p-3 sm:p-4 space-y-4">
        <Routes>
          <Route index element={<ProfileHub />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </ProfileProvider>
  );
};

export default ProfilePage;
