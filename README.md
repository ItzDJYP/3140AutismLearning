**Team Name: Atlus**

**Member Roles:**

Patrick - Project Manager/FrontEnd| [Github](https://github.com/ItzDJYP)

Ashanti - UX/UI Designer| [Github](https://github.com/ashantib102)

Sherwan - Researcher/Backend| [Github](https://github.com/Sheroka)

** **Project Description:** **

Atlus is a website that helps autistic children ages 4–6 practice essential social–emotional skills through short, playful games designed for early learners. This window is especially important for building the foundations of language, social interaction, and everyday thinking skills like focusing, remembering steps, planning, and self-control—areas where well-timed, developmentally appropriate practice can make a meaningful difference.

Key Features:

Sign Up Page for Parents/Caregivers to register their child

5 games with targeted educational goals

Reward System that incentivizes consistent engagement

Progress Tracking dashboard for parents

Autism Education Hub with resources and stories to promote inclusivity


## 📊 Flowchart – User Journey

```plaintext
            ┌────────────────┐
            │   Landing Page │
            └──────┬─────────┘
                   ▼
           ┌─────────────────┐
           │   User Login    │◄──────┐
           └──────┬──────────┘       │
                  ▼                  │
        ┌──────────────────────┐     │
        │   Parent Dashboard   │─────┘
        └────┬────────────┬────┘
             │            │
             ▼            ▼
     ┌────────────┐   ┌───────────────┐
     │ Play Games │   │ Track Progress│
     └────┬───────┘   └───────────────┘
          ▼
   ┌──────────────┐
   │ Earn Points  │
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │ Redeem Gifts │
   │ or Badges    │
   └──────────────┘
          │
          ▼
  ┌────────────────────┐
  │ Autism Info Center │
  │    + Share Stories │
  └────────────────────┘
```

---

## 📁 Repository Structure

```plaintext
3140AUTISMLEARNING/
├── .vscode/                        # Editor settings (workspace)
├── .gitignore
├── README.md
│
├── client/                         # Front-end (static site)
│   ├── images/                     # All image assets
│   │
│   ├── js/                         # Game + page scripts
│   │   ├── emotion-match.js
│   │   ├── friendshipchoices-game.js
│   │   ├── pattern-path.js
│   │   ├── script.js               # Shared/front-page helpers
│   │   ├── turn-taking.js
│   │   └── word-assoc.js
│   │
│   ├── autism-info.html
│   ├── autisminfo.css              # (pairs with autism-info.html)
│   ├── emotion-match.html
│   ├── emotion-match.css
│   ├── friendshipchoices-game.html
│   ├── friendshipchoices-game.css
│   ├── games.html                  # Games hub / menu
│   ├── index.html                  # Landing / home
│   ├── pattern-path.html
│   ├── pattern-path.css
│   ├── progress.html
│   ├── progress.css
│   ├── sign-up.html
│   ├── sign-up.css
│   ├── turn-taking.html
│   ├── turn-taking.css
│   ├── word-assoc.html
│   └── word-assoc.css
│
├── data/
│   └── progress.json               # Local demo/progress data
│
├── server/                         # Back-end (Node/Express)
│   ├── models/                     # Mongoose models, etc.
│   ├── app.js                      # Express entry point
│   ├── package.json
│   └── package-lock.json
│
├── package.json                    # (duplicate at repo root)
└── package-lock.json               # (duplicate at repo root)


```

---

