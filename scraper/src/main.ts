import axios from "axios";
import * as cheerio from 'cheerio';

/*
this json scheme:
{
  "name":"Twilight Town",
  "slug_name": "twilight-town",
  "new": true,
  "author":"Jude Buffum",
  "description": "A glowing palette of oranges, purples, and deep shadows for strange houses, flickering lanterns, and fantastical villages. ",
  "like_count": 17,
  "comment_count": 0,
  "hashtag": "twilighttown",
  "color_count": 16,
  "download_count": 209,
  "colors":["4e1d4c","771d50","904d57","be6a62","ac2f45","e64639","ff8a32","f1b640","ffc5a3","686f9a","404974","283440","3d2935","291d2b","1b1f22","21181b"],
  "preview_images": ["https://cdn.lospec.com/palette-examples/twilight-town-palette-example-by-jude-buffum-190960.png"],
  "tags": [ "pixelart", "twilight", "town", "village", "fantasy", "strange", "mysterious", "lantern", "orange", "purple", "dark", "glowing", "architecture"]
}

 */

async function main(){
    //const LOSPEC_URL = "https://lospec.com/palette-list";

    //let html_promise = new Promise((resolve)=>{
    //    axios.get(LOSPEC_URL).then((response) => {resolve(response.data)});
    //});
    //let html:string  = await html_promise as string;

    const fs = require('fs')
    const html = fs.readFileSync('./Palette\ List.html').toString()
    const $ = cheerio.load(html);

    const articles = $("article");
    articles.each((_, article) => {
        const $article = $(article);
        const $name= $($article.find("h1 > a")[0]);
        const $extra = $($article.find("h1 > div")[0])
        const $author = $($article.find("p.attribution > a")[0])
        const $description = $($article.find("p")[1])
        const $like_count = $($article.find("div.current")[0])
        const $comment_count = $($article.find("a.comments-count")[0])
        const $palette_specs = $($article.find("ul.palette-specs")[0])
        const $hashtag = $($palette_specs.find("li")[0])
        const $color_count = $($palette_specs.find("li")[1])
        const $download_count = $($palette_specs.find("li")[2])
        const $color = $article.find("div.color")
        const $examples = $article.find("ul.examples > li")
        const $tags = $article.find("a.tag-link")
        let colors = [];
        $color.each((_, color) => {
            //background:#291916;
            colors.push($(color).attr("style").substring(12,18));
        })
        let preview_links = [];
        $examples.each((_, example) => {
            let example_styles_split = $(example).attr("style").split(" ")[1];
            //url('https://cdn.lospec.com/palette-examples/forgotten-memories-41-palette-example-by-robodoggo-977833.png');
            preview_links.push(example_styles_split.slice(5,-3));
        })
        let tags = [ ];
        $tags.each((_, tag) => {
            tags.push($(tag).text().trim());
        })
        const obj = {
            name: $name.text().trim(),
            slug_name: $name.attr("href").split("/").pop(),
            extra: $extra.text().trim(),
            author: $author.text().trim(),
            description: $description.text().trim(),
            like_count: Number($like_count.text().trim()),
            comment_count: Number($comment_count.text().trim().split(" ")[0]),
            hashtag: $hashtag.text().trim().substring(1),
            color_count: Number($color_count.text().trim().split(" ")[0]),
            download_count: Number($download_count.text().trim().split(" ")[0].split(",").join("")),
            colors: colors,
            preview_images: preview_links,
            tags: tags,
        }
        console.log(obj);
        fs.writeFile( "./data/" + obj.slug_name+".json", JSON.stringify(obj), ()=>{});

    })
}
/*
console.log( `
{
    "name": "${$name.text().trim()}",
    "slug_name": "${$name.attr("href").split("/").pop()}",
    "extra": "${$extra.text().trim()}"
    "author": "${$author.text().trim()}"
    "description": "${$description.text().trim()}"
}
   `)
})
 */
main();