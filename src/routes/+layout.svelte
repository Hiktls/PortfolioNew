<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import {ModeWatcher,toggleMode,mode} from "mode-watcher";
	import {Sun,Moon, Languages} from "lucide-svelte";
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import type { Attachment } from 'svelte/attachments';
	
	//i18n
	import "$lib/i18n";
    import {isLocaleLoaded} from "$lib/i18n";
	import {isLoading} from "svelte-i18n";


	let { children } = $props();

	let pageRes;
	let blockAmount = $state(0);
	let blockSize = 20;


	let nCols = $state(0);
	let nRows = $state(0);

	let pagePromise = new Promise((resolve,reject) => {
		pageRes = resolve;
	})


	let rowColStr = $state("")

	function generateRowCol(row:number,col:number) {
		return `grid-rows-${row} grid-cols-${col}`
	}


	onMount(() => {
		nCols = Math.floor(window.innerHeight / blockSize);
		nRows = Math.floor(window.innerWidth / blockSize);
		blockAmount = (window.innerHeight * window.innerWidth) / (blockSize * blockSize);
		pageRes!();

		rowColStr = generateRowCol(nRows,nCols);


		console.log("BLOCK SIZE",blockSize)
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


{#snippet backgroundBlock(size:number,id:number)}
    <div id="block-{id}" style="--anim-stat: var(--color-border);" 
		class="bg-background border-1 size-{(size/4).toString()} hover:border-white transition ease-linear duration-300 border-(--anim-stat)"></div>
{/snippet}
{#if $isLocaleLoaded || !$isLoading}
	{#await pagePromise}
		
	{:then val} 
		<div class="w-screen h-screen relative z-1">
				<div style="--row-count: repeat({nRows}, minmax(0, 1fr)); --col-count: repeat({nCols}, minmax(0, 1fr));" class="-z-1 overflow-hidden fixed w-screen h-screen grid grid-rows-(--col-count) grid-cols-(--row-count)">
					{#each {length: blockAmount },i}
						{@render backgroundBlock(blockSize,i)}
					{/each}
				</div>
			<header class="z-1 pt-1">
				<div class="flex flex-row justify-end gap-5 w-screen h-12 items-end z-1">
					<Button class="justify-center mt-auto mb-auto mr-1 z-1" variant="outline">
						Language <Languages class="z-1"/>
					</Button>
					<Button variant="outline" class="justify-center mt-auto mb-auto mr-1 z-1" onclick={toggleMode}>
						{#key mode}
							{#if mode.current == "dark"}
								Light<Sun class="z-1"/>
							{:else if mode.current =="light"}
								Dark <Moon class="z-1"/>
							{/if}
						{/key}
					</Button>
				</div>
			</header>

			<div class="z-1 mt-5 pointer-events-none ">
				{@render children?.()}
			</div> 
		</div> 
	{/await}
{:else}
<div class="text-6xl text-center m-auto">Seems we are loading the locale!</div>
{/if}