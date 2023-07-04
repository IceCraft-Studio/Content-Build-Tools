const Fs = require('node:fs');
const Path = require('node:path');
const { readdirRecursive } = require('../js_modules/fs');

class Project {
    constructor(path) {
        this.#projectPath = Path.resolve(path);
        this.#projectData = JSON.parse(Fs.readFileSync(Path.join(path, '/mcproject.json')).toString());
    }

    get id() {
        return this.#projectData.config.id;
    }

    get name() {
        return this.#projectData.config.name;
    }

    get path() {
        return this.#projectPath;
    }

    get version() {
        return this.#projectData.config.version;
    }

    get displayVersion() {
        return `${this.version[0]}.${this.version[1]}${this.version[2] === 0 ? '' : `.${this.version[2]}`}`;
    }

    async forEachSourceFile(callback) {
        const srcPath = Path.join(this.path, '/src/');
        await readdirRecursive(srcPath, (filePath) => {
            if (fileExclusion(filePath)) return;
            const relativePath = Path.relative(srcPath, filePath);
            const relativeDirectory = Path.dirname(relativePath);
            callback(filePath, relativePath, relativeDirectory);
        });
    }

    #validateProjectDir() {
        return (
            Fs.existsSync(Path.join(this.path,'/mcproject.json')) &&
            Fs.existsSync(Path.join(this.path, '/src/'))
        );
    }

    #validateProjectData() {
    }


    #projectData;

    static globalConfig() {
        return JSON.parse(Fs.readFileSync('D:/Minecraft/projects/config.json').toString());
    }
}

function fileExclusion(filePath) {
    return false;
}

module.exports = { Project, globalConfig };