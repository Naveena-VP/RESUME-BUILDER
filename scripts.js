// ---------- Small helpers ----------
const $ = (id) => document.getElementById(id);
const escapeHTML = (str = "") =>
  str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
 
// ---------- Header / summary / skills: simple live binding ----------
function bindSimpleField(inputId, outputId, fallback) {
  const input = $(inputId);
  const output = $(outputId);
  input.addEventListener("input", () => {
    output.textContent = input.value.trim() || fallback;
  });
}
 
bindSimpleField("in-name", "out-name", "Your Name");
bindSimpleField("in-role", "out-role", "Role you're applying for");
bindSimpleField("in-summary", "out-summary", "Your two-line pitch will appear here as you type.");
 
function updateContactLine() {
  const parts = [$("in-email").value, $("in-phone").value, $("in-location").value]
    .map((v) => v.trim())
    .filter(Boolean);
  $("out-contact").textContent = parts.length ? parts.join("  ·  ") : "email · phone · city";
}
["in-email", "in-phone", "in-location"].forEach((id) =>
  $(id).addEventListener("input", updateContactLine)
);
 
function updateSkills() {
  const raw = $("in-skills").value;
  const skills = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const out = $("out-skills");
  out.innerHTML = skills.length
    ? skills.map((s) => `<li>${escapeHTML(s)}</li>`).join("")
    : `<li class="paper__empty" style="border:none;padding:0;">Add a few skills, comma-separated</li>`;
}
$("in-skills").addEventListener("input", updateSkills);
 
// ---------- Repeatable sections: Experience & Education ----------
function setupRepeatSection(config) {
  const {
    addBtnId, listId, templateId, outId,
    fields, // array of { className, key }
    emptyText, render
  } = config;
 
  const list = $(listId);
  const template = $(templateId);
 
  function renderOutput() {
    const rows = Array.from(list.children).map((row) => {
      const data = {};
      fields.forEach(({ className, key }) => {
        data[key] = row.querySelector("." + className).value.trim();
      });
      return data;
    }).filter((d) => Object.values(d).some(Boolean));
 
    $(outId).innerHTML = rows.length
      ? rows.map(render).join("")
      : `<p class="paper__empty">${emptyText}</p>`;
  }
 
  function addRow() {
    const node = template.content.cloneNode(true);
    const row = node.querySelector(".repeat-item");
    list.appendChild(node);
    row.addEventListener("input", renderOutput);
    row.querySelector(".repeat-item__remove").addEventListener("click", () => {
      row.remove();
      renderOutput();
    });
  }
 
  $(addBtnId).addEventListener("click", addRow);
 
  return { addRow, renderOutput };
}
 
const exp = setupRepeatSection({
  addBtnId: "addExp",
  listId: "expList",
  templateId: "expRowTemplate",
  outId: "out-exp",
  fields: [
    { className: "exp-title", key: "title" },
    { className: "exp-company", key: "company" },
    { className: "exp-dates", key: "dates" },
    { className: "exp-desc", key: "desc" }
  ],
  emptyText: "Add a role to show your experience here.",
  render: (d) => `
    <div class="exp-row">
      <div class="exp-row__top">
        <span class="exp-row__title">${escapeHTML(d.title || "Job title")}</span>
        <span class="exp-row__dates">${escapeHTML(d.dates || "")}</span>
      </div>
      <p class="exp-row__company">${escapeHTML(d.company || "")}</p>
      ${d.desc ? `<p class="exp-row__desc">${escapeHTML(d.desc)}</p>` : ""}
    </div>`
});
 
const edu = setupRepeatSection({
  addBtnId: "addEdu",
  listId: "eduList",
  templateId: "eduRowTemplate",
  outId: "out-edu",
  fields: [
    { className: "edu-degree", key: "degree" },
    { className: "edu-school", key: "school" },
    { className: "edu-years", key: "years" }
  ],
  emptyText: "Add a school to show your education here.",
  render: (d) => `
    <div class="edu-row">
      <div class="edu-row__top">
        <span class="edu-row__degree">${escapeHTML(d.degree || "Degree")}</span>
        <span class="edu-row__years">${escapeHTML(d.years || "")}</span>
      </div>
      <p class="edu-row__school">${escapeHTML(d.school || "")}</p>
    </div>`
});
 
// Start each section with one empty row so the form isn't blank
exp.addRow();
edu.addRow();
updateSkills();
 
// ---------- Save as PDF ----------
// Uses the browser's built-in print dialog. The print CSS in style.css
// hides the form and prints only the resume paper.
$("printBtn").addEventListener("click", () => window.print());
 