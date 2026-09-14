const token = "KGAT_fb011a797291650cd52c60cb0eed5d1";
const url = "https://www.kaggle.com/api/v1/datasets/download/rodsaldanha/arketing-campaign/marketing_campaign.csv";
async function main() {
  const response = await fetch(url, {
    headers: { Authorization: "Bearer " + token }
  });
  console.log("Status:", response.status);
  const text = await response.text();
  const rows = text.trim().split("\n").slice(1);
  const accepted = rows.filter(row => row.trim().split(";").at(-1) === "1").length;

  console.log("Customers:", rows.length);
  console.log("Accepted the last campaign:", accepted);

  for (let campaign = 1; campaign <= 5; campaign++) {
    const acceptedCount = rows.filter(row => {
      const columns = row.trim().split(";");
      const columnIndex = 20 + campaign;
      return columns[columnIndex] === "1";
    }).length;

    console.log(`Accepted campaign ${campaign}:`, acceptedCount);
  }
}
main();