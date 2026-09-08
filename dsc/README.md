# Capricorn Authorization Letter – Alappuzha

A single-page GitHub Pages web app based on the supplied authorization-letter PDF.

## Editable fields

- Applicant Name
- Position/Designation
- Organization ID Card No
- Mobile No
- Email ID
- Date (calendar picker)

## Hard-coded fields

- Organization Name: `OFFICE OF THE DISTRICT COLLECTORATE ALAPPUZHA`
- Department Name: `REVENUE`
- Office Address with PIN code: `DISTRICT COLLECTORATE ALAPPUZHA, 688001`

The supplied PDF layout is used as the page background, while the editable inputs are positioned over the blank table cells. This keeps the original alignment and wording unchanged.

## Run locally

Open `index.html` in a modern browser. For best results, use Chrome/Edge/Firefox.

## Host on GitHub Pages

1. Create a new GitHub repository, for example `capricorn-authorization-alappuzha`.
2. Upload all files and folders from this project.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save. GitHub will publish the site at your GitHub Pages URL.

## Printing

Click **Print / Save PDF**. In the browser print dialog:

- Paper: **Letter**
- Margins: **None**
- Scale: **100% / Actual size**
- Turn off browser headers and footers
- Enable background graphics if your browser provides that option

The original source page is Letter size (612 × 792 PDF points), so the app is intentionally locked to that physical page size.


### Date field

The Date field now uses the browser's native calendar/date picker. The original pre-filled date has been removed from the template image so the selected date can be entered without changing the original page alignment.
