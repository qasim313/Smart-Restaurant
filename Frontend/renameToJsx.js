import { readdir, rename, lstat } from 'fs/promises';
import path from 'path';

// Directory to start searching for files
const directoryPath = path.join(process.cwd(), 'src');

// Function to recursively rename .js files to .jsx
const renameFilesToJsx = async (dir) => {
    try {
        const files = await readdir(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const fileStat = await lstat(filePath);

            if (fileStat.isDirectory()) {
                await renameFilesToJsx(filePath); // Recursively process directories
            } else if (path.extname(file) === '.js') {
                const jsxFilePath = filePath.replace(/\.js$/, '.jsx');
                await rename(filePath, jsxFilePath);
                console.log(`Renamed ${file} to ${path.basename(jsxFilePath)}`);
            }
        }
    } catch (err) {
        console.error(`Error processing directory ${dir}: ${err.message}`);
    }
};

// Start renaming files from the specified directory
renameFilesToJsx(directoryPath);
