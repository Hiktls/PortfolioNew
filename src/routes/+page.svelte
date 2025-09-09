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
    import hetzImg from "$lib/assets/Hetzner.svg";
    import solidityImg from "$lib/assets/Solidity.svg";
    //END ICON IMPORTS

    import {Button,buttonVariants} from '$lib/components/ui/button/index';
    import { ArrowDown,Ellipsis,ChevronRight, LogOut, Mail, Linkedin, LinkedinIcon, GithubIcon, FileIcon, MailIcon, LoaderCircle, Check, Cross, X, Minus } from 'lucide-svelte';
    import * as Drawer from "$lib/components/ui/drawer/index";


    //i18n
    import {_,locale,time,date,number} from 'svelte-i18n';
    import {escapeHtml} from "$lib/i18n";
	import { scale } from 'svelte/transition';

    
    // NOTE:
    // USE FASTAPI FOR INPUT. Add a fake function that will receive input without printing it, and it will write to an env value. RECEIVE THE ENV KEY TOO
    // USE SVELTE FOR FAKE FRONTEND THAT WILL SEND THIS INPUT.
    // USE LINUX TO EXPOSE THE KEY USED ACCIDENTALLY
    // USE RUST FOR ENCRYPTING THE PLAINTEXT, PUT UP ENV FOR ENCRYPTED VALUE
    // USE PYTHON TO SHOWCASE THE ENCRPYTED VALUE
    // USE DOCKER TO RUN PYTHON AND DOCKER SEQUENCE
    // USE JAVASCRIPT FOR FORGOTTEN CONSOLE.LOG LEAKING THE KEY
    // USE HETZNER FOR FAKE HOSTING
    //

    hljs.registerLanguage('python', python);
    hljs.registerLanguage('javascript', js);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('dockerfile', docker);
    hljs.registerLanguage('xml', htmlType);
    hljs.registerLanguage('bash', bash);
    // ["a software developer","a linux enthusiast","a homecook","a backend developer","your future coworker","a language learning fan","a curious pentester"];
    const TITLES = [$_("main.titles.option1"),$_("main.titles.option2"),$_("main.titles.option3"),$_("main.titles.option4"),$_("main.titles.option5"),$_("main.titles.option6"),$_("main.titles.option7"),$_("main.titles.option8"),$_("main.titles.option9"),$_("main.titles.option10")];
    let title = $state(TITLES[0]);
    


    // CHALLENGE VARS according to order

    // let ranStatus = $state({
    //     "hetzner": false,
    //     "linux":false,
    //     "svelte":false,
    //     "fast":false,
    //     "docker":false
    // });
    
    type Dict = { [key: string]: boolean };
    let ranStatus = $state({
    } as Dict);

    ranStatus["hetzner"] = false;
    ranStatus["linux"] = false;
    ranStatus["linux"] = false;
    ranStatus["linux"] = false;
    ranStatus["docker"] = false;



    let buttonTurn = $state(false);

    setInterval(() => {
        title = TITLES[Math.floor(Math.random() * TITLES.length)]
    },4000)
    
    let svelteStart = `<sc` + `ript>`;
    let svelteEnd = `</sc` + `ript>`;

    let samples = {
        fastApi:
`from typing import Union
from fastapi import FastAP
import docker

client = docker.from_env()

app = FastAPI()

@app.get("/encrypt")
def encrypt_message(msg: str, key: str) -> str:
    cont = client.containers.run("hiktls/encryptor",detach=True, 
        environment=["MESSAGE="+msg,"KEY="+key])
    key = cont.logs().decode("utf-8").strip()
    return key

`,
        svelte:
`${svelteStart}
    import type {PageProps} from './$types';
    
    import {validate} from "$lib/validate.ts";

    let value = $bindable("");



    let { data }: PageProps = $props();

    let encrpyted = $state("");

    function encryptText(){
        fetch("http://localhost:8000/encrypt?msg="+value+"&key="+data.key).then(res => {validate(res.text(),data.key);encrypted = res.text()});
    }
${svelteEnd}

<input bind:value={value} placeholder="Enter your message!"> </input>
<button onclick={encryptText}>Encrypt!</button>

`,
        rust:
`use std::env;
use chacha20poly1305::aead::generic_array::typenum::Unsigned;
use chacha20poly1305::aead::generic_array::GenericArray;
use chacha20poly1305::aead::{Aead, AeadCore, KeyInit, OsRng};
use chacha20poly1305::ChaCha20Poly1305;


pub fn encrypt(cleartext: &str, key: &[u8]) -> Vec<u8> {
    let cipher = ChaCha20Poly1305::new(GenericArray::from_slice(key));
    let nonce = ChaCha20Poly1305::generate_nonce(&mut OsRng);
    let mut obsf = cipher.encrypt(&nonce, cleartext.as_bytes()).unwrap();
    obsf.splice(..0, nonce.iter().copied());
    obsf
}


fn main() {
    let key = env::var("KEY").expect("KEY not found!");
    let message = env::var("MESSAGE").expect("MESSAGE not found!");
    
    let encrypted = encrypt(message, key.as_bytes());

    unsafe {
        env::set_var("ENCRYPTED", hex::encode(encrypted));
    }
}
`,
        linux:
`
$ cat /etc/motd
Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-144-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
 *** REMINDER: DO NOT RUN APPS ON DEV MODE ON PROD!!! ***

$ screen -d -m fastapi dev $FASTAPI_LOC/src/main.py
$ sleep 5 && echo "DONE!!!"
DONE!!!
$ screen -d -m yarn run dev
`,
        python:
`import os

os.environ.pop("MESSAGE",None)
os.environ.pop("KEY",None)

print(os.getenv("ENCRYPTED"))

`,
    docker:
`# -------------------------
# Stage 1: Build Rust binary
# -------------------------
FROM rust:1.81 as builder

WORKDIR /app

COPY rust/ ./rust/

WORKDIR /app/rust

RUN cargo build --release

# -------------------------
# Stage 2: Runtime
# -------------------------
FROM python:3.12-slim

WORKDIR /app

COPY script.py .

COPY --from=builder /app/rust-program/target/release/rust ./rust

RUN chmod +x ./rust


# Default command: run both
CMD ["sh", "-c", "./rust && python script.py"]
`,
    javascript:
`// validation.ts

export function validate(input: string,key:string) {
    console.log("Validating input:", input); // REMOVE ON PROD!!!
    console.log("Encryption key:",key); // REMOVE ON PROD!!!
    
    if (input.length === 0) {
        throw new Error("Input cannot be empty!");
    }

    if (key.length < 8){
        throw new Error("Key length is insufficient!");
    }
    return input;
}

`,
    hetzner:
`# Starting server.....
$ ./start.sh    
<=========================> 100% 1.5s
$ docker exec -it 23 /bin/bash

Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-144-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
 *** REMINDER: DO NOT RUN APPS ON DEV MODE ON PROD!!! ***
root@user-23-unnamed-server:~$ 
`

};
    
    

    const AVAILABLE_FOR_WORK = 2; // 0: Not available, 1: Potentially available, 2: Open for all

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
    <span class="text-primary drop-shadow-primary drop-shadow-2xl font-semibold mb-20 mt-40 will-change-contents lg:text-6xl text-4xl" out:typewriter|global={{speed:2,delay:0}} in:typewriter|global={{speed:1,delay:1}} >{title}</span>
{/snippet}


