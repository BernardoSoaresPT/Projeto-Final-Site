<script>
  import { onMount } from "svelte";
  import { Generator } from "./generators.js";
  import BongoCat from "./images/BongoCat.png";
  import Confeti from "./images/Confeti.gif";
  import BackGround from "./images/Background.jpg"
  let energy = 10;
  let upgradeAmount=0;
  let clickPower = 1;
  let clickPowerCost = 2;
  // Generator (Name,cost,cost multiplier,output)
  let generators = [
    new Generator("Butter Cat", 10, 5, 5,0),
    new Generator("Spining Cat", 20, 10, 10,0),
    new Generator("Test Cat", 30, 15, 15,0),
    new Generator("Derp Cat", 40, 40, 20,0),
  ];
  onMount(() => {
    const generate = setInterval(() => {
      generators.forEach((generator) => {
        energy += generator.generate();
      });
    }, 1000);
    return () => {
      clearInterval(generate);
    };
  });
  function buyGenerator(index) {
   generators[index].n++; 
    energy -= generators[index].cost + generators[index].costMultiplyer*generators[index].n;
  }
  function click() {
    energy += clickPower;
  }
  function upgradeClickPower(){
    clickPower+=2;
    upgradeAmount++;
    energy -= clickPowerCost;
    clickPowerCost = upgradeAmount*2+1;
  }
</script>

<main class="h-screen flex flex-col items-stretch">
  <div class="bg-cyan-400 h-32 flex items-center justify-center">
    <h1 class="text-4xl text-clip">You have {energy}$!</h1>
  </div>
  <div class="bg-black h-full  flex flex-col items-stretch md:flex-row ">
    <div class="bg-sky-800 bg-[url({Confeti})] basis-1/3 flex items-center justify-center">
            
      <div>
        <img
          src={BongoCat}
          alt="BongoCat"
          class="h-full mx-auto py-2 "
          on:mousedown={click}
        />
      </div>
    </div>
    <div class="basis-2/3">
      <div class="bg-[url({BackGround})] rounded-md border-4 border-indigo-500 h-full"> 
      <div class="bg-yellow-300 flex items-center justify-center">
        <h1 class="text-xl">Generators</h1>
      </div>
      <button disabled={clickPowerCost>energy}
        on:click={()=>upgradeClickPower()}
        class="bg-zinc-300 px-4 py-2 rounded-md m-1"> 
        <p>Upgrade Click Power</p>
        <p>
          Cost: {clickPowerCost}
        </p>
      </button>
      {#each generators as generator, i}
        <div class="inline">
          <button
            disabled={generator.cost +
              (generator.costMultiplyer * (generator.n + 1)) >
              energy}
            on:click={() => buyGenerator(i)}
            class="bg-zinc-300 px-4 py-2 rounded-md m-1"
          >
            <p>{generator.name}s: {generator.n}</p>
            <p class="text-clip">
              Cost: {generator.cost +
                (generator.costMultiplyer * (generator.n + 1))}
            </p>
          </button>
        </div>
      {/each}
      <div><p class="text-2xl text-sky-800">Click the cat to get money and waste it on upgrades for more money!!!!</p></div>
    </div>
    </div>
</main>

<style>
</style>
