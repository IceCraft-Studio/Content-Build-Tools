const AdmZip = require('adm-zip');
const Fs = require('node:fs');
const Path = require('node:path');
const Process = require('node:process');
const { readdirRecursive } = require('../../js_modules/fs');

async function main(input) {
    const projectPath = (input ?? Process.argv[2]) ?? Process.cwd();
    const projectData = JSON.parse(Fs.readFileSync(Path.join(projectPath, '/mcproject.json')).toString());
    const srcPath = Path.join(projectPath, '/src/');
    const exportsPath = Path.join(projectPath, '/exports/');
    if (!checkProjectDir(projectPath)) throw new Error(`Specified path '${projectPath}' isn't a project directory!`);
    else console.log(`Reading project directory '${projectPath}'...`);

    const archivedProject = new AdmZip();
    await readdirRecursive(Path.join(projectPath,'/src/'), (filePath) => {
        if (fileExclusion(filePath)) return;
        const relativePath = Path.relative(srcPath, filePath);
        const relativeDirectory = Path.dirname(relativePath);
        archivedProject.addLocalFile(filePath, relativeDirectory === '.' ? '' : relativeDirectory);
        console.log(`Added ${relativePath} to archive...`);
    });
    for (const exportName of getProjectExportNames(projectData)) {
        archivedProject.writeZip(Path.join(exportsPath, exportName));
        console.log(`Exported ${exportName} to ${exportsPath}...`);
    }
}

function checkProjectDir(projectPath) {
    return (
        Fs.existsSync(Path.join(projectPath,'/mcproject.json')) &&
        Fs.existsSync(Path.join(projectPath, '/src/'))
    )
}

function getProjectExportNames(projectData) {
    const version = projectData.config.version;
    const displayVersion = `${version[0]}.${version[1]}${version[2] === 0 ? '' : `.${version[2]}`}`;
    return [
        `${projectData.config.id}_v${displayVersion}.zip`,
        `${projectData.config.id}_v${displayVersion}.mcpack`
    ];
}

function fileExclusion(filePath) {
    return false;
}


main('D:\\Minecraft\\projects\\resource_packs\\negative-colors\\');