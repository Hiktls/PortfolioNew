<script lang="ts">

    import {
	blur,
    } from 'svelte/transition';
    

    import { type CarouselAPI } from '$lib/components/ui/carousel/context';
    import Button from '$lib/components/ui/button/button.svelte';
    import ObjectiveCarousel from '$lib/components/ui/objectiveCarousel/objectiveCarousel.svelte';
    import { ArrowDown,Ellipsis,ChevronRight } from 'lucide-svelte';
	import SelectiveCarousel from '$lib/components/ui/selectiveCarousel/selectiveCarousel.svelte';
    
    const TITLES = ["a software developer","a linux enthusiast","a homecook","a backend developer","your future coworker","a language learning fan","a curious pentester"];
    let title = $state(TITLES[0]);
    
    let s = $state(0);
    
    setInterval(() => {
        title = TITLES[Math.floor(Math.random() * TITLES.length)]
    },4000)
    
    
    let current = $state("");

    let carObjects = [["https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg","svelte"],["/FastAPI.svg","fastapi"]]
    let carNotes = {"svelte": "Svelte is my go-to choice for front-end development as It is very versatile and \"makes the most sense\" when a design is being implemented."}

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
    <div class="w-225 h-50 m-auto mb-20 mt-40">
        <span class="">
            <span class="will-change-contents lg:text-6xl text-4xl">Hello! I am <span class="">Kaan</span>, </span>
            {#key title}{@render titleText()}{/key}
        </span>
    </div>
        
        
        
        <div class="m-auto w-60 h-80">
            <Button class="w-40 h-10 lg:text-lg" onclick={() => window.location.href="#about"}><ArrowDown size={4}/> Read More</Button>
        </div>

        <div id="about" class="w-screen ">

            {#snippet logoCard(src:string,alt:string,description:string)}
            <div id={alt} class="bg-card rounded-2xl border-primary size-60 flex justify-center select-none hover:animate-pulse"> <img class="size-30 m-auto" src={src} alt={alt}/> </div>
            {/snippet}



            <div class="mt-20 mb-20 w-[80%] h-120 bg-card m-auto rounded-2xl border-1 border-border">
                <!-- <ObjectiveCarousel
                objects={[["https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg","svelte"],["/FastAPI.svg","fastapi"]]}
                class=""
                bind:currentObject={current}
                ></ObjectiveCarousel> -->

                <SelectiveCarousel
                objects={[["https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg","svelte","Svelte is my go to choice for front-end development as It's simple yet powerful rune system, as well as how it handles SSR are strong pros for efficient developers."],["/FastAPI.svg","fastapi"]]}
                class="mt-4 ml-5"
                bind:currentObject={current}
                ></SelectiveCarousel>

                <div id="content">

                </div>
                
            </div>
            

            <div class="flex flex-row gap-10 mt-20 justify-center ">

            </div>

        </div>
</div>

