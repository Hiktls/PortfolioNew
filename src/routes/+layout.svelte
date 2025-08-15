<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import {ModeWatcher,toggleMode,mode} from "mode-watcher";
	import {Sun,Moon} from "lucide-svelte";
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	let { children } = $props();

	let pageRes;
	let blockAmount = $state(0);
	let blockSize = 4;


	let nCols;
	let nRows;

	let pagePromise = new Promise((resolve,reject) => {
		pageRes = resolve;
	})


	function handleCanvas() {
		const canvas = document.getElementById("backgroundCanvas") as HTMLCanvasElement;
		if (canvas.getContext("2d")){
			console.log("HANDLING!");

			const ctx = canvas.getContext("2d")!;
			
			ctx.fillStyle = "rgb(200 0 0)";
			for(let i = 0;i < nRows!;i+= blockSize){
				for (let j = 0; j < nCols!;j+= blockSize){
					console.log("YEA")
					let rect = new Path2D();
					rect.rect(i,j,blockSize,blockSize)
					ctx.stroke(rect);
				}
			}

		}
		
	}

	onMount(() => {
		nCols = Math.floor(window.innerWidth / blockSize);
		nRows = Math.floor(window.innerHeight / blockSize);
		blockAmount = Math.floor(nCols * nRows);
		pageRes!();
		console.log(window.innerHeight/blockSize)
		console.log(window.innerWidth/blockSize)
		console.log("BLOCKS",blockAmount)
		on(window,"load",handleCanvas);
	})

//Math.floor(window.innerWidth/blockSize
</script>


<ModeWatcher/>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


{#snippet backgroundBlock(size:number)}
    <div class="bg-background border-border border-1 size-{size}"></div>
{/snippet}

<header>
	<div class="flex flex-col w-screen h-12 items-end">
		<Button variant="outline" class=" justify-center mt-auto mb-auto mr-1" onclick={toggleMode}>
			{#key mode}
				{#if mode.current == "dark"}
				<Sun/>
				{:else}
				<Moon/>
				{/if}
			
			{/key}
		</Button>
	</div>
	<Separator/>
</header>

{#await pagePromise}
	
{:then val} 
<div class="w-full h-full">
	<div class="-z-1 absolute w-full h-full">
		<canvas id="backgroundCanvas" width={window.innerWidth} height={window.innerHeight}></canvas>
	</div>
	<div class="z-1">
		{@render children?.()}
	</div>
</div>

{/await}


<footer>
	<Separator/>
</footer>
