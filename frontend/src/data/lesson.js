// Central lesson data — all content for the 34 screens.

export const SECTIONS = [
  { id: "opening", label: "Opening", range: [1, 2] },
  { id: "observation", label: "Observation & Warm-up", range: [3, 6] },
  { id: "vocabulary", label: "Vocabulary", range: [7, 9] },
  { id: "conversation", label: "Conversation", range: [10, 14] },
  { id: "pronunciation", label: "Pronunciation", range: [15, 19] },
  { id: "practice", label: "Practice & Listening", range: [20, 24] },
  { id: "comprehension", label: "Comprehension & Reflection", range: [25, 27] },
  { id: "roleplay", label: "Role Play", range: [28, 32] },
  { id: "closing", label: "Homework & Closing", range: [33, 34] },
];

export const IMAGE_URL =
  "https://static.prod-images.emergentagent.com/jobs/f59c153e-b4b1-4f32-a4c2-ae30d3b13e32/images/db4ce56fc8dbcc2d378ed6b03de73f456d54b5ddd0beb10ca10bef2ff4a1f36c.png";

export const VOCAB = [
  {
    word: "negotiate",
    ipa: "/nəˈɡoʊʃiˌeɪt/",
    pos: "verb",
    meaning: "Discuss formally to reach agreement",
    collocations: ["negotiate a deal", "negotiate with someone"],
  },
  {
    word: "upfront",
    ipa: "/ˌʌpˈfrʌnt/",
    pos: "adj/adv",
    meaning: "Honest / direct about intentions",
    collocations: ["be upfront about", "upfront cost"],
  },
  {
    word: "budget",
    ipa: "/ˈbʌdʒɪt/",
    pos: "noun",
    meaning: "Amount of money available",
    collocations: ["stay within budget", "tight budget"],
  },
  {
    word: "compromise",
    ipa: "/ˈkɑːmprəmaɪz/",
    pos: "noun",
    meaning: "Giving up part of what was wanted",
    collocations: ["reach a compromise", "fair compromise"],
  },
  {
    word: "concession",
    ipa: "/kənˈseʃən/",
    pos: "noun",
    meaning: "Something granted to reach agreement",
    collocations: ["make a concession", "offer a concession"],
  },
  {
    word: "leverage",
    ipa: "/ˈlevərɪdʒ/",
    pos: "noun",
    meaning: "Advantage to get what you want",
    collocations: ["gain leverage", "use leverage"],
  },
  {
    word: "commitment",
    ipa: "/kəˈmɪtmənt/",
    pos: "noun",
    meaning: "Promise to do something",
    collocations: ["make a commitment", "long-term commitment"],
  },
  {
    word: "proposal",
    ipa: "/prəˈpoʊzəl/",
    pos: "noun",
    meaning: "Formal suggestion or plan",
    collocations: ["submit a proposal", "written proposal"],
  },
  {
    word: "implementation",
    ipa: "/ˌɪmplɪmɛnˈteɪʃən/",
    pos: "noun",
    meaning: "Putting a plan into action",
    collocations: ["implementation timeline", "begin implementation"],
  },
  {
    word: "partnership",
    ipa: "/ˈpɑːrtnərʃɪp/",
    pos: "noun",
    meaning: "Close working relationship",
    collocations: ["build a partnership", "long-term partnership"],
  },
  {
    word: "flexible",
    ipa: "/ˈflɛksəbəl/",
    pos: "adjective",
    meaning: "Able to change or adapt",
    collocations: ["flexible on", "remain flexible"],
  },
];

// Conversation script split into two parts (Screens 11 & 12).
// Each turn has a role and text. We mark vocab words for highlighting.
const V = (w) => ({ vocab: true, text: w });

export const DIALOGUE_PART_1 = [
  {
    role: "Sarah",
    line: [
      "Thanks for meeting today, David. I know we're here to ",
      V("negotiate"),
      " the final terms of the contract.",
    ],
  },
  {
    role: "David",
    line: [
      "Of course. I'll be ",
      V("upfront"),
      " — the price is a bit above our ",
      V("budget"),
      " this year.",
    ],
  },
  {
    role: "Sarah",
    line: [
      "I appreciate you saying that directly. What if we found a ",
      V("compromise"),
      "? A two-year ",
      V("commitment"),
      " instead of one could bring the annual cost down quite a bit.",
    ],
  },
  {
    role: "David",
    line: [
      "That's interesting, but a two-year ",
      V("commitment"),
      " isn't a small ask. My team would want a ",
      V("concession"),
      " in return before we agree.",
    ],
  },
  {
    role: "Sarah",
    line: [
      "Fair enough. What if I threw in our premium support tier as a ",
      V("concession"),
      " — free for the first year?",
    ],
  },
  {
    role: "David",
    line: [
      "That actually gives me some ",
      V("leverage"),
      " when I talk to finance about the ",
      V("budget"),
      ". I think that could work.",
    ],
  },
];

