// Script to analyze potentially problematic glob patterns
// Run with: node temp/analyze-patterns.js

const path = require('path');
const fs = require('fs');

// List directories to check for potentially problematic patterns
const directoriesToCheck = [
  'public',
  'public/favicon',
  'public/images',
  'app',
  'components'
];

console.log('Analyzing directory structure for potential glob pattern issues...');

// Check max directory depth
function checkDirectoryDepth(dirPath, baseDepth = 0) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory does not exist: ${dirPath}`);
    return 0;
  }
  
  let maxDepth = baseDepth;
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isDirectory()) {
      const subdirPath = path.join(dirPath, item.name);
      const subdirDepth = checkDirectoryDepth(subdirPath, baseDepth + 1);
      maxDepth = Math.max(maxDepth, subdirDepth);
    }
  }
  
  return maxDepth;
}

// Check for large number of files in a directory (can cause glob issues)
function countFilesInDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory does not exist: ${dirPath}`);
    return 0;
  }
  
  let fileCount = 0;
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isFile()) {
      fileCount++;
    } else if (item.isDirectory()) {
      fileCount += countFilesInDirectory(path.join(dirPath, item.name));
    }
  }
  
  return fileCount;
}

// Check for symbolic links that could cause circular references
function findSymlinks(dirPath, results = []) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory does not exist: ${dirPath}`);
    return results;
  }
  
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isSymbolicLink()) {
      results.push(fullPath);
    } else if (item.isDirectory()) {
      findSymlinks(fullPath, results);
    }
  }
  
  return results;
}

// Run the analysis for each directory
directoriesToCheck.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  console.log(`\nAnalyzing: ${dir}`);
  
  console.log(`Maximum directory depth: ${checkDirectoryDepth(fullPath)}`);
  console.log(`Total files: ${countFilesInDirectory(fullPath)}`);
  
  const symlinks = findSymlinks(fullPath);
  if (symlinks.length > 0) {
    console.log('Symbolic links found (potential issue):');
    symlinks.forEach(link => console.log(`  - ${link}`));
  } else {
    console.log('No symbolic links found.');
  }
});

console.log('\nAnalysis complete!');
console.log('Check for:');
console.log('- Directories with very deep nesting (> 5 levels)');
console.log('- Directories with extremely large numbers of files');
console.log('- Symbolic links that might create circular references');