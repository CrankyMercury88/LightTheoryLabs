// Light Theory Labs — website v2 content. Plain JS; the build script evaluates it.
const CONTENT = {
  config: {
    name: "Light Theory Labs",
    baseUrl: "https://crankymercury88.github.io/LightTheoryLabs",
    calendarUrl: "https://cal.com/lighttheorylabs/pilot",
    formAction: "", // e.g. "https://formspree.io/f/xxxxxxx". Empty = falls back to email.
    email: "hello@lighttheorylabs.com",
    entity: "Light Theory Labs is a creative training lab for video AI: RL environments, professional evaluation and rights-cleared footage, built and graded by senior editors, colorists and sound designers.",
    updated: "2026-10-05",
    social: { linkedin: "https://www.linkedin.com/company/lighttheorylabs", youtube: "https://www.youtube.com/@lighttheorylabs", github: "https://github.com/CrankyMercury88/LightTheoryLabs", huggingface: "https://huggingface.co/lighttheorylabs" }
  },

  sources: {
    timeline: { id: "timeline", label: "Timeline-Bench, 2026", short: "Gupta, Arora & Tankala, Timeline-Bench, arXiv:2609.35143, Sep 2026", url: "https://arxiv.org/abs/2609.35143", title: "Timeline-Bench: Evaluating Agents on Realistic Video-Editing Tasks, from Raw Footage to Final Cut" },
    cutverse: { id: "cutverse", label: "CutVerse, 2026", short: "Hu et al., CutVerse, arXiv:2605.19484, May 2026", url: "https://arxiv.org/abs/2605.19484", title: "CutVerse: A Compositional GUI Agents Benchmark for Media Post-Production Editing" },
    agenticv: { id: "agenticv", label: "AgenticVBench, 2026", short: "Cao et al., AgenticVBench, arXiv:2605.27705, 2026", url: "https://arxiv.org/abs/2605.27705", title: "AgenticVBench: Can AI Agents Complete Real-World Post-Production Tasks?" },
    epoch: { id: "epoch", label: "Epoch AI, 2026", short: "Barber & Denain, Epoch AI, An FAQ on Reinforcement Learning Environments, Jan 2026", url: "https://epoch.ai/gradient-updates/state-of-rl-envs", title: "An FAQ on Reinforcement Learning Environments" },
    techcrunch: { id: "techcrunch", label: "TechCrunch, 2025", short: "TechCrunch, Silicon Valley bets big on 'environments' to train AI agents, Sep 2025", url: "https://techcrunch.com/2025/09/21/silicon-valley-bets-big-on-environments-to-train-ai-agents/", title: "Silicon Valley bets big on 'environments' to train AI agents" }
  },

  home: {
    title: "Light Theory Labs — The training lab for frontier video AI",
    description: "RL environments, professional evaluation and rights-cleared footage for video AI, built and graded by senior editors.",
    h1lineA: "The training lab for", h1lineB: "frontier ", h1accent: "video", h1b: " AI.",
    lede: "RL environments, professional evaluation and rights-cleared footage for the models and agents learning to make video. Every task is authored and graded by working editors, colorists and sound designers.",
    problem: {
      label: "The problem",
      h2: "Agents can operate the software. They cannot yet judge the cut.",
      body: [
        "On Timeline-Bench, 56 real editing tasks that run from raw footage to a finished deliverable, the best of 16 frontier agents resolved 26.8% of tasks and the average agent resolved 14.0%. Of the runs that failed, 73% passed every delivery and content test and failed only the quality test.",
        "The agents read footage as still frames and transcripts, inspected their renders for defects rather than pacing or story, and reported success in 93% of runs. Correctness can be verified by a script. Craft has to be taught by the people who have it, and that is what we supply."
      ],
      stats: [
        { n: "26.8%", k: "Real editing tasks go unsolved.", t: "Tasks resolved by the best of 16 agents on Timeline-Bench's 56 real editing tasks.", cite: "timeline" },
        { n: "83.5%", k: "Editors prefer human judgement.", t: "Blind judgments in which professional editors preferred the human reference cut to the agent's.", cite: "timeline" },
        { n: "93%", k: "Agents can't tell when they've failed.", t: "Runs in which the agent reported success, including 95.5% of edits that failed a test.", cite: "timeline" },
        { n: "36.0%", k: "Pro software stumps GUI agents.", t: "Task success for GUI agents across 186 post-production tasks in seven professional applications.", cite: "cutverse" }
      ]
    },
    anatomy: {
      label: "RL environments", h2: "Anatomy of an RL task",
      body: "An environment is only as useful as its reward signal. Ours combines checks a script can verify with a craft rubric scored blind by a calibrated panel, and every grader is attacked by an engineer before it ships.",
      steps: [
        { name: "Brief", note: "Written the way a client writes it: audience, runtime, tone, delivery spec." },
        { name: "Source footage", note: "Owned or licensed for AI training. Never client material." },
        { name: "Starting state", note: "A DaVinci Resolve project or open timeline file that restores identically on every attempt." },
        { name: "Reference cut", note: "Made by a senior editor, with a narrated account of the decisions." },
        { name: "Grader", note: "Automatic checks for quotes, runtime, loudness and spec. A rubric for structure, pace and continuity." },
        { name: "Score", note: "A verdict with reasons, cited to timecode, so the signal can be inspected and not just consumed." }
      ]
    },
    logos: [{ name: "Google", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Google_2015_logo.svg" }, { name: "PBS", src: "https://commons.wikimedia.org/wiki/Special:FilePath/PBS_logo_2019.svg" }, { name: "Reddit", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Reddit_wordmark.svg" }, { name: "1000 heads", src: "" }, { name: "Viz Media", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Viz_Media_2017_logo.svg" }, { name: "YMCA", src: "https://commons.wikimedia.org/wiki/Special:FilePath/YMCA_of_the_USA_2010_logo_blue-purple.svg" }],
    panel: {
      label: "The panel", h2: "Judgment from people who have shipped the work.",
      body: "Our experts include Emmy winners, multi-award-winning documentarians, and editors, colorists and sound designers who have worked at leading media companies, from Google to PBS.",
      cards: [
        { name: "Who they are", note: "Senior post-production professionals with broadcast, documentary and brand credits, still working in the field." },
        { name: "The bar", note: "A portfolio review by a working editor and a paid test task before anyone joins. Seniority is the filter, not availability." },
        { name: "Calibration", note: "Every panelist scores a shared reference set blind before grading, and agreement is measured and published with each delivery." }
      ]
    },
    trust: {
      label: "Why the data holds up",
      cards: [
        { name: "Rights-clean by construction", note: "Contributors assign IP under an AI-training license. Everyone filmed signs a release that covers training, transfer and deletion. A provenance log ties each asset to its consent." },
        { name: "Graders that resist gaming", note: "Before a task enters the set, an engineer tries to pass its grader without doing the work. Graders that can be gamed are rebuilt." },
        { name: "Agreement you can inspect", note: "Inter-rater agreement ships with every evaluation. A rubric without agreement data is an opinion." },
        { name: "Tools licensed for training", note: "DaVinci Resolve, open timeline formats and open-source tools only. We do not build on software whose terms prohibit AI-training use." }
      ]
    },
    faq: [
      { q: "What is an RL environment for video editing?", a: "A reproducible task an agent can attempt repeatedly: a brief, source footage, a starting project and a grader that scores the result, shipped with a senior editor's reference cut. The agent learns from the reward; the reference cut shows what the reward is pointing at." },
      { q: "Why are editing tasks hard for agents that already write code?", a: "Most of what makes a cut good is not checkable by a script. On Timeline-Bench, 73% of failed runs passed every delivery and content test and failed only the human-calibrated quality test. The missing capability is judgment, which is why our graders include a calibrated panel." },
      { q: "Which tools do you build on?", a: "DaVinci Resolve, open timeline formats (OTIO, EDL, FCPXML) and open-source tools such as Shotcut, Ardour and Blender. We do not build on tools whose licenses prohibit AI-training use." },
      { q: "How do your graders resist reward hacking?", a: "Each grader pairs automatic checks with a blind craft rubric, and an engineer attempts to pass it without doing the work before it ships. Tasks that top agents can pass more than 30% of the time with five attempts do not enter the set." },
      { q: "How does an engagement start?", a: "With a 30-minute call or live demo. We walk through a sample task, its grader and a baseline run, then send a written proposal within 48 hours. Scope depends on task volume, customisation and exclusivity, and is quoted in the proposal." },
      { q: "Can you work under a data vendor's contract?", a: "Yes. We subcontract white-label or co-deliver, with NDA and non-circumvention signed first. We do not approach a vendor's client about work that vendor introduced." }
    ]
  },

  solutions: [
    {
      slug: "rl-training-packages", nav: "RL training packages", index: "01", lead: true,
      title: "RL environments for video AI",
      description: "Reproducible video-editing tasks with reference cuts and graders that resist gaming, built by senior editors.",
      summary: "Reproducible editing tasks, from pre-production to finishing, each with a brief, rights-cleared footage, a starting project, a senior editor's reference cut and a grader that combines automatic checks with a calibrated craft rubric.",
      media: { kind: "timeline", cap1: "Starting state · paper-edit-03 · Resolve", cap2: "01:30:00 → reference 01:31:04" },
      buyers: [
        { name: "Post-training teams", note: "Frontier labs extending agents into creative software, where verifiable rewards run out." },
        { name: "Creative-tool makers", note: "Teams building editing agents inside their own applications who need held-out tasks and a craft signal." },
        { name: "Data vendors", note: "Vendors holding a lab contract who need a creative domain they cannot staff from a general pool." }
      ],
      packages: [
        { name: "Starter Pack", included: "20 post-production tasks with reference cuts, automatic graders, an editor rubric and a baseline report on three frontier agents (five attempts each)", time: "3–4 weeks" },
        { name: "Standard Pack", included: "100 tasks from pre-production to finishing, graders and baseline, with an optional exclusivity window", time: "6–8 weeks" },
        { name: "Expert panel (add-on)", included: "A calibrated panel of senior editors, colorists or sound designers for your own tasks", time: "Ongoing" },
        { name: "Custom source footage (add-on)", included: "Footage shot to specification for your tasks, fully rights-cleared", time: "Per project" }
      ],
      steps: [
        { name: "Brief and source", note: "A client-style brief and licensed footage. paper-edit-03: three founder interviews, 42 minutes of transcript, cut to 90 seconds." },
        { name: "Starting state", note: "A versioned Resolve project or OTIO, EDL or FCPXML timeline, reset before every attempt so each run starts from the same frame." },
        { name: "Reference cut", note: "A senior editor's cut, with a narrated account of why those quotes, in that order." },
        { name: "Automatic checks", note: "Verbatim quotes, speaker attribution, timecode, runtime, loudness and delivery spec, checked by script on every attempt." },
        { name: "Craft rubric", note: "Structure, pace and continuity, scored blind 0–5 by two calibrated editors." },
        { name: "Adversarial pass", note: "An engineer tries to pass the grader without doing the edit. Every shortcut that scores is closed before release." },
        { name: "Difficulty gate", note: "A task ships only if frontier agents fail it in at least 70% of attempts and a working editor finds it routine." }
      ],
      stepVisuals: ["rlBrief", "rlStart", "rlReference", "rlChecks", "rlRubric", "rlAdversarial", "rlGate"],
      task: { id: "paper-edit-03" },
      sections: [
        { label: "Task families", kind: "pipeline", heading: "From paper edit to delivery.", body: "We begin where the grader can be exact and extend toward craft as the panel's rubric is validated.", items: [
          { name: "Pre-production", status: "Planned", grader: "Rubric", id: "preprod-02", brief: "Turn a client brief into a shot list and a six-question interview plan for a two-minute brand film.", note: "Brief to outline, shot list, interview plan and schedule." },
          { name: "Production", status: "Planned", grader: "Mixed", id: "log-05", brief: "Log three hours of rushes: mark selects, fill slate metadata and write continuity notes.", note: "Logging and selects from raw footage, slate and metadata, continuity notes." },
          { name: "Paper edit", status: "Shipping", grader: "Automatic", id: "paper-edit-03", default: true, brief: "Cut 42 minutes of founder interviews to a 90-second soundbite script, every quote verbatim and timecoded.", note: "Transcript in, speaker-attributed script out. Text-native, so labs can adopt it in existing pipelines." },
          { name: "Assembly", status: "In build", grader: "Mixed", id: "assembly-02", brief: "Build the timeline from an approved paper edit and six camera files, with B-roll over every jump.", note: "Script and footage in, a timeline out, compared structurally against the reference." },
          { name: "Craft", status: "In build", grader: "Rubric", id: "craft-07", brief: "Match colour across a two-camera interview and recut the music bed so the edit lands on the beat.", note: "Trim to time, music edits on the beat, colour matching across cameras." },
          { name: "Finishing", status: "Planned", grader: "Automatic", id: "finish-04", brief: "Mix to −23 LUFS, add captions and export to a broadcast delivery spec.", note: "Loudness, captions and delivery spec, all checkable by script." }
        ]},
        { label: "What ships", kind: "ships", heading: "One folder per task.", body: "Each task is self-contained and runs against your harness, with no proprietary dependency.", items: [],
          root: "paper-edit-03/", meta: "Task folder · 1.2 GB",
          files: [
            ["brief.md", "Client-style brief and constraints", 0],
            ["source/", "Licensed footage, cleared for AI training", 0],
            ["INT-01.mov · INT-02.mov · INT-03.mov", "Three interviews, 1080p25", 1],
            ["transcript.json", "Word-level timing and speaker labels", 1],
            ["start.drp · start.otio", "Starting state, reset before every attempt", 0],
            ["reference.otio", "The senior editor's cut", 0],
            ["narration.md", "Why those quotes, in that order", 0],
            ["grader/", "Automatic checks as code, with a documented interface", 0],
            ["rubric.json", "Craft criteria, scale and calibration anchors", 0],
            ["baseline.jsonl", "Frontier-agent attempts, scores and failure tags", 0]
          ],
          foot: [["Timeline formats", "Resolve projects, OTIO, EDL, FCPXML"], ["Open-source tools", "Shotcut, OpenShot, Ardour, Audacity, Krita, GIMP, Blender"], ["License policy", "Only tools whose terms permit AI-training use"]]
        }
      ],
      faq: [
        { q: "How is this different from a benchmark?", a: "A benchmark measures distance from good work. An environment also ships a reference cut and a reward that can be optimised against. Ours are built so the reward tracks craft, not just compliance." },
        { q: "What stops an agent from gaming the grader?", a: "Automatic checks catch the verifiable failures; a blind, calibrated panel rubric catches the rest. An engineer attempts to pass every grader without doing the work before it ships, and the difficulty gate removes tasks agents can already pass." },
        { q: "Can tasks run in our own harness?", a: "Yes. Starting states ship as Resolve projects and open timeline files, and graders are delivered as code with a documented interface." },
        { q: "Are tasks exclusive?", a: "Non-exclusive by default. A time-limited exclusivity window, typically twelve months, is available; tasks return to the library when it ends." },
        { q: "Who owns the tasks?", a: "Editors and graders assign IP in tasks, reference cuts and narration under an AI-training licence. No client footage is used." },
        { q: "How is work contracted?", a: "Tasks are built against a signed order, with a deposit before work starts." }
      ]
    },
    {
      slug: "generative-video-feedback", nav: "Generative video feedback", index: "02",
      title: "Professional evaluation and post-training data for AI-generated video",
      description: "Side-by-side preferences, rubric scores and written critiques of AI-generated video from working editors, colorists and sound designers, for benchmarking a model or training it.",
      summary: "Side-by-side preferences, rubric scores and written critiques of AI-generated video, produced by working editors, colorists and sound designers rather than a general rater pool. Scores cover cinematography, colour, sound and edit, and inter-rater agreement is published alongside the results. The same judgments serve two uses: measuring a model against professional taste, and training it through reward models and preference tuning. An Evaluation Pack of 500 judgments ships in two weeks.",
      media: { kind: "waveform", cap1: "Luma waveform · generated clip 0412 · colour drift", cap2: "00:00:04:12" },
      buyers: [
        { name: "Video-generation companies", note: "Teams who need a quality signal that tracks what professionals see, not what a crowd notices." },
        { name: "Lab video teams", note: "Post-training and evaluation groups building reward models or human baselines." },
        { name: "Data vendors", note: "Vendors who need specialist raters for a creative line they cannot staff." }
      ],
      packages: [
        { name: "Evaluation Pack", included: "500 calibrated professional judgments with the rubric, per-judgment critiques and an agreement report", time: "2 weeks" },
        { name: "Preference dataset", included: "Pairwise preferences, rubric scores and critiques at training volume, on your prompts and model outputs, formatted for reward modelling and preference tuning", time: "Scoped per project" },
        { name: "Standing panel", included: "A retained panel re-run on each model release, with a stable rubric for longitudinal comparison", time: "Monthly" }
      ],
      steps: [
        { name: "Fix the rubric", note: "We adapt our four-dimension rubric to your model, prompts and failure modes, and freeze it." },
        { name: "Calibrate", note: "Graders score a shared set blind until agreement clears the required threshold." },
        { name: "Judge blind", note: "Pairwise preferences and rubric scores with model identity hidden." },
        { name: "Critique", note: "Every low score carries a written reason cited to timecode." },
        { name: "Report", note: "Scores, preferences, critiques and agreement, as a table and a JSONL export." }
      ],
      stepVisuals: ["rubric", "calibrate", "blind", "critique", "report"],
      example: {
        pair: "Pair 0412", rater: "Rater R-07 · colorist · blind",
        pref: { winner: "B", pos: 5, label: "B over A · strength 2 of 3" },
        scores: [["Cinematography", 3, 4], ["Colour", 2, 4], ["Sound", 3, 3], ["Edit", 4, 4]],
        critiques: [["00:00:01:08", "Cinematography", "Camera drifts left without motivation; horizon tilts 2°."], ["00:00:04:12", "Colour", "Skin tone shifts about 400K warmer across the cut."], ["00:00:05:20", "Sound", "Room tone drops out under the line."]]
      },
      sections: [
        { label: "Two uses", heading: "Measure the model, then train it.", body: "", items: [
          { name: "Evaluation", note: "Benchmark a model or checkpoint against professional judgment, with agreement data so the scores hold up." },
          { name: "Post-training data", note: "Preferences and scored critiques at volume, ready for reward models, RLHF and DPO." }
        ]},
        { label: "What gets judged", kind: "example", heading: "Three outputs per judgment.", body: "", items: [
          { name: "Pairwise preference", note: "Which of two clips is stronger, and by how much." },
          { name: "Rubric scores", note: "0–5 on each criterion, with the criteria fixed before judging begins." },
          { name: "Written critique", note: "What is wrong, where and why, in terms a model team can act on." }
        ]},
        { label: "Dimensions", kind: "tabs", heading: "Depth over headcount.", body: "A general rater can say a clip looks wrong. A colorist can say the skin tone drifts 400K warmer across the cut.", items: [
          { name: "Cinematography", note: "Framing, lens behaviour, camera motion, exposure consistency.", vis: "cine", cap: "Framing guides · horizon −2.4° · camera path" },
          { name: "Colour", note: "Skin tones, white-balance drift, continuity across shots.", vis: "colour", cap: "Vectorscope · shot 04 drifts warm off the skin line" },
          { name: "Sound", note: "Sync, room tone, Foley plausibility, loudness.", vis: "sound", cap: "Loudness against −23 LUFS · room-tone dropout · sync offset" },
          { name: "Edit", note: "Cut points, pacing, continuity, motivated transitions.", vis: "edit", cap: "Cut points and shot length · jump cut at 00:00:06:03" }
        ]}
      ],
      faq: [
        { q: "How is this different from crowd preference data?", a: "The raters are working professionals, calibrated against each other before scoring, and we publish the agreement data. The signal is narrower and more expensive per judgment, and considerably more informative about craft." },
        { q: "Can we supply our own rubric?", a: "Yes. We calibrate the panel on your criteria, or merge them with ours and report both." },
        { q: "Can this data be used for post-training?", a: "Yes. Pairwise preferences and rubric scores ship in a format ready for reward modelling and preference optimisation, and critiques can be used as written feedback." },
        { q: "What formats do results ship in?", a: "An HTML table in the report and a JSONL export with per-judgment scores, preferences, critiques and rater IDs." }
      ]
    },
    {
      slug: "expert-panels", nav: "Expert panels", index: "03",
      title: "Calibrated expert panels for creative AI training",
      description: "Managed, calibrated panels of senior editors, colorists, sound designers and motion designers for your own tasks, or under a data vendor's contract.",
      summary: "A managed, calibrated panel of senior editors, colorists, sound designers, motion designers and voice talent. The panel writes tasks, cuts reference answers and grades agent output for our own environments, and can be engaged directly for your programs. The product is calibration and seniority, not headcount.",
      media: { kind: "agreement", cap1: "Calibration · round 3 · five dimensions", cap2: "threshold α 0.80" },
      buyers: [
        { name: "Labs with their own tasks", note: "Teams who need senior graders and reference answers, not another task vendor." },
        { name: "Data vendors", note: "Vendors staffing a creative domain under a lab contract." },
        { name: "Tool makers", note: "Teams who need editors to produce reference work inside their software." }
      ],
      packages: [
        { name: "Project panel", included: "A small panel with a lead and a calibration session, scoped to one program", time: "Per project" },
        { name: "Managed team", included: "A standing team with a lead, weekly agreement checks and QA", time: "Ongoing" },
        { name: "Placement", included: "A long-term role on your team, sourced and vetted", time: "Per hire" }
      ],
      steps: [
        { name: "Scope", note: "Crafts, headcount, tools, weekly volume and the agreement threshold you need, agreed in writing." },
        { name: "Select", note: "Portfolio review by a working editor, then a paid test task for every candidate." },
        { name: "Calibrate", note: "A shared reference set scored blind until agreement clears the threshold." },
        { name: "Deliver", note: "One lead owns quality, scheduling and questions, so your team has a single contact." },
        { name: "Monitor", note: "Weekly agreement checks catch drift early, and the panel recalibrates before it reaches your data." }
      ],
      stepVisuals: ["epScope", "epSelect", "calibrate", "epDeliver", "epMonitor"],
      task: {},
      sections: [
        { label: "Roles", kind: "roster", heading: "Senior only.", body: "Every panelist passes a portfolio review and a paid test task in their own craft before calibration.", items: [
          { name: "Senior video editor", years: "8+ years", bar: "Broadcast, documentary or brand credits. DaVinci Resolve or an open NLE.", test: "Cut a 60-second brand spot from 40 minutes of selects, with a narrated account of the key decisions.", grades: "Structure, pace, continuity", tools: "Resolve, OTIO, Shotcut" },
          { name: "Documentary and interview editor", years: "6+ years", bar: "Transcript-driven long-form work, with paper edits as a daily practice.", test: "Paper-edit a 90-second story from two interview transcripts, every quote verbatim.", grades: "Story, quote selection, attribution", tools: "Resolve, transcript tools" },
          { name: "Colorist", years: "6+ years", bar: "Resolve colour, multi-camera matching, fluent with scopes.", test: "Match a two-camera interview and grade a three-shot sequence to a reference still.", grades: "Skin tone, white balance, shot continuity", tools: "Resolve colour page, scopes" },
          { name: "Sound designer and mixer", years: "6+ years", bar: "Dialogue clean-up and loudness delivery. Foley a plus.", test: "Clean dialogue, lay room tone and mix a two-minute scene to −23 LUFS.", grades: "Sync, room tone, Foley, loudness", tools: "Fairlight, Ardour, Audacity" },
          { name: "Motion designer", years: "5+ years", bar: "Titles, lower thirds and animated graphics in Fusion or an open tool.", test: "Build lower thirds and a title sequence to a supplied style frame.", grades: "Typography, timing, legibility", tools: "Fusion, Blender, Krita" }
        ]},
        { label: "Calibration", kind: "calib", heading: "How graders come to agree.", body: "Each panelist scores the same reference set blind. We measure agreement, discuss the disagreements, tighten the rubric and score again. The threshold is agreed with you and reported throughout the engagement.", items: [
          { name: "Score blind", note: "Every panelist scores the same reference set without seeing the others." },
          { name: "Measure", note: "Agreement per dimension, with the widest disagreements pulled out." },
          { name: "Discuss", note: "The lead runs a session on each disagreement, with the clip on screen." },
          { name: "Tighten", note: "The rubric gains an anchor or example, and the set is scored again." }
        ],
          log: { ref: "ref-017 · Pace", round: "Round 2 → 3", before: [["R-03", 2], ["R-07", 4], ["R-11", 3]], reason: "R-07 read the four-second hold as deliberate. R-03 read it as dead air.", change: "Pace 4 requires every hold over two seconds to be motivated by the next line or a visual beat.", after: [["R-03", 3], ["R-07", 3], ["R-11", 3]], alpha: "α 0.71 → 0.84" }
        }
      ],
      faq: [
        { q: "Why not hire editors directly?", a: "You can. What we add is selection, calibration and a lead who owns quality, so judgments are consistent from the first batch." },
        { q: "Can panelists work in our tools?", a: "Yes, where the tool's license permits AI-training use." }
      ]
    },
    {
      slug: "custom-video-production", nav: "Custom video production", index: "04",
      title: "Custom footage for AI training",
      description: "Footage planned, shot and labelled to specification, with every participant consented and every asset cleared for AI training.",
      summary: "Footage planned, shot and labelled to your specification, with every participant consented and every asset cleared for AI training. Staged scenario packs for security and safety models, first-person work capture for robotics, and made-to-specification material for video generation. Every stream is on one timecode clock, with labels and a rights pack that survives legal review.",
      media: { kind: "multicam", cap1: "Four synchronised feeds · one timecode clock", cap2: "scenario 07 · night" },
      buyers: [
        { name: "Robotics labs and data brokers", note: "Teams who need first-person work capture from real sites, with releases." },
        { name: "Security and safety AI", note: "Vendors who need staged events from realistic camera positions, day and night." },
        { name: "Video-generation companies", note: "Teams who need specific motions and multi-angle synchronised takes with clean metadata." },
        { name: "Sites with footage to license", note: "Factories, warehouses, stores and venues that want to license their camera footage or host capture, with releases, masking and labelling handled for them." }
      ],
      packages: [
        { name: "Scenario pack", included: "5–10 staged scenarios, 2–4 angles, day and night, labelled, with consenting performers", time: "Per shoot" },
        { name: "First-person work capture", included: "100–200 accepted hours of synchronised head and wrist camera, narrated on request", time: "Per site" },
        { name: "Made-to-specification footage", included: "Specific motions, camera moves and multi-angle synchronised takes", time: "Per project" }
      ],
      steps: [
        { name: "Specify", note: "Resolution, frame rate, field of view, camera positions, events and labels, agreed in writing before anyone is booked." },
        { name: "Clear", note: "Site permission and a release from everyone filmed covering AI training, transfer, retention and deletion." },
        { name: "Shoot", note: "Every camera on one timecode clock, with per-camera calibration data recorded on the day." },
        { name: "Label", note: "Event start and end, actions, objects and camera IDs, labelled by one person and checked by a second." },
        { name: "Deliver", note: "Footage, labels, calibration and the rights pack, in one folder per scenario." }
      ],
      stepVisuals: ["cvSpec", "cvClear", "cvShoot", "cvLabel", "cvDeliver"],
      task: {},
      sections: [
        { label: "Formats", kind: "tabs", heading: "Four ways we capture.", body: "Each format ships to the same deliverable standard: synchronised streams, exact labels and a rights pack.", items: [
          { name: "Staged scenario packs", note: "Falls, intrusions, theft, unattended items and crowd surges from realistic camera positions, with exact labels.", vis: "cvStaged", cap: "Staged scenario · unattended bag · high-angle camera" },
          { name: "On real camera systems", note: "After-hours shoots at partner stores and venues, recorded on their own installed cameras.", vis: "cvInstalled", cap: "Installed ceiling camera · partner store · after hours" },
          { name: "First-person work capture", note: "Head and wrist cameras, synchronised and narrated. Factories and warehouses first.", vis: "cvFirstPerson", cap: "Head and wrist cameras · one clock · narrated" },
          { name: "Made to specification", note: "Specific motions, camera moves and multi-angle takes for video-generation training.", vis: "cvMade", cap: "Camera plan · four angles · one dolly move" }
        ]},
        { label: "Deliverable standard", kind: "manifest", heading: "What every delivery includes.", body: "", items: [
          { name: "Video", note: "Resolution, frame rate and field of view to specification, with per-camera calibration.", value: "1920×1080 · 30 fps · 90° FOV · ProRes 422 HQ" },
          { name: "Sync", note: "Every stream on one clock, by timecode.", value: "4 streams · LTC · drift under 1 frame an hour" },
          { name: "Labels", note: "Event boundaries, actions, objects, camera IDs. Narration where requested.", value: "events.json · 212 events · two-pass review" },
          { name: "Rights pack", note: "Releases, site permission, a provenance log, and face or screen masking on request.", value: "6 releases · site permission · provenance log" }
        ], scenario: "scenario-07", sample: [
          '{',
          '  "event": "bag_left_unattended",',
          '  "start": "21:14:07:12",',
          '  "end":   "21:16:47:03",',
          '  "cameras": ["A", "B", "D"],',
          '  "actors": ["P-03"],',
          '  "objects": [',
          '    { "id": "bag-1", "class": "backpack" }',
          '  ],',
          '  "light": "night",',
          '  "review": {',
          '    "pass1": "L-04",',
          '    "pass2": "L-09"',
          '  }',
          '}'
        ]}
      ],
      faq: [
        { q: "Why not scraped or archive footage?", a: "Scraped camera footage is unusable for commercial training, retailers do not license theirs, and archive material rarely has the angles, labels or releases that training requires." },
        { q: "Who owns the footage?", a: "Non-exclusive by default, so we can license the library again. Exclusive capture is available on request." },
        { q: "Which privacy regimes do the releases cover?", a: "Releases are drafted against BIPA, California privacy law, UK and EU GDPR, and Brazilian and Mexican data law for Latin American sites." }
      ]
    }
  ],

  research: {
    title: "Research — Can AI edit video?",
    description: "What published benchmarks show about agentic video editing, where agents fail, and the baseline Light Theory Labs is running on 20 professional tasks.",
    h1: "Can AI edit video? What the evidence shows so far.",
    lede: "A reading of the published benchmarks on agentic video editing, where the agents fail, and the program we are running to extend them. Our own baseline on 20 professional post-production tasks publishes in November 2026.",
    status: "Baseline in progress",
    benchmarks: [
      { name: "Timeline-Bench", who: "Gupta, Arora & Tankala, Sep 2026", measures: "Agents turn raw production material into a finished cut. A task is resolved when the output passes every delivery, content and quality test; the quality test is calibrated on 2,582 blind judgments by 43 editors.", scale: "56 tasks · 16 agents · 896 runs", result: "Best agent 26.8%; average 14.0%. Editors preferred the reference cut in 83.5% of judgments.", cite: "timeline" },
      { name: "CutVerse", who: "Hu et al., May 2026", measures: "GUI agents complete long-horizon tasks inside seven professional applications, scored on milestones and task completion.", scale: "186 tasks · 7 applications", result: "36.0% average task success across evaluated agents.", cite: "cutverse" },
      { name: "AgenticVBench", who: "Cao et al., 2026", measures: "Agents complete post-production tasks from source video and a brief, scored by programmatic verifiers and expert rubric grading.", scale: "1,069 binary rubric items for repurposing tasks", result: "Three-editor human baseline on a subset; agent results reported per task type.", cite: "agenticv" }
    ],
    failures: {
      label: "Where agents fail", h2: "The failures are about craft, not compliance.",
      body: "Timeline-Bench's analysis is the most detailed published account of how editing agents break down. Four patterns matter for anyone training them.",
      cards: [
        { name: "Quality, not correctness", note: "562 of 771 unresolved runs passed every delivery and content test and failed only the quality test.", cite: "timeline" },
        { name: "Perception through stills and transcripts", note: "Agents inspected footage as frames and text, and checked renders for technical defects rather than pacing or story.", cite: "timeline" },
        { name: "Pace", note: "Agents cut at 0.72× the reference pace. Each halving of cut rate below the reference cost 6.6 points of win-or-tie; cutting faster was not penalised.", cite: "timeline" },
        { name: "Overconfidence", note: "Agents claimed success in 93% of runs, including 95.5% of the edits that failed a test. Self-report is not a signal.", cite: "timeline" }
      ]
    },
    market: {
      label: "Why it matters for training", h2: "The spend is moving to environments. Creative craft is not yet in them.",
      body: [
        "In September 2025, The Information reported that Anthropic had discussed spending more than $1 billion on RL environments over the following year. Epoch AI's interviews across environment vendors and labs put contract sizes at six to seven figures per quarter and expert-authored tasks at roughly $200 to $2,000 each.",
        "That spend has concentrated where rewards are easy to verify: code, UI navigation, structured enterprise workflows. The published editing benchmarks show that the binding constraint in creative software is a reward that tracks craft, which requires calibrated professional judgment in the loop. That is the gap this lab exists to fill."
      ],
      cites: ["techcrunch", "epoch"]
    },
    program: {
      label: "Our program", h2: "Three studies, published as they complete.",
      items: [
        { name: "Baseline", note: "Three frontier agents on 20 professional post-production tasks, five attempts each, graded by automatic checks and a calibrated panel. Results as an HTML table with model versions and run dates.", when: "November 2026", status: "running", statusLabel: "in progress" },
        { name: "Agreement study", note: "500 professional judgments of AI-generated video across cinematography, colour, sound and edit, with inter-rater agreement reported per dimension.", when: "Q4 2026", status: "queued", statusLabel: "queued" },
        { name: "Leaderboard", note: "The baseline re-run within two weeks of each major model release, with a visible last-updated date.", when: "Ongoing", status: "queued", statusLabel: "queued" }
      ]
    }
  },

  articles: [
    {
      slug: "what-is-an-rl-environment-for-creative-software",
      title: "What is an RL environment for creative software?",
      description: "An RL environment for creative software is a reproducible task with a brief, source material, a starting state and a grader. For video editing, the grader is the hard part.",
      updated: "2026-10-05", author: "Light Theory Labs", readTime: "6 min",
      summary: "An RL environment for creative software is a reproducible task an agent can attempt repeatedly: a brief, source material, a starting project and a grader that returns a reward. For video editing, the difficult component is the grader, because most of what distinguishes a good cut from a compliant one cannot be verified by a script.",
      sections: [
        { h2: "What does an editing environment contain?", paras: [
          "Five components. A brief written the way a client writes one. Source footage the environment owner has the right to use for training. A starting state, such as a DaVinci Resolve project or an open timeline file, that restores identically on every attempt. A reference cut made by a senior editor. And a grader that returns a score.",
          "The reference cut is what separates an environment from a benchmark. A benchmark tells you how far an agent is from good work. A reference cut, with the editor's narrated account of the decisions, gives the training process something to point at."
        ]},
        { h2: "How is a creative task graded?", paras: [
          "In two layers. Automatic checks catch what can be measured: every quote in a paper edit matches the transcript, runtime is within the brief, loudness meets the delivery specification, required shots are present. A craft rubric, scored blind by a calibrated panel of editors, catches the rest: structure, pacing, continuity, whether a cut lands on the beat.",
          "The second layer is not optional. On Timeline-Bench, 562 of 771 unresolved runs passed every delivery and content test and failed only the human-calibrated quality test. A grader without the craft layer would have rewarded 73% of those failures."
        ]},
        { h2: "Why do most programs start with paper edits?", paras: [
          "A paper edit turns an interview transcript into a speaker-attributed soundbite script. It is mostly text, so it fits existing pipelines, and the grader can be exact: each quote, speaker and timecode is verifiable. It is also where real editing starts, so the skill transfers to assembly."
        ]},
        { h2: "How hard should the tasks be?", paras: [
          "Hard enough that top agents fail at least 70% of the time across five attempts, and routine enough that a competent editor finds them unremarkable. Published results suggest this range is wide open: the best agent on Timeline-Bench resolved 26.8% of tasks, and on CutVerse GUI agents averaged 36.0% task success across seven professional applications."
        ]}
      ],
      faq: [
        { q: "Which software can environments be built on?", a: "Tools whose licenses permit AI-training use: DaVinci Resolve, open timeline formats (OTIO, EDL, FCPXML) and open-source tools such as Shotcut, Ardour and Blender." },
        { q: "How is an environment different from preference data?", a: "Preference data records which of two outputs is better. An environment lets the agent act, receive a score and try again, and ships with a reference answer to learn from." }
      ],
      cites: ["timeline", "cutverse"]
    },
    {
      slug: "how-professional-editors-judge-ai-generated-video",
      title: "How professional editors judge AI-generated video",
      description: "Working editors, colorists and sound designers score AI-generated video on cinematography, colour, sound and edit, with critiques cited to timecode and published agreement data.",
      updated: "2026-10-05", author: "Light Theory Labs", readTime: "5 min",
      summary: "Working editors, colorists and sound designers judge AI-generated video on four dimensions: cinematography, colour, sound and edit. Each is scored 0–5 against fixed criteria, every low score carries a written reason cited to timecode, and graders are calibrated against each other before scoring so that the agreement data can be published with the results.",
      sections: [
        { h2: "What do the four dimensions cover?", paras: [
          "Cinematography covers framing, lens behaviour, camera motion and exposure consistency. Colour covers skin tones, white-balance drift and continuity across shots. Sound covers sync, room tone, Foley plausibility and loudness. Edit covers cut points, pacing, continuity and whether transitions are motivated."
        ]},
        { h2: "Why calibrate graders before scoring?", paras: [
          "Two senior editors can disagree about a cut and both be defensible, but an evaluation dataset needs scores that mean the same thing from every grader. So the panel scores a shared reference set blind, we measure agreement, discuss the disagreements, tighten the rubric and score again until agreement clears the threshold agreed with the buyer.",
          "Timeline-Bench took a related approach, calibrating its quality test on 2,582 blind judgments by 43 editors. A rubric without agreement data is an opinion; with it, it is a measurement."
        ]},
        { h2: "What does a written critique add?", paras: [
          "A score says a clip is a 2 on sound. A critique says the room tone drops out at 00:00:04:12 and the footsteps are a frame late from 00:00:07:00. The second is what a model team can act on, and it is what makes the judgment auditable later."
        ]}
      ],
      faq: [
        { q: "How many judgments are in an Evaluation Pack?", a: "500 calibrated judgments with the rubric, per-judgment critiques and an agreement report, delivered in two weeks." },
        { q: "Do graders know which model produced each clip?", a: "No. Pairwise preferences and rubric scores are made with model identity hidden." }
      ],
      cites: ["timeline"]
    },
    {
      slug: "how-much-do-rl-environments-cost",
      title: "How much do RL environments cost?",
      description: "Published ranges put expert-authored RL tasks at roughly $200–2,000 each and contracts at six to seven figures per quarter.",
      updated: "2026-10-05", author: "Light Theory Labs", readTime: "4 min",
      summary: "RL environments for professional work are priced per task. Interviews published by Epoch AI put expert-authored tasks at roughly $200 to $2,000 each, with rare complex tasks reaching $20,000, and contract sizes at six to seven figures per quarter.",
      sections: [
        { h2: "What drives the price of a task?", paras: [
          "Expert hours. A video-editing task takes roughly four to eight senior-editor hours to brief, cut the reference answer and narrate it, plus engineering time for the grader. Tasks with fully automatic graders, such as paper edits, sit at the low end of the range. Tasks that need a calibrated craft rubric sit higher, because the panel's time is part of the product."
        ]},
        { h2: "What do exclusivity and resale change?", paras: [
          "Most environments are sold non-exclusively, so the vendor can resell them and the price stays low. Time-limited exclusivity, typically twelve months, is priced at a multiple of the non-exclusive rate, after which the tasks return to the resellable library."
        ]},
        { h2: "How large is the market?", paras: [
          "In September 2025, The Information reported that Anthropic had discussed spending more than $1 billion on RL environments over the following year. Epoch AI's interviewees described deals from $300,000 to well over $1 million per quarter, varying with task volume, customisation and exclusivity. Almost none of that spend has yet reached creative software."
        ]},
        { h2: "What does a pilot look like?", paras: [
          "A scoped pack rather than an open-ended engagement. Ours is 20 post-production tasks with reference cuts, automatic graders, an editor rubric and a baseline report on three frontier agents, delivered in three to four weeks. Each pack is scoped and quoted after a 30-minute call."
        ]}
      ],
      faq: [
        { q: "Is pricing per task or per hour?", a: "Per task for environments. Expert panels working on a buyer's own tasks are billed per hour." },
        { q: "Do you publish a price list?", a: "No. Volume, customisation and exclusivity vary enough that every engagement is quoted after a call." }
      ],
      cites: ["epoch", "techcrunch"]
    }
  ],

  experts: {
    title: "For experts — Get paid to teach AI how to edit",
    description: "Light Theory Labs hires senior editors, colorists, sound designers and motion designers to write editing tasks, cut reference answers and grade agent output. $60–125 an hour, remote.",
    h1a: "Get paid to teach AI how to ", h1accent: "edit", h1b: ".",
    pay: "$60–125 an hour · remote · flexible",
    lede: "We engage senior editors, colorists, sound designers and motion designers to write real editing tasks, cut the reference answers and grade what AI agents produce. Your reel is reviewed by a working editor, not an AI interviewer, and the pay is stated up front.",
    roles: [
      { name: "Senior video editor", bar: "Eight or more years. Broadcast, documentary or brand credits. DaVinci Resolve or an open NLE.", work: "Write briefs, cut reference answers, narrate decisions, grade agent attempts." },
      { name: "Documentary and interview editor", bar: "Transcript-driven long-form work. Paper edits as a daily practice.", work: "Build paper-edit and assembly tasks with speaker-attributed reference scripts." },
      { name: "Colorist", bar: "Resolve colour. Multi-camera matching. Fluent with scopes.", work: "Build colour-matching tasks and judge colour in AI-generated video." },
      { name: "Sound designer and mixer", bar: "Dialogue clean-up and loudness delivery. Foley a plus.", work: "Build finishing tasks and judge sound in AI-generated video." },
      { name: "Motion designer", bar: "Titles, lower thirds and animated graphics in Fusion or an open tool.", work: "Build graphics tasks and reference answers." }
    ],
    work: {
      h2: "Write the task. Cut the answer. Grade the attempt.",
      body: "You write briefs the way a client would send them, cut the reference answer and narrate your decisions, then score agent attempts blind against a rubric you helped calibrate. Everything runs in Resolve or open-source tools.",
      example: { id: "paper-edit-03", hours: "~5 editor-hours", brief: "Three interviews, 42 minutes of transcript. Cut a 90-second soundbite script for a founder-story piece. Every quote verbatim, speaker-attributed, with timecode.", deliver: "The reference script, a three-minute narration of why those quotes in that order, and your blind scores on three agent attempts.", checks: "quotes_verbatim · speaker_match · runtime ≤ 01:30 · story_structure (panel)" }
    },
    process: [
      { name: "Apply", note: "A short note and a link to your work. We reply within one business day." },
      { name: "Review and paid test task", note: "A working editor reviews your reel. Then one real task, paid at your rate." },
      { name: "Calibration", note: "Score a shared set with the panel, compare, and tighten the rubric together." },
      { name: "Projects", note: "Scoped batches of tasks or grading, remote, on your schedule." }
    ],
    terms: [
      { name: "Pay", note: "$60–125 an hour by role and seniority, invoiced per batch, paid within 14 days." },
      { name: "Remote and flexible", note: "Your own suite, your own hours, in scoped batches with a deadline." },
      { name: "IP and the AI-training license", note: "You assign the tasks, reference answers and narration you make for us, licensed for AI training. Your reel and client work are untouched." },
      { name: "Credit", note: "Named on the panel and in publications if you wish. Anonymous if you do not." }
    ],
    faq: [
      { q: "Is this training AI to replace editors?", a: "It is training AI to perform editing tasks, and we will not pretend otherwise. The agents are being built regardless; the open question is whether the people who hold the craft set the standard they are trained against. Our tasks are graded by senior editors, our rubrics encode what good work is, and the panel is paid properly for that judgment. If that trade is not right for you, we understand." },
      { q: "How many hours a week?", a: "Batches are typically 5–20 hours over one to two weeks. You take the batches you want." },
      { q: "Which software do I need?", a: "DaVinci Resolve, or an open-source tool for your craft (Shotcut, Ardour, Blender). We do not use tools whose terms prohibit AI-training use." },
      { q: "Who reviews my application?", a: "A working editor on the panel lead team." }
    ]
  },

  partners: {
    title: "Partners — Programs, channels and supply for video AI training",
    description: "Partner with Light Theory Labs: co-developed benchmarks with labs, white-label subcontracting for data vendors, licensing, tool-maker programs, research collaboration and footage sites.",
    h1: "Partner with Light Theory Labs.",
    lede: "Programs, channels and supply for video AI training. To buy a package, see Solutions. This page is for relationships that last longer than one purchase.",
    types: [
      { id: "labs", name: "Frontier labs and AI companies", short: "Co-developed benchmarks, standing task and evaluation programs, private held-out sets, research collaboration.", model: "Multi-quarter program, exclusivity windows, co-authored publications.", proof: "The best published agent resolves 26.8% of real editing tasks; the open benchmark is ours to extend together.", full: true,
        body: "For post-training, evaluation and video teams who want more than a package: a standing program that re-runs on each model release, private held-out sets that never enter the resellable library, and co-authored benchmarks. We bring the panel, the footage rights and the production capacity; you bring the models and the research questions." },
      { id: "vendors", name: "Data vendors and platforms", short: "Creative-domain RL tasks, generative video evaluation and preference data, calibrated panels and custom footage, delivered under your contracts.", model: "White-label subcontract · panel as a service · co-delivery.", proof: "A senior, calibrated panel with a named lead, delivered under your brand if you prefer.", full: true,
        body: "You hold the lab contract and need a creative domain you cannot staff from a general pool. We supply video-editing environments, professional evaluation, managed senior panels and rights-cleared footage under your agreement, white-labelled or co-delivered. One rule, stated plainly: we never approach a vendor's client about work that vendor introduced. NDA and non-circumvention are signed first." },
      { id: "providers", name: "Data providers and licensing marketplaces", short: "License our owned footage and finished datasets through your catalogue; capture to specification for your buyers.", model: "Revenue share or per-minute licensing, non-exclusive.", full: false },
      { id: "toolmakers", name: "Creative-tool makers", short: "Environments and evaluations built on your tools; benchmark partnerships; co-marketing.", model: "Joint program or sponsored benchmark.", full: false },
      { id: "research", name: "Research groups", short: "Co-authored benchmarks; access to expert graders and held-out tasks.", model: "Research collaboration and co-publication.", full: false },
      { id: "sites", name: "Footage and site partners", short: "Host after-hours scenario shoots and first-person capture; supply rights-cleared footage.", model: "Site fee or revenue share, with releases and site confidentiality.", full: false }
    ],
    standards: [
      { name: "Rights and consent", note: "Contributors assign IP under an AI-training license. Everyone filmed signs a release. No client footage, ever." },
      { name: "Provenance log", note: "A log linking every asset to its consent, agreement and license, delivered with the data." },
      { name: "NDA and non-circumvention", note: "Signed before names are shared. We never approach a partner's client about work that partner introduced." }
    ]
  },

  contact: {
    title: "Request a demo — Light Theory Labs",
    description: "Request a call or live demo with Light Theory Labs. We reply within one business day.",
    h1: "Request a call or demo.",
    lede: "Thirty minutes with the people who build the tasks. We walk through a live task, its grader and a baseline run, then talk through what you're training or evaluating.",
    steps: [
      "Tell us what you're training or evaluating",
      "A 30-minute call or live demo, usually within the week",
      "A written proposal within 48 hours of the call"
    ],
    interests: ["RL environments", "Generative video feedback", "Expert panels", "Custom video production", "Not sure yet"],
    roles: ["AI lab", "Data vendor", "Studio, brand or agency", "Investor or press", "Other"]
  }
};
