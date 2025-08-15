<script lang="ts">
	import { onMount } from "svelte";
    import {on} from "svelte/events";
	import { crossfade, draw, fly, slide } from "svelte/transition";

    let {objects,currentObject = $bindable(),class:ClassValue}: {objects:Array<Array<string>>,currentObject:any,class:any} = $props();
    

    let lastClicked = $state(0);

    onMount(() =>{
        for (let i=0;i!=objects.length;i++){
            let c = objects[i];
            console.log(c,"YEA BOY");

            let objRef = document.getElementById(c[1])!;

            on(objRef,"click",() =>{
                console.log("CLICKED ",c[1]);
                lastClicked = i;
            })

        }
    })
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
</script>

{#snippet selectable(src:string,id:string)}
    <span {id} class="size-3 transition delay-100 duration-400 bg-white rounded-4xl hover:scale-200 ease-in-out"><img class="size-3 delay-100 duration-400 opacity-0 transition-all ease-in-out hover:opacity-100 hover:scale-150" alt={id} src={src}/></span>
{/snippet}

<div class="{ClassValue}">
    <div class="flex w-full gap-4 mt-1">
        {#each objects as object,i}
        {@render selectable(object[0],object[1])}
        {/each}
    </div>
    <div class="overflow-hidden w-full mt-10 h-full">
        {#key lastClicked}
            <img out:slide={{duration:500}} in:slide={{delay:500}} class="size-40" alt={objects[lastClicked][1]} src={objects[lastClicked][0]}/>
            <span>
                {@html objects[lastClicked][2]}
            </span>
        {/key}
    </div>
</div>

