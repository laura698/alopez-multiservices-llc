import { copyFileSync } from "fs";

copyFileSync("src/robots.txt", "build/robots.txt");
copyFileSync("src/sitemap.xml", "build/sitemap.xml");

console.log("robots.txt and sitemap.xml copied to build");