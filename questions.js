/* ProAgri Client Check-in — source: https://tally.so/r/b5JMq2 */
window.CHECKIN = {
  brand: "ProAgri",
  title: "Client Check-in Survey",
  introLead: "Quick check-in (under 60 seconds)",
  intro:
    "Your feedback on leads, content, and ROI helps us keep delivery tight. One or two sentences is enough.",
  thanks:
    "Thanks — this takes us under a minute and helps us protect your leads, content, and ROI.",
  thanksContact: "If you asked for contact, your account manager will follow up.",
  thanksLow:
    "Thanks — we’ll have your account manager review this within 24 hours.",
  questions: [
    {
      id: "leads",
      type: "stars",
      n: 1,
      required: true,
      text: "How satisfied are you with the volume and quality of leads generated for your business recently?",
    },
    {
      id: "leads_note",
      type: "text",
      n: 2,
      required: true,
      text: "Any quick note on lead quality?",
      placeholder: "Optional — volume, quality, or industry fit",
    },
    {
      id: "content",
      type: "stars",
      n: 3,
      required: true,
      text: "How satisfied are you with the quality, turnaround, and delivery of your recent video/media content?",
    },
    {
      id: "content_note",
      type: "text",
      n: 4,
      required: true,
      text: "Any feedback on upcoming shoots or video topics?",
      placeholder: "Optional — timing, topics, or delivery",
    },
    {
      id: "roi",
      type: "stars",
      n: 5,
      required: true,
      text: "Overall, how well is our platform delivering return on investment (ROI) for your business?",
    },
    {
      id: "value",
      type: "text",
      n: 6,
      required: true,
      text: "What is ONE thing we’ve filmed, posted, or executed recently that genuinely added value or made your work easier?",
      placeholder: "One recent win — a video, post, lead, or process",
    },
    {
      id: "contact",
      type: "choice",
      n: 7,
      required: true,
      text: "Do you need our account team or management to get in touch with you regarding support, upcoming shoots, or your account?",
      options: [
        { value: "no", label: "No, everything is running smoothly!" },
        { value: "yes", label: "Yes, please have my account manager / management contact me." },
      ],
    },
    {
      id: "discuss",
      type: "text",
      n: "",
      required: true,
      hidden: true,
      showWhen: { id: "contact", value: "yes" },
      text: "Briefly mention what you’d like to discuss",
      placeholder: "Support, upcoming shoot, leads, billing, or anything else",
    },
  ],
};

window.CHECKIN.visibleQuestions = function (answers) {
  return CHECKIN.questions.filter((q) => {
    if (!q.showWhen) return true;
    return answers[q.showWhen.id] === q.showWhen.value;
  });
};

window.CHECKIN.thanksCopy = function (answers) {
  const leads = Number(answers.leads || 0);
  const content = Number(answers.content || 0);
  const low = (leads && leads < 3) || (content && content < 3);
  const asked = answers.contact === "yes";
  const parts = [CHECKIN.thanks];
  if (asked) parts.push(CHECKIN.thanksContact);
  if (low) parts.push(CHECKIN.thanksLow);
  return parts.join(" ");
};
