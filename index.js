const getChangedFiles = require("./src/changed-files");
const { generateMarkdownSuccessfulReport, generateMarkdownFailedReport } = require("./src/markdown-report");
const { createCommit, createComment } = require("./src/github");
const { processImages } = require("./src/core");

const run = async () => {
  const changedFiles = await getChangedFiles();

  if (changedFiles.length === 0) {
    return false
  } else {
    const processedImages = await processImages(changedFiles);

    if (processedImages.length > 0) {
      const markdown = await generateMarkdownSuccessfulReport(processedImages);
      await createComment(markdown);
      await createCommit(processedImages);
    } else {
      const markdown = await generateMarkdownFailedReport(changedFiles);
      await createComment(markdown);
    }
  }
}

run();
