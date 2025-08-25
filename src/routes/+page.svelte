<script lang="ts">
    // HIGHLIGHT.JS IMPORTS
    import hljs from 'highlight.js/lib/core';
    import "highlight.js/styles/github-dark.css";
    import python from 'highlight.js/lib/languages/python';
    import js from 'highlight.js/lib/languages/javascript';
    import rust from 'highlight.js/lib/languages/rust';
    import docker from 'highlight.js/lib/languages/dockerfile';
    import htmlType from "highlight.js/lib/languages/xml";
    import bash from "highlight.js/lib/languages/bash";
    // END HIGHLIGHT.JS IMPORTS

    //ICON IMPORTS
    import fastImg from "$lib/assets/FastAPI.svg";
    import svelteImg from "$lib/assets/Svelte.svg";
    import rustImg from "$lib/assets/Rust.png";
    import linuxImg from "$lib/assets/Linux.svg";
    import pythonimg from "$lib/assets/Python.svg";
    import dockerImg from "$lib/assets/Docker.svg";
    import jsImg from "$lib/assets/JS.svg";
    import awsImg from "$lib/assets/AWS.svg";
    import solidityImg from "$lib/assets/Solidity.svg";
    //END ICON IMPORTS

    import {Button,buttonVariants} from '$lib/components/ui/button/index';
    import { ArrowDown,Ellipsis,ChevronRight, LogOut } from 'lucide-svelte';
    import * as Drawer from "$lib/components/ui/drawer/index";


    hljs.registerLanguage('python', python);
    hljs.registerLanguage('javascript', js);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('dockerfile', docker);
    hljs.registerLanguage('xml', htmlType);
    hljs.registerLanguage('bash', bash);
    const TITLES = ["a software developer","a linux enthusiast","a homecook","a backend developer","your future coworker","a language learning fan","a curious pentester"];
    let title = $state(TITLES[0]);
    
    
    setInterval(() => {
        title = TITLES[Math.floor(Math.random() * TITLES.length)]
    },4000)
    
    let svelteStart = `<sc` + `ript>`;
    let svelteEnd = `</sc` + `ript>`;

    let samples = {
        fastApi:
`#fastapi.tiangolo.com
from typing import Union
from fastapi import FastAP

app = FastAPI(

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")

def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}`,
        svelte:
`${svelteStart}
    let names = ["Alice","Bob","Charlie"];
    let currentName = $state("");
    setInterval(() => {
        currentName = names[Math.floor(Math.random() * names.length)];
    },3000);
${svelteEnd}

{#key currentName}
    <h1>Hello {currentName}!</h1>
{/key}`,
        rust:
`fn main() {
    println!("Did you know, printing \"Hello, World!\" to test an initial program \\ 
        has been popularized by the C Programming Language book \\ 
        by Brian Kernighan and Dennis Ritchie in 1978?");
}
`,
        linux:
`$ sudo pacman -Syu
<...>
$ sudo pacman -S cowsay fortune
<...>
$ fortune | cowsay
"
  _______________________________________
/ If at first you do succeed, try to hide \\\\
\\\\ your astonishment                       /
  ---------------------------------------
         \\   ^__^ 
          \\  (oo)\_______
             (__)\       )\\/\\
                 ||----w |
                 ||     ||
"
`
};
    
               

    function typewriter(node:HTMLElement,{speed = 1,delay = 1}:{speed?:number,delay?:number}){
        const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

        const text = node.textContent;
		const duration = text.length / (speed * 0.01);


        let itCounter = 0;
        let cursorStop = false;
        let cursDelayer = 0;
		return {
			duration,
            delay:duration * delay,
			tick: (t:number) => {
				const i = ~~(text.length * t);

                

                if (t == 1){
                    node.textContent = text.slice(0, i);
                }
                else {
                    node.textContent = text.slice(0, i) + "|";
                }
                itCounter++;

			}
		};

    }
    // out:typewriter|global={{speed:2,delay:0}} in:typewriter|global={{speed:1,delay:1}}



</script>


{#snippet titleText()}
    <span class=" text-primary drop-shadow-primary drop-shadow-2xl font-semibold mb-20 mt-40 will-change-contents lg:text-6xl text-4xl" out:typewriter|global={{speed:2,delay:0}} in:typewriter|global={{speed:1,delay:1}} >{title}</span>
{/snippet}


<div class="md:h-300 h-90 bg-no-repeat">
    <div class="w-225 h-50 m-auto mb-20">
        <span class="">
            <span class="will-change-contents lg:text-6xl text-4xl">Hello! I am <span class="">Kaan</span>, </span>
            {#key title}{@render titleText()}{/key}
        </span>
    </div>
        
        
        
        <div class="m-auto w-60 h-80">
            <Button class="w-40 h-10 lg:text-lg pointer-events-auto" onclick={() => window.location.href="#about"}><ArrowDown size={4}/> Read More</Button>
        </div>

        <div id="about" class="w-screen ">

            {#snippet logoCard(src:string,alt:string,description:string,sample:string)}
            {@const highlighted = hljs.highlightAuto(sample).value}
            <Drawer.Root>
                <Drawer.Trigger>
                    <div id={alt} class="rounded-2xl border-muted-foreground border-2 size-40 flex justify-center select-none transition ease-in-out hover:scale-110"> <img class="size-20 m-auto" src={src} alt={alt}/> </div>
                </Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>{alt.toUpperCase()}</Drawer.Title>
                    </Drawer.Header>
                    <div class="">
                        <p class="ml-5 md:text-2xl">{description}</p>
                        <div class=" bg-[#27272a] md:w-250 ml-5 mt-2 pt-2 pl-2 pb-2 rounded-lg border-1 border-muted-foreground text-white">
                            <code class="whitespace-pre-wrap md:text-lg  pointer-events-auto">
                                {@html highlighted}
                            </code>
                        </div>

                    </div>
                    <Drawer.Footer>
                        <Drawer.Close class={buttonVariants({ variant: "outline" })}>Leave</Drawer.Close>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.Root>
            {/snippet}


            <div class="pointer-events-auto lg:w-300 h-200 overflow-hidden grid grid-cols-3 grid-rows-3 m-auto gap-20 p-5">
                {@render logoCard(fastImg,"fastapi","FastAPI is my go-to framework due to it's feature rich and high performance toolkit, especiallly due to its OpenAPI auto-documentation.",samples.fastApi)}
                {@render logoCard(svelteImg,"svelte","Svelte is the first front-end development framework I reach for in my toolkit. It has everything I can ask for, on steroids.",samples.svelte)}
                {@render logoCard(linuxImg,"linux","As a cross-platform-passionate developer, I dual-boot Linux and Windows, Linux being my primary choice. I complement my work with Windows as needed. I have experience setting up and maintaining personal Linux servers.",samples.linux)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",samples.fastApi)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",samples.fastApi)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",samples.fastApi)}
            </div>


        </div>
</div>

