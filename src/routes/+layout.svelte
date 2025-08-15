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
	let blockSize = 20;


	let nCols = $state(0);
	let nRows = $state(0);

	let pagePromise = new Promise((resolve,reject) => {
		pageRes = resolve;
	})


	function handleCanvas() {
		const canvas = document.getElementById("backgroundCanvas") as HTMLCanvasElement;
		if (canvas.getContext("2d")){
			console.log("HANDLING!");

			const ctx = canvas.getContext("2d")!;
			
			ctx.fillStyle = "rgb(200 0 0)";
			ctx.strokeStyle = "rgb(200 0 0)";
			for(let i = 0;i < window.innerWidth!;i++){
					for(let j=0;j<window.innerHeight;j++){
						let rect = new Path2D();
						rect.rect(i*blockSize,j*blockSize,blockSize,blockSize);
						ctx.stroke(rect);
						console.log(i*blockSize);
					}
			}

		}
		
	}

	let rowColStr = $state("")

	function generateRowCol(row:number,col:number) {
		return `grid-rows-${row} grid-cols-${col}`
	}
	function test() {
		return new HTMLElement().innerHTML = ""
	}

	onMount(() => {
		nCols = Math.floor(window.innerHeight / blockSize);
		nRows = Math.floor(window.innerWidth / blockSize);
		blockAmount = Math.floor(nCols * nRows);
		pageRes!();

		rowColStr = generateRowCol(nRows,nCols);

		console.log("Rows",nRows.toString())
		console.log("Columns",nCols.toString())
		console.log("BLOCKS",blockAmount)
		// on(window,"load",handleCanvas);
	})

//Math.floor(window.innerWidth/blockSize
</script>


<ModeWatcher/>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


{#snippet backgroundBlock(size:number)}
    <div class="bg-background border-border border-1 size-{size.toString()} hover:border-white"></div>
{/snippet}

{#await pagePromise}
	
{:then val} 
<div class="w-screen h-screen">
		<div style="--row-count: repeat({nRows}, minmax(0, 1fr)); --col-count: repeat({nCols}, minmax(0, 1fr));" class="-z-1 overflow-x-hidden fixed w-screen h-screen grid grid-rows-(--col-count) grid-cols-(--row-count)">
			{#each {length: blockAmount }}
				{@render backgroundBlock(blockSize)}
			{/each}
		</div>
	<header class="z-1">
		<div class="flex flex-col w-screen h-12 items-end z-1">
			<Button variant="outline" class="justify-center mt-auto mb-auto mr-1 z-1" onclick={toggleMode}>
				{#key mode}
					{#if mode.current == "dark"}
					<Sun class="z-1"/>
					{:else}
					<Moon class="z-1"/>
					{/if}
				{/key}
			</Button>
		</div>
	</header>

	<div class="z-1 mt-5">
		{@render children?.()}
	</div>
</div>
{/await}
