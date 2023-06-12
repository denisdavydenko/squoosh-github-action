const { filesize } = require("humanize");

const generateMarkdownSuccessfulReport = async (images) => {
  const lines = [];
  var totalBefore = 0;
  var totalAfter = 0;
  var totalPercent = 0;

  lines.push("Images optimized ✨\n");
  lines.push("| File | Before | After | Savings |");
  lines.push("| --- | --- | --- | --- |");

  for (const image of images) {
    lines.push(`| \`${image.repoPath}\` | ${filesize(image.before, 1000)} | ${filesize(image.after, 1000)} | ${image.percent}% |`);
    totalBefore += image.before;
    totalAfter += image.after;
    totalPercent += image.percent;
  };

  const avgPercent = Math.round(totalPercent / images.length);

  lines.push(`| **Total:** | **${filesize(totalBefore, 1000)}** | **${filesize(totalAfter, 1000)}** | **${avgPercent}%** |\n`);
  return lines.join("\n");
};

const generateMarkdownFailedReport = async (images) => {
  const lines = [];

  for (const image of images) {
    lines.push(`- \`${image.repoPath}\``);
  };

  return lines.join("\n");
};

module.exports = {
  generateMarkdownFailedReport,
  generateMarkdownSuccessfulReport,
}
