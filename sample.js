const fs = require("fs/promises");
const { YoutubeTranscript } = require("youtube-transcript");

const url = "https://www.youtube.com/watch?v=TW8fwGmIdHE";

async function main() {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url).catch(
      (error) => {
        console.error("failed to fetch transcript", error.message);
        return;
      }
    );

    const fullTranscriptTrimmed = transcript
      ? transcript.map((tnsx) => tnsx.text).join(" ")
      : "";

    if (fullTranscriptTrimmed) {
      await fs.writeFile("transcript.txt", fullTranscriptTrimmed, "utf-8");
      console.log("Transcript saved to transcript.txt");
    } else {
      console.log("No transcript content to write");
    }
  } catch (error) {
    console.error("Error writing transcript to file:", error);
  }
}

main();
