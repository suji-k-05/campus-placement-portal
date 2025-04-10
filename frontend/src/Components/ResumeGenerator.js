export const generateResume = async (email) => {
    console.log("🟢 Generating resume for:", email);

    try {
        const response = await fetch(`http://localhost:3002/api/resume/generate/${email}`);

        if (!response.ok) {
            throw new Error(`❌ Failed to generate resume: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
console.log("📏 PDF Blob Size:", blob.size, "bytes");

if (blob.size === 0) {
    throw new Error("❌ Received an empty PDF file!");
}

// ✅ Ensure proper file download handling
const pdfUrl = window.URL.createObjectURL(blob);
const a = document.createElement("a");
document.body.appendChild(a);
a.style.display = "none";  // Hide the link
a.href = pdfUrl;
a.setAttribute("download", "Resume.pdf");  // Ensure filename
a.click();
window.URL.revokeObjectURL(pdfUrl);  // Cleanup memory
document.body.removeChild(a);

console.log("✅ Resume downloaded successfully!");


        console.log("✅ Resume downloaded successfully!");
    } catch (error) {
        console.error("❌ Error generating resume:", error);
    }
};
