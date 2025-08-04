// Export stories to PDF or CSV
export function exportStories(type, stories) {
  if (type === "csv") {
    const csv =
      "Theme,Date,Order,Accuracy\n" +
      stories
        .map(
          (s) =>
            `${s.theme},${new Date(
              s.timestamp
            ).toLocaleString()},"${s.order.join(" → ")}",${
              s.correct ? "Accurate" : "Needs Practice"
            }`
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "stories.csv";
    a.click();
  } else if (type === "pdf") {
    // Simple PDF export using window.print
    const win = window.open("", "", "width=800,height=600");
    win.document.write(
      "<html><head><title>Stories PDF</title></head><body>" +
        stories
          .map(
            (s) =>
              `<div><h3>${s.theme}</h3><div>Date: ${new Date(
                s.timestamp
              ).toLocaleString()}</div><div>Order: ${s.order.join(
                " → "
              )}</div><div>Accuracy: ${
                s.correct ? "Accurate" : "Needs Practice"
              }</div></div><hr>`
          )
          .join("") +
        "</body></html>"
    );
    win.document.close();
    win.print();
  }
}
