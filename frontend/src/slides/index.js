import * as Intro from "./Intro";
import * as Vocab from "./Vocabulary";
import * as Convo from "./Conversation";
import * as Pron from "./Pronunciation";
import * as Practice from "./Practice";
import * as Comp from "./Comprehension";
import * as Role from "./Roleplay";
import * as Close from "./Closing";

export const SLIDES = [
  { id: 1, title: "Title", section: "opening", C: Intro.Slide01 },
  { id: 2, title: "Lesson Outcomes", section: "opening", C: Intro.Slide02 },
  { id: 3, title: "Picture Observation", section: "observation", C: Intro.Slide03 },
  { id: 4, title: "Picture Speaking Challenge", section: "observation", C: Intro.Slide04 },
  { id: 5, title: "Prediction", section: "observation", C: Intro.Slide05 },
  { id: 6, title: "Warm-up Discussion", section: "observation", C: Intro.Slide06 },
  { id: 7, title: "Vocabulary Wall", section: "vocabulary", C: Vocab.Slide07 },
  { id: 8, title: "Vocabulary Guess Mode", section: "vocabulary", C: Vocab.Slide08 },
  { id: 9, title: "Vocabulary Practice Grid", section: "vocabulary", C: Vocab.Slide09 },
  { id: 10, title: "Conversation Setup", section: "conversation", C: Convo.Slide10 },
  { id: 11, title: "Conversation · Part 1", section: "conversation", C: Convo.Slide11 },
  { id: 12, title: "Conversation · Part 2", section: "conversation", C: Convo.Slide12 },
  { id: 13, title: "Performance Mode", section: "conversation", C: Convo.Slide13 },
  { id: 14, title: "Negotiation Strategy", section: "conversation", C: Convo.Slide14 },
  { id: 15, title: "Word Stress", section: "pronunciation", C: Pron.Slide15 },
  { id: 16, title: "Sound Focus", section: "pronunciation", C: Pron.Slide16 },
  { id: 17, title: "Linking Sounds", section: "pronunciation", C: Pron.Slide17 },
  { id: 18, title: "Rhythm Practice", section: "pronunciation", C: Pron.Slide18 },
  { id: 19, title: "Intonation Types", section: "pronunciation", C: Pron.Slide19 },
  { id: 20, title: "Intonation Practice", section: "practice", C: Practice.Slide20 },
  { id: 21, title: "Shadowing Practice", section: "practice", C: Practice.Slide21 },
  { id: 22, title: "Listening Challenge", section: "practice", C: Practice.Slide22 },
  { id: 23, title: "Minimal Pairs", section: "practice", C: Practice.Slide23 },
  { id: 24, title: "Reading Practice", section: "practice", C: Practice.Slide24 },
  { id: 25, title: "Comprehension Questions", section: "comprehension", C: Comp.Slide25 },
  { id: 26, title: "Reflection", section: "comprehension", C: Comp.Slide26 },
  { id: 27, title: "Controlled Speaking", section: "comprehension", C: Comp.Slide27 },
  { id: 28, title: "Role Play Menu", section: "roleplay", C: Role.Slide28 },
  { id: 29, title: "Role Play Scenario", section: "roleplay", C: Role.Slide29 },
  { id: 30, title: "Role Play Language", section: "roleplay", C: Role.Slide30 },
  { id: 31, title: "Spontaneous Speaking", section: "roleplay", C: Role.Slide31 },
  { id: 32, title: "Fluency Upgrade", section: "roleplay", C: Role.Slide32 },
  { id: 33, title: "Homework", section: "closing", C: Close.Slide33 },
  { id: 34, title: "Closing", section: "closing", C: Close.Slide34 },
];
