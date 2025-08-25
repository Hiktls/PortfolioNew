<script lang="ts">

    import hljs from 'highlight.js/lib/core';
    import python from 'highlight.js/lib/languages/python';
    import js from 'highlight.js/lib/languages/javascript';
    import rust from 'highlight.js/lib/languages/rust';
    import docker from 'highlight.js/lib/languages/dockerfile';


    
    import fastImg from "../../static/FastAPI.svg";
    import Button from '$lib/components/ui/button/button.svelte';
    import { ArrowDown,Ellipsis,ChevronRight, LogOut } from 'lucide-svelte';
    import * as Drawer from "$lib/components/ui/drawer/index";


    hljs.registerLanguage('python', python);
    hljs.registerLanguage('javascript', js);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('dockerfile', docker);

    const TITLES = ["a software developer","a linux enthusiast","a homecook","a backend developer","your future coworker","a language learning fan","a curious pentester"];
    let title = $state(TITLES[0]);
    
    let s = $state(0);
    
    setInterval(() => {
        title = TITLES[Math.floor(Math.random() * TITLES.length)]
    },4000)
    

    let fastApiSamp = `
    from typing import Union
    from fastapi import FastAPI

    app = FastAPI()


    @app.get("/")
    def read_root():
        return {"Hello": "World"}


    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}`;
    



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
            <div id={alt} class="rounded-2xl border-gray-400 border-1 size-40 flex justify-center select-none transition ease-in-out hover:scale-110"> <img class="size-20 m-auto" src={src} alt={alt}/> </div>
                </Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>{alt.toUpperCase()}</Drawer.Title>
                    </Drawer.Header>
                    <div class="m-5 ">
                        <p class="  md:text-2xl">{description}</p>
                        <div class="whitespace-pre-wrap">
                            {@html highlighted}
                        </div>
                    </div>
                    <Drawer.Footer>
                        <Button  variant="destructive">Leave</Button>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.Root>
            {/snippet}



            <div class="pointer-events-auto lg:w-300 h-200 overflow-hidden grid grid-cols-3 grid-rows-3 m-auto gap-20 p-5">
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",fastApiSamp)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",fastApiSamp)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",fastApiSamp)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",fastApiSamp)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",fastApiSamp)}
                {@render logoCard(fastImg,"fastapi","FastAPI is my favorite backend framework due to its speed, ease of use, and automatic generation of OpenAPI documentation.",fastApiSamp)}


            </div>


        </div>
</div>

