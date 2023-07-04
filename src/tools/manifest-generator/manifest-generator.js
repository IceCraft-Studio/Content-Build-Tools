const Fs = require('node:fs');
const Path = require('node:path');
const Process = require('node:process');
const Uuid = require('uuid');
const {Project} = require('../../lib/project');

function main(input) {
    const projectPath = (input[0] ?? Process.argv[2]) ?? Process.cwd();
    const project = new Project(projectPath);
}

main(['D:\\Minecraft\\projects\\resource_packs\\negative-colors\\']);