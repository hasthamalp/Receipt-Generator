(() => {
  const form = document.getElementById("letterForm");
  const printBtn = document.getElementById("printBtn");
  const clearBtn = document.getElementById("clearBtn");

  const fields = [...form.querySelectorAll(".field")];
  const storageKey = "capricorn-alappuzha-authorization-v1";

  // Restore entered values locally so accidental refreshes do not lose work.
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    fields.forEach(field => {
      if (typeof saved[field.name] === "string") field.value = saved[field.name];
    });
  } catch (_) {}

  // The native calendar stores YYYY-MM-DD while the printed form uses DD/MM/YYYY.
  // Browsers will provide the calendar picker automatically for type="date".
  fields.forEach(field => {
    field.addEventListener("input", () => {
      const data = Object.fromEntries(fields.map(f => [f.name, f.value]));
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (_) {}
    });
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });

  clearBtn.addEventListener("click", () => {
    if (!confirm("Clear all editable fields?")) return;
    fields.forEach(field => field.value = "");
    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}
    fields[0].focus();
  });
})();
