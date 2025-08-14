<script lang="ts">
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import { ArrowDown } from "lucide-svelte";
	import Button from "../button/button.svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import { fade, slide } from "svelte/transition";

    let {objects,currentObject = $bindable(),class:ClassValue}: {objects:Array<Array<string>>,currentObject:any,class:any} = $props();

    let stoneCount = $state(0);

    let rollingStone = (op:number) => {
        console.log(stoneCount);
        if (stoneCount + op > objects.length-1) {
            stoneCount = 0;
        }
        else if (stoneCount + op < 0){
            stoneCount = objects.length -1
        }
        else {
            stoneCount = stoneCount + op;
        }
        console.log(stoneCount);
        currentObject = objects[stoneCount][1]
    }

    function disappearFix(node:HTMLElement,{duration,delay}:{duration?:number,delay?:number}){

        return {
            duration,
            delay,
            tick: (t:number) =>{
                if(t == 1){
                    node.hidden = true
                }
                else if(t == 0 ){
                    node.hidden = false
                }
            } 
        }
    }
</script>

{#key currentObject}
    <div out:disappearFix={{duration:500}} id={objects[stoneCount][1]} class="size-60 border-0 border-border rounded-2xl overflow-hidden {ClassValue}">
        <img out:slide|global={{duration:500,axis:"x"}} in:slide={{delay:500,axis:"x"}}  class="size-42 mt-2 mb-4 m-auto" alt={objects[stoneCount][1]} src={objects[stoneCount][0]}/>

        <span out:disappearFix={{duration:500}} in:disappearFix={{delay:500}} class="flex justify-between gap-2 m-auto w-max">
            <Button variant="outline" class="border-0" onclick={() => rollingStone(-1)}> <ArrowLeft/></Button> 
            <Button variant="outline" class="border-0" onclick={() => rollingStone(1)}> <ArrowRight/></Button>
        </span>
    </div>
{/key}