export const DIALOGUE_PART_2 = [
  {
    role: "Sarah",
    line: [
      "Great. I'll put everything into a written ",
      V("proposal"),
      " so the terms are clear.",
    ],
  },
  {
    role: "David",
    line: [
      "I'd appreciate that. One more thing: ",
      V("implementation"),
      ". Can your team be ready to start the same week we sign?",
    ],
  },
  {
    role: "Sarah",
    line: [
      "Absolutely. I'll make it a top priority, so there's no delay.",
    ],
  },
  {
    role: "David",
    line: [
      "That's reassuring. This feels like the start of a solid ",
      V("partnership"),
      ".",
    ],
  },
  {
    role: "Sarah",
    line: [
      "I feel the same. I'll send the ",
      V("proposal"),
      " by Thursday, and we can lock in the ",
      V("commitment"),
      ".",
    ],
  },
  {
    role: "David",
    line: [
      "To confirm — the ",
      V("proposal"),
      " will include the two-year ",
      V("commitment"),
      ", the free support tier, and the ",
      V("implementation"),
      " timeline?",
    ],
  },
  {
    role: "Sarah",
    line: ["Exactly. You'll have it in black and white by Thursday."],
  },
  {
    role: "David",
    line: [
      "Perfect. I think finance will see this as a fair ",
      V("compromise"),
      ".",
    ],
  },
  {
    role: "Sarah",
    line: [
      "That's the goal. Thanks for being ",
      V("flexible"),
      " on this, David.",
    ],
  },
  {
    role: "David",
    line: [
      "Thank you for being ",
      V("flexible"),
      " too, Sarah. Let's get it signed.",
    ],
  },
];

export const SHADOWING_LINES = [
  "Thanks for meeting today, David.",
  "I'll be upfront — the price is a bit above our budget.",
  "What if we found a compromise?",
  "That gives me some leverage when I talk to finance.",
  "I'll put everything into a written proposal.",
  "Can your team be ready to start the same week we sign?",
  "This feels like the start of a solid partnership.",
  "I'll send the proposal by Thursday.",
  "Nothing verbal, nothing assumed.",
  "Thanks for being flexible on this, David.",
];

export const LISTENING_ITEMS = [
  { text: "I'll be ___ — the price is a bit above our budget.", answer: "upfront" },
  { text: "What if we found a ___?", answer: "compromise" },
  { text: "My team would want a ___ in return.", answer: "concession" },
  { text: "That gives me some ___ when I talk to finance.", answer: "leverage" },
  { text: "I'll put everything into a written ___.", answer: "proposal" },
  { text: "One more thing: ___.", answer: "implementation" },
  { text: "This feels like the start of a solid ___.", answer: "partnership" },
  { text: "Thanks for being ___ on this.", answer: "flexible" },
];

export const MINIMAL_PAIRS = [
  { a: "cost", b: "coast", sentence: "The final cost was lower than the coast-side office rent." },
  { a: "price", b: "prize", sentence: "The price we agreed on felt like a prize for both sides." },
  { a: "deal", b: "dill", sentence: "We closed the deal — nothing to do with dill pickles!" },
  { a: "fund", b: "found", sentence: "We found extra funds in next year's budget." },
  { a: "ship", b: "sheep", sentence: "We'll ship the first order well before the deadline." },
];

export const COMPREHENSION = {
  facts: [
    "What is David's main concern about the price?",
    "What compromise does Sarah propose regarding the contract length?",
    "What concession does Sarah offer in return for a two-year commitment?",
    "What will Sarah put in writing, and why does that matter to David?",
    "What does David want to know about implementation?",
  ],
  reasoning: [
    "Why does David say the free support tier gives him leverage with finance?",
    "Why do you think Sarah calls this the start of a 'partnership,' not just a 'transaction'?",
    "What does this conversation suggest about building trust while negotiating?",
  ],
  evaluation: [
    "Do you think Sarah's concession was a fair trade for a two-year commitment? Why or why not?",
    "Would you have asked for a different concession in David's position? What would you ask for?",
  ],
};

export const ROLEPLAY_SCENARIOS = [
  {
    id: 1,
    title: "Salary Negotiation",
    tagline: "You vs. your manager",
    detail:
      "You are asking your manager for a raise. Your manager has a limited budget this year. Negotiate a number, a timeline, or an alternative benefit.",
    roleA: "Employee — you want a meaningful raise this year.",
    roleB: "Manager — budget is tight; you can offer creative alternatives.",
  },
  {
    id: 2,
    title: "Supplier Deadline",
    tagline: "Project manager vs. supplier",
    detail:
      "You are a project manager. Your supplier says they can't meet your deadline. Negotiate a new timeline or find a compromise — partial delivery, extra resources, or something else.",
    roleA: "Project Manager — deadline is critical for launch.",
    roleB: "Supplier — capacity issues make original date impossible.",
  },
  {
    id: 3,
    title: "Client Discount Request",
    tagline: "Client vs. vendor",
    detail:
      "You are a client asking your vendor for a 20% discount. The vendor can't go that low. Negotiate toward a compromise.",
    roleA: "Client — budget pressure forces a discount request.",
    roleB: "Vendor — margins are thin; look for a middle path.",
  },
];

export const PHRASE_BANK = [
  "I'll be upfront...",
  "What if we...",
  "Could we find a compromise?",
  "We may need a concession.",
  "Let's put that in writing.",
  "That feels fair.",
  "Let's confirm the terms.",
];