<div class="md:h-screen w-screen bg-no-repeat font-sansation mt-60">
    <div class="w-225 h-50 m-auto mb-20 font-sansation">
        <span class="">
            <span class=" will-change-contents lg:text-6xl text-4xl">{$_("main.title", {values:{name: "Kaan"}})}</span>
            {#key title}{@render titleText()}{/key}
        </span>
    </div>
        
        
        
        <div class="m-auto w-60 h-80">
            <Button class="w-40 h-10 lg:text-lg pointer-events-auto" onclick={() => window.location.href="#about"}><ArrowDown size={4}/> {$_("main.scroll_butt")}</Button>
        </div>

        <div id="about" class="w-screen ">

            {#snippet logoCard(src:string,alt:string,description:string,sample:string)}
            {@const highlighted = hljs.highlightAuto(sample).value}
            <Drawer.Root>
                <Drawer.Trigger>
                    <div class="md:size-40 w-45 transition ease-in-out hover:scale-110 hover:rotate-20">
                        {#if alt != "solidity"}
                            <div class="block absolute rounded-2xl md:size-10"> {#if ranStatus[alt]} <Check class="bg-green-600 rounded-3xl size-10"/>{:else} <Minus class="rounded-3xl bg-input size-10"/> {/if}</div>
                        {/if}
                        <div id={alt} class=" m-auto rounded-2xl border-muted-foreground border-2 md:size-40 flex justify-center select-none "> <img class=" animate-none size-20 m-auto" src={src} alt={alt}/> </div>
                    </div>
                </Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>{alt.toUpperCase()}</Drawer.Title>
                    </Drawer.Header>
                    <div class=" overflow-hidden pointer-events-auto">
                        <p class="ml-5 md:text-2xl">{description}</p>
                        {#if alt != "hetzner"}
                        <Button></Button> {() => {// TODO: DO ME!!! FIX MEEE!!!!!
                        }}
                        <div class=" bg-[#27272a] md:w-250 ml-5 mt-2 pt-2 md:h-100 overflow-y-scroll pl-2 pb-2 rounded-lg border-1 border-muted-foreground text-white">
                            <code class="whitespace-pre-wrap md:text-lg pointer-events-auto overflow-y-scroll">
                                {@html highlighted}
                            </code>
                        </div>
                        {:else}
                            <Button class=" md:text-xl ml-2" onclick={() => { ranStatus["hetzner"] = true;buttonTurn = true;setTimeout(() => buttonTurn = false,1500)}}> {#if buttonTurn} Starting <LoaderCircle class="animate-spin"/> {:else} Start Server {/if}</Button>
                            
                            <div class=" bg-[#27272a] md:w-250 ml-5 mt-2 pt-2 md:h-100 overflow-y-scroll pl-2 pb-2 rounded-lg border-1 border-muted-foreground text-white">
                                <code class="whitespace-pre-wrap md:text-lg pointer-events-auto overflow-y-scroll">
                                    {#if ranStatus["hetzner"] && !buttonTurn}
                                        {sample}
                                    {/if}
                                </code>
                            </div>
                        {/if}

                    </div>
                    <Drawer.Footer>
                        <Drawer.Close class={buttonVariants({ variant: "outline" })}>{$_("main.drawer.exit")}</Drawer.Close>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.Root>
            {/snippet}

            <h1 class=" font-sansation font-bold text-4xl text-center mb-5">{$_("main.featuring.title")}</h1>
            <div class=" pointer-events-auto lg:w-250 h-200 overflow-hidden grid grid-cols-3 grid-rows-3 m-auto gap-20 p-5 bg-accent/60 mb-10 rounded-3xl">
                {@render logoCard(fastImg,"fastapi",$_("main.featuring.fastapi"),samples.fastApi)}
                {@render logoCard(svelteImg,"svelte",$_("main.featuring.svelte"),samples.svelte)}
                {@render logoCard(linuxImg,"linux",$_("main.featuring.linux"),samples.linux)}
                {@render logoCard(rustImg,"rust",$_("main.featuring.rust"),samples.rust)}
                {@render logoCard(pythonimg,"python",$_("main.featuring.python"),samples.python)}
                {@render logoCard(dockerImg,"docker",$_("main.featuring.docker"),samples.docker)}
                {@render logoCard(jsImg,"javascript",$_("main.featuring.javascript"),samples.javascript)}
                {@render logoCard(hetzImg,"hetzner",$_("main.featuring.hetzner"),samples.hetzner)}
                {@render logoCard(solidityImg,"solidity",$_("main.featuring.solidity"),samples.fastApi)}
            </div>

            <div>
                <h1 class="md:text-5xl text-center font-bold">{@html $_("main.current.title")}</h1>
                
                <div class="grid grid-cols-2 m-auto justify-items-center-safe ml-10 mt-10 md:h-150 pointer-events-auto">
                    <div class="md:w-200 md:h-100 bg-muted rounded-2xl space-x-10 p-5 pt-0">
                        <h1 class="mt-2 mb-2 text-3xl text-center font-semibold">{$_("main.current.current.title")}</h1>
                        <h2 class="text-2xl font-bellota-text"> {$_("main.current.current.body")}</h2>
                        <h3 class="text-2xl mt-5  font-bellota-text">{$_("main.current.current.offer_label")}: <span class="font-sansation">{@html AVAILABLE_FOR_WORK == 2 ? $_("main.current.current.available") : AVAILABLE_FOR_WORK == 1 ? $_("main.current.current.maybe") : $_("main.current.current.not_available")}</span></h3>
                    </div>


                    <div class="bg-muted rounded-2xl md:w-100 md:h-100">
                        <h1 class="text-3xl text-center font-semibold mt-2"> {$_("main.contact.title")}</h1>
                        <h2 class="text-2xl ml-5 mt-10 mb-5"> Kaan Ozdamar </h2>
                        <div class="flex-col flex gap-5">
                            <Button variant="link" class="text-2xl mr-auto ml-5"><LinkedinIcon class="size-6"/> LinkedIn</Button>
                            <Button variant="link" class="text-2xl mr-auto ml-5"><GithubIcon class="size-6"/> Github</Button>
                            <Button variant="link" class="text-2xl mr-auto ml-5"><FileIcon class="size-6"/> My CV</Button>
                            <Button variant="link" class="text-2xl mr-auto ml-5"><MailIcon class="size-6"/> Email Me!</Button>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
</div>

