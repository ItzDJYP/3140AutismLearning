# Team Name: Atlus

Member Roles:

Patrick - Project Manager/FrontEnd| [Github](https://github.com/ItzDJYP)

Ashanti - UX/UI Designer| [Github](https://github.com/ashantib102)

Sherwan - Researcher/Backend| [Github](https://github.com/Sheroka)

## Project Description:

Atlus is a website that helps autistic children ages 4–6 practice essential social–emotional skills through games that progressively get more difficult. The age group we decided to focus on is especially important for building the foundations of language, social interaction, and everyday thinking skills like focusing, remembering steps, planning, and self-control—areas where well-timed, developmentally appropriate practice can make a meaningful difference. Our games are focused on supporting autistic children with higher support needs(DSM-5 Levels 2-3). 

## How our games help kids with autism: 

Turn Taking- Gives kids many short chances to notice “not my turn / my turn” cues, wait, and then use simple entry phrases (e.g., “Can I play?”). It pairs clear visual signals (a red/yellow/green cue and on-screen wording) with brief prompts and immediate feedback so children can practice response inhibition, reading social cues, and polite joining—skills that are often hard at this age. This design maps directly to evidence-based practices for autism: visual supports (the color cues and prompt text) and modeling/rehearsal of specific social phrases. These strategies are identified as evidence-based by the National Clearinghouse on Autism Evidence & Practice and detailed in AFIRM’s practitioner modules. 

Emotion Match- Helps with a common challenge—recognizing and labeling facial emotions—by pairing clear pictures with simple labels so kids can focus on visual cues rather than lots of language. The picture-based, consistent layout functions as visual supports, an evidence-based practice for autism that helps young children understand expectations and respond more independently. 

Friendship Choices- Targets core social-communication needs  by practicing when to wait, when to speak, how to join play, and how to repair small conflicts. It uses short, concrete scenarios with limited choices and optional read-aloud so language load stays low and expectations are clear. Each question gives immediate, specific feedback and positive reinforcement to shape the target behavior. Difficulty ramps gradually, and the brief “why this is a good choice” text acts like simple modeling/prompting to teach the social rule. 

Word Association- This game pairs clear images with spoken words to make vocabulary concrete and accessible, especially for kids who benefit from visual supports.Each short round uses proven teaching moves—prompting, immediate feedback, and repeated practice—so children can listen, scan, and choose with growing accuracy.

Pattern Path- Gives children calm, predictable way to practice core learning and self-regulation skills. The repeating sequences (ABAB/ABBA/ABC and simple skip-counting) build pattern recognition, working memory, and “what comes next” reasoning. Read-aloud (TTS) supports pre-readers and receptive language, and the reduced choices + big buttons options lower visual and motor load for kids who benefit from simpler screens. Instant feedback, stars, and unlockable skins provide gentle reinforcement without overwhelming sound or animation. Because difficulty rises gradually and progress is saved, children can repeat successful patterns, gain confidence, and then stretch to more complex sequences at their own pace.


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
├── .vscode/                        
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
│   │   ├── script.js               # Controls index.html interactivity 
│   │   ├── turn-taking.js
│   │   └── word-assoc.js
│   │
│   ├── autism-info.html
│   ├── autisminfo.css              
│   ├── emotion-match.html
│   ├── emotion-match.css
│   ├── friendshipchoices-game.html
│   ├── friendshipchoices-game.css
│   ├── games.html                  # Ganes menu
│   ├── index.html                  # Login and Home Page
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
│   └── progress.json               
│
├── server/                         # Back-end (Node/Express)
│   ├── models/                     # Mongoose models, etc.
│   ├── app.js                      # Express entry point
│   ├── package.json
│   └── package-lock.json
├──                 
└──         


```

---

