<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import {ModeWatcher,toggleMode,mode} from "mode-watcher";
	import {Sun,Moon} from "lucide-svelte";
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from "$lib/components/ui/separator/separator.svelte";
	let { children } = $props();
export const prerender = true;
</script>

<ModeWatcher/>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

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

{@render children?.()}


<footer>
	<Separator/>
</footer>
