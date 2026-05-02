export default function handler(req, res) {
  const today = new Date("2026-05-02"); // REMOVE THIS LINE LATER

  const start = new Date("2026-01-01");
  const end = new Date("2027-01-01");

  const daysGone = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
  const daysLeft = 365 - daysGone;
  const percent = Math.floor((daysGone / 365) * 100);

  let svg = `
  <svg width="1080" height="2460" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f7f6f4"/>

  <text x="540" y="200" font-size="120" text-anchor="middle" font-family="Arial">2026</text>
  <text x="540" y="320" font-size="40" text-anchor="middle" font-family="Arial">
    ${daysGone} days gone · ${daysLeft} days left · ${percent}%
  </text>
  `;

  let x = 100, y = 500;
  for (let i = 1; i <= 365; i++) {
    let color = "#ddd";
    if (i < daysGone) color = "#111";
    if (i === daysGone) color = "#ff6b00";

    svg += `<circle cx="${x}" cy="${y}" r="8" fill="${color}" />`;

    x += 25;
    if (i % 31 === 0) {
      x = 100;
      y += 60;
    }
  }

  svg += `
  <text x="540" y="2300" font-size="36" text-anchor="middle" font-family="Arial">
    Every dot is a choice I made
  </text>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}
