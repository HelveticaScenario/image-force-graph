import * as PIXI from 'pixi.js';
import * as d3 from 'd3';



import {data} from './data';

function rgbToHex(r: number, g: number, b: number) {
    return (((r << 8) | g) << 8) | b;
}

let hex = data.map(line => line.map(pixel => rgbToHex(pixel[0], pixel[1], pixel[2])));

let app = new PIXI.Application(window.innerWidth, window.innerWidth, { antialias: true ,backgroundColor : 0xFFFFFF});
app.renderer.autoResize = true;
document.body.appendChild(app.view);

let interation = new PIXI.interaction.InteractionManager(app.renderer);

let c = document.createElement('canvas');
let ctx = c.getContext('2d');
c.width = 1;
c.height = 1;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 1, 1);
let tex = new PIXI.BaseTexture(c);
tex.height = 11;
tex.width = 11;
let sprites: PIXI.Sprite[][] = [];

for (let y = 0; y < hex.length; y++) {
    let line = hex[y];
    let spriteLine: PIXI.Sprite[] = [];
    sprites.push(spriteLine)
    for (let x = 0; x < line.length; x++) {
        let pixel = line[x];
        let sprite = PIXI.Sprite.from(tex);
        sprite.tint = pixel;
        sprite.alpha = 1;
        sprite.position.set(x*7, y*7);
        app.stage.addChild(sprite);
        spriteLine.push(sprite);
    }
}

// TODO: create circular mask image, add forces

app.ticker.add(function() {
    for (let y = 0; y < sprites.length; y++) {
        let line = sprites[y];
        for (let x = 0; x < line.length; x++) {
            line[x].position.set((x*11) + interation.mouse.global.x + ((Math.random()-0.5) * 2), (y*11) + interation.mouse.global.y + ((Math.random()-0.5) * 2));
        }
    }
//   let p1 = d3.mouse(this);
//   root.px = p1[0];
//   root.py = p1[1];
//   force.resume();
});



