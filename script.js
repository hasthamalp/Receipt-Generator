// Language Dictionary
const translations = {
  en: {
    headerTitle: "District Revenue  IT Cell Alappuzha",
    headerSub: "System / Item Receipt Acknowledgment",
    certTextPrefix: "I hereby acknowledge that the following system/item was received from the Alappuzha District IT Cell on",
    certTextSuffix: ".",
    singleItemLabel: "Item Details:",
    placeholderItem: "[ Item Name / System Details ]",
    colSlNo: "Sl. No.",
    colDesc: "Item Description / Particulars",
    sigReceiverSub: "Received By (Signature & Date)",
    sigAuthSub: "Authorized Signatory",
    defaultTitle: "District IT Officer, Alappuzha"
  },
  ml: {
    headerTitle: "ജില്ലാ റവന്യൂ ഐ.ടി സെൽ ആലപ്പുഴ",
    headerSub: "കൈപ്പറ്റ് രസീത് ",
    certTextPrefix: "താഴെ പറയുന്ന സിസ്റ്റം/ഇനങ്ങൾ ആലപ്പുഴ ഡിസ്ട്രിക്ട് ഐ.ടി സെല്ലിൽ ",
    certTextSuffix: " തീയതിയിൽ ലഭിച്ചുവെന്ന് ഇതിനാൽ സാക്ഷ്യപ്പെടുത്തുന്നു.",
    singleItemLabel: "ഇനങ്ങളുടെ വിവരങ്ങൾ:",
    placeholderItem: "[ സിസ്റ്റം / ഇനത്തിന്റെ പേര് ]",
    colSlNo: "ക്രമ നമ്പർ",
    colDesc: "ഇനങ്ങളുടെ വിവരണം",
    sigReceiverSub: "സ്വീകരിച്ചയാൾ (ഒപ്പും തീയതിയും)",
    sigAuthSub: "അംഗീകൃത ഉദ്യോഗസ്ഥൻ",
    defaultTitle: "ജില്ലാ റവന്യൂ ഐ.ടി കോർഡിനേറ്റർ, ആലപ്പുഴ"
  }
};

// DOM References
const langSelect = document.getElementById('langSelect');
const dateInput = document.getElementById('receiptDate');
const itemsInput = document.getElementById('itemsInput');
const receiverInput = document.getElementById('receiverName');
const titleInput = document.getElementById('signatoryTitle');

const headerTitle = document.getElementById('headerTitle');
const headerSub = document.getElementById('headerSub');
const certText = document.getElementById('certText');
const itemDisplayContainer = document.getElementById('itemDisplayContainer');
const displayReceiverName = document.getElementById('displayReceiverName');
const displayTitle = document.getElementById('displayTitle');
const sigSubReceiver = document.getElementById('sigSubReceiver');
const sigSubAuth = document.getElementById('sigSubAuth');

// Defaults
let currentLang = 'en';
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

// Listeners
langSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  if (!titleInput.dataset.userEdited) {
    titleInput.value = translations[currentLang].defaultTitle;
  }
  renderDocument();
});

dateInput.addEventListener('change', renderDocument);
itemsInput.addEventListener('input', renderDocument);

receiverInput.addEventListener('input', (e) => {
  displayReceiverName.textContent = e.target.value.trim() || (currentLang === 'ml' ? "[ പേര് ]" : "[ Receiver Name ]");
});

titleInput.addEventListener('input', (e) => {
  titleInput.dataset.userEdited = "true";
  displayTitle.textContent = e.target.value.trim() || translations[currentLang].defaultTitle;
});

// Render Document Content
function renderDocument() {
  const t = translations[currentLang];

  headerTitle.textContent = t.headerTitle;
  headerSub.textContent = t.headerSub;
  sigSubReceiver.textContent = t.sigReceiverSub;
  sigSubAuth.textContent = t.sigAuthSub;

  const dateStr = dateInput.value ? formatDate(dateInput.value) : (currentLang === 'ml' ? "[ തീയതി ]" : "[ Date ]");

  certText.innerHTML = `${t.certTextPrefix}<span id="displayDate">${dateStr}</span>${t.certTextSuffix}`;

  displayReceiverName.textContent = receiverInput.value.trim() || (currentLang === 'ml' ? "[ പേര് ]" : "[ Receiver Name ]");
  displayTitle.textContent = titleInput.value.trim() || t.defaultTitle;

  updateItemsDisplay(itemsInput.value, t);
}

function updateItemsDisplay(rawText, t) {
  const items = rawText
    .split('\n')
    .map(item => item.trim())
    .filter(item => item.length > 0);

  itemDisplayContainer.innerHTML = '';

  if (items.length <= 1) {
    const singleText = items.length === 1 ? items[0] : t.placeholderItem;
    const p = document.createElement('p');
    p.className = 'single-item-text';
    p.innerHTML = `<strong>${t.singleItemLabel}</strong> ${singleText}`;
    itemDisplayContainer.appendChild(p);
  } else {
    const table = document.createElement('table');
    table.className = 'item-table';
    
    table.innerHTML = `
      <thead>
        <tr>
          <th style="width: 10%; text-align: center;">${t.colSlNo}</th>
          <th>${t.colDesc}</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item, index) => `
          <tr>
            <td style="text-align: center;">${index + 1}</td>
            <td>${item}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    itemDisplayContainer.appendChild(table);
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const locale = currentLang === 'ml' ? 'ml-IN' : 'en-IN';
  return d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
}

// Initial Run
renderDocument();