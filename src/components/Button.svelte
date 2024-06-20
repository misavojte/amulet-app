<script lang="ts">
  export let text: string;
  export let size: "big" | "small" = "big";
  export let type: "button" | "submit" = "button";
  export let disabled: boolean = false;
</script>

<button on:click class={size} {type} {disabled}>
  <slot />
  {text}
</button>

<style>
  button {
    padding: 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .big {
    background-color: #ff5722;
    color: white;
  }

  .small {
    background-color: #f1f1f1;
    color: #333;
  }
</style>
