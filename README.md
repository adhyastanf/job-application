This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Berikut versi **Markdown README.md** profesional dari case study kamu — sudah diformat rapi dan siap commit langsung ke repo GitHub:

---

````markdown
# 🧾 Case Study Report – Frontend Engineer Hiring Challenge 2025

## 1. Candidate Information
**Full Name:** Adhyasta Naufal Faadhilah  
**Email Address:** adhyasta.nf@gmail.com  
**Deployed URL:** _to be shown in README GitHub repository_  

**Admin Credential:**  
- Username: `admin`  
- Password: `admin`  

**Applicant Credential:**  
- Username: `user`  
- Password: `user`  

**GitHub Repository:**  
[https://github.com/adhyastan/hiring-platform](https://github.com/adhyastan/hiring-platform)

---

## 2. Project Overview
This project implements a **Hiring Management Web App** based on the Rakamin Frontend Engineer brief.  
The application is built using **Next.js**, focusing on frontend logic integrated with provided **mock API responses**.  

The main objective is to translate the **Figma design** into a **pixel-perfect, responsive UI**, while dynamically rendering form fields and validation based on backend mock configurations.

---

## 3. Tech Stack Used
- **Framework:** Next.js 14 (App Router)  
- **Styling:** TailwindCSS + Shadcn/UI  
- **State Management:** Zustand (persist middleware)  
- **API Data:** Mock JSON (simulated fetch API)  
- **Form Validation:** React Hook Form + Zod  
- **Authentication:** Simple static auth (server-side credential check & middleware for protected pages)  
- **Deployment:** Vercel  

---

## 4. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Access locally
http://localhost:3000
````

### **Login Credentials**

* **Admin →** `admin / admin`
* **Candidate →** `user / user`

---

## 5. Key Features Implemented

### ✅ Job List (Admin & Applicant)

* Displays job listings from `/mock/jobs.json`
* Includes filtering and status badges (Active / Inactive / Draft)
* “+ Create Job” button opens modal (sliced and behavior-matched to Figma design)

### ✅ Create Job Modal / Page (Admin)

* Input form for job metadata (title, department, description, etc.)
* Dynamic field configuration (Mandatory / Optional / Off) based on JSON backend mock
* Validation handled via **Zod** + **React Hook Form**

### ✅ Candidate Management Page

* Displays applicant table per job
* Columns are **resizable** and **reorderable** (modular implementation)
* Sorting and pagination using mock data simulation

### ✅ Apply Job Page (Applicant)

* Form fields dynamically rendered based on job configuration (mock JSON)
* Fields shown/hidden based on `required` property
* Adaptive validation according to backend data definition

### ✅ Profile Picture via Webcam Gesture (UI Ready)

* Webcam component prepared with placeholder for gesture capture
* WebGL/HandPose integration partially implemented (mock UI ready)

### ✅ Responsive & Pixel-Perfect Design

* Follows Figma design precisely
* Layout implemented using **Shadcn ScrollArea**
* Fully responsive across multiple viewports

---

## 6. Optional Enhancements

* Modular component architecture (`components/` and `stores/` folders using Zustand)
* Global loading & error state for fetch handling
* Dynamic routing for Admin and Candidate roles
* Gesture camera placeholder ready for ML integration (Tensorflow / MediaPipe)

---

## 7. Design or Logic Assumptions

* Navigation flow between Admin and Candidate roles handled via simple static authentication (no real backend auth).
* Figma design does not fully define some states (pagination, modal flow), so interactions were logically adjusted to ensure consistent UX.
* Dynamic validation and form logic are based on mock JSON data without database persistence.

---

## 8. Known Limitations

* **Data not fully dynamic:**
  Since using mock JSON, actions such as creating jobs, updating configs, or submitting applications are not stored persistently.

* **Unclear flow design:**
  Some parts of the Figma design lack defined navigation flow; therefore, logical interpretation was used based on PRD context.

* **No unit testing yet:**
  Unit tests are not yet implemented in this version, though I have prior experience using **Jest** for component and state testing.

* **Partial refactoring:**
  Some components have been modularized, but full refactor has not been completed due to time constraints.

---

## 9. Future Improvements

* Implement full CRUD operations using **Supabase** or **Firebase** for persistent data.
* Integrate gesture-based photo capture with **Tensorflow/MediaPipe**.
* Add **unit tests** using Jest and Playwright for UI validation.
* Refactor component structure and hooks for improved modularization and maintainability.

---

> “Beberapa komponen sudah dibuat modular namun belum sepenuhnya di-refactor, dan unit test belum diimplementasikan meskipun saya berpengalaman menggunakan Jest.”
> — Statement reflected in *Known Limitations* and *Future Improvements* sections.


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
