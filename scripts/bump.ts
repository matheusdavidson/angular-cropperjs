import * as fs from "fs";
import * as shell from "shelljs";
import { VERSION } from "../version";

let newVersion = "";
export type SemanticTarget = "major" | "minor" | "patch";

export function bumpVersionFile(version) {
    fs.writeFile(
        `../version.ts`,
        `export const VERSION = '${version}';`,
        function (err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log("Version file updated");
        }
    );
}

export function bumpLibPackageFile(version) {
    //
    // Read lib package.json
    fs.readFile(
        `../projects/angular-cropperjs/package.json`,
        "utf8",
        function (err, contents) {
            //
            // Parse json
            const pkg = JSON.parse(contents);
            // update version
            pkg.version = version;

            //
            // Write package.json
            fs.writeFile(
                `../projects/angular-cropperjs/package.json`,
                JSON.stringify(pkg, null, "\t"),
                function (err) {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    }
                    console.log(`Frontoose main package updated`);
                }
            );
        }
    );
}

export function bumpMainPackageFile(version) {
    //
    // Read package.json
    fs.readFile(`../package.json`, "utf8", function (err, contents) {
        //
        // Parse json
        const pkg = JSON.parse(contents);
        // update version
        pkg.version = version;

        //
        // Write package.json
        fs.writeFile(
            `../package.json`,
            JSON.stringify(pkg, null, "\t"),
            function (err) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log(`Frontoose main package updated`);
            }
        );
    });
}

export function bumpNumber(num: string, target: SemanticTarget) {
    let major = parseFloat(num.split(".")[0]);
    let minor = parseFloat(num.split(".")[1]);
    let patch = parseFloat(num.split(".")[2]);

    switch (target) {
        case "major":
            major += 1;
            minor = 0;
            patch = 0;
            break;
        case "minor":
            minor += 1;
            patch = 0;
            break;
        case "patch":
            patch += 1;
            break;
    }
    return `${major}.${minor}.${patch}`;
}

export function gitTag() {
    // re-create tag due to standard-version bug
    shell.exec(
        `cd ../ && git tag -a v${VERSION} -m "chore(release): ${VERSION}"`
    );
    shell.exec(`git commit -am "chore(release): ${VERSION}"`);
}

export function bump(target: SemanticTarget = "patch") {
    newVersion = bumpNumber(VERSION, target);

    bumpVersionFile(newVersion);
    bumpLibPackageFile(newVersion);
    bumpMainPackageFile(newVersion);
}

//
// test
// console.log(bump());
