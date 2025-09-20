# Fresh Life — Church Community Web App

A modern Next.js application for a church community. The goal is to connect with members, publish announcements, list scheduled events, and share sermons (text, audio, or video). Future iterations will support authenticated member areas and role‑based tools for church staff. 

[Visit the demo](https://fresh-life-repo.vercel.app/)

---

## ✨ Features (Still in progress)

* **Public pages**: Home, About, Contact, Community page.
* **Events**: Browse upcoming and past events with dates, locations, and descriptions. 
* **Sermons**: Share sermon metadata and embed media (e.g., YouTube/Vimeo, audio).
* **Auth-ready**: Project includes auth dependencies (JWT) to support login/signup.
* **API-ready**: Mongoose is included for MongoDB models and API routes.
* **Responsive UI**: Tailwind CSS for quick, accessible, mobile‑first design.

> **Future**: Member profiles, prayer requests, small group directories, admin dashboard, content scheduling, notifications/subscriptions.

---

## 🧰 Tech Stack

* **Framework**: Next.js **15** (App Router, Turbopack)
* **UI**: React **19**, Tailwind CSS **v4**
* **DB/ORM**: MongoDB + **Mongoose**
* **Auth**: **jsonwebtoken** / **jose** (JWT based)
* **Security**: **bcrypt / bcryptjs** for password hashing
* **Animations**: **framer-motion**
* **Icons**: **react-icons**
* **Linting**: ESLint (Next.js config)

> Recommended Node.js: **v20 LTS** or newer.

---

## 📦 Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 4000 --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  }
}
```

* `npm run dev` — Start the dev server at **[http://localhost:4000](http://localhost:4000)** with Turbopack.
* `npm run build` — Production build (Turbopack).
* `npm start` — Start the production server.
* `npm run lint` — Run ESLint.

Use `npm`, `pnpm`, or `yarn` (pick one and stick with it).

---

## 🚀 Getting Started

### 1) Prerequisites

* **Node.js 20+** and **npm 10+** (or pnpm/yarn)
* **MongoDB** connection string (local or Atlas)

### 2) Install dependencies

```bash
npm install
# or
pnpm install
```

### 3) Environment Variables

Create a `.env.local` in the project root:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# JWT (choose one approach)
JWT_SECRET=replace_me_with_a_long_random_string
# or for jose (asymmetric):
JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"

# App
NEXT_PUBLIC_SITE_URL=http://localhost:4000
```

> Never commit real secrets. Use `.gitignore` for `.env*` files.

### 4) Run the app

```bash
npm run dev
```

Open **[http://localhost:4000](http://localhost:4000)**.

---

## 🗂️ Project Structure (suggested)

> This is a typical Next.js 15 App Router layout. Adjust to match your repo if it differs.

```
mock-repo/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx              # Landing / community page
│  │  └─ layout.tsx
│  ├─ events/
│  │  ├─ page.tsx              # Events listing
│  │  └─ [id]/page.tsx         # Event detail
│  ├─ sermons/
│  │  ├─ page.tsx              # Sermons listing
│  │  └─ [id]/page.tsx         # Sermon detail
│  ├─ api/
│  │  ├─ auth/
│  │  │  ├─ login/route.ts     # POST login
│  │  │  └─ register/route.ts  # POST register
│  │  ├─ events/route.ts       # GET/POST events
│  │  └─ sermons/route.ts      # GET/POST sermons
│  └─ globals.css
├─ lib/
│  ├─ db.ts                    # Mongo connection (mongoose)
│  ├─ auth.ts                  # JWT helpers (sign/verify)
│  └─ validators.ts            # validator helpers
├─ models/
│  ├─ User.ts                  # User schema
│  ├─ Event.ts                 # Event schema
│  └─ Sermon.ts                # Sermon schema
├─ components/
│  ├─ ui/                      # Buttons, cards
│  ├─ EventCard.tsx
│  ├─ SermonCard.tsx
│  └─ Navbar.tsx
├─ public/
│  └─ images/
├─ .env.local                  # not committed
├─ package.json
├─ tailwind.config.ts
└─ README.md
```

---

## 🧱 Data Models (example)

**User**

* `email: string` (unique)
* `password: string` (hashed with bcrypt)
* `role: 'member' | 'staff' | 'admin'`
* `name: string`

**Event**

* `title: string`
* `date: Date`
* `location?: string`
* `description?: string`
* `published: boolean`

**Sermon**

* `title: string`
* `speaker?: string`
* `date?: Date`
* `series?: string`
* `embedUrl?: string` (YouTube/Vimeo/Audio)
* `passage?: string` (e.g., "John 3:16–18")
* `published: boolean`

> Adjust or extend as needed (categories, tags, attachments, etc.).

---

## 🔐 Authentication (JWT flow)

1. **Register**: `POST /api/auth/register` → Create user → hash password (bcrypt) → store.
2. **Login**: `POST /api/auth/login` → Verify password → issue JWT (httpOnly cookie or header).
3. **Protect routes**: Middleware verifies the JWT on API/SSR requests.
4. **Roles**: Check `role` claim (`staff/admin`) for admin endpoints.

If you prefer a managed solution: consider **NextAuth.js** (Credentials + OAuth) later.

---

## 🧪 Testing (optional starter)

* Unit: `vitest` or `jest` (choose one)
* Component: `@testing-library/react`
* E2E: `playwright`

Example commands (if you add them later):

```json
{
  "scripts": {
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

---

## 🧹 Linting & Formatting

* Run `npm run lint`.
* Consider adding **Prettier** and a pre-commit hook with **lint-staged**.

---

## 🛫 Deployment

* **Vercel** (recommended):

  1. Import the repo into Vercel.
  2. Add environment variables (same as `.env.local`).
  3. Set framework to **Next.js**. Vercel will build with Turbopack.
* **Docker** (optional):

  * Create a multi‑stage `Dockerfile` and map `PORT` to 4000.

---

## 🔐 Security & Safety

* Always **hash passwords** with bcrypt using a strong salt.
* Use **httpOnly**, **Secure**, **SameSite** cookies for session tokens.
* Validate and sanitize input (e.g., with `validator`).
* Keep dependencies up to date.

---

## ♿ Accessibility

* Use semantic HTML, labeled form controls, proper headings.
* Ensure color contrast and focus states in Tailwind.
* Test with keyboard navigation and screen readers.

---

## 🗺️ Roadmap

* [ ] Member profiles & directory
* [ ] Staff/admin dashboard
* [ ] Event RSVPs & reminders
* [ ] Sermon series, transcripts, file uploads
* [ ] Search & filters (events/sermons)
* [ ] Newsletter / email integration
* [ ] iCal export for events

---

## 🤝 Contributing

1. Fork & clone
2. Create a branch: `feat/<name>`
3. Commit using clear messages
4. Open a PR with screenshots/descriptions

---

## 📄 License

This project is currently **private**. Copyright © You and contributors.

---

## 🙌 Acknowledgements

Built with ❤️ using Next.js, Tailwind, and MongoDB.
