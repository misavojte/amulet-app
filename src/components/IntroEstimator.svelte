<script lang="ts">
  export let timeText: string;
  export let questionText: string;
</script>

<div class="wrap">
  <div class="item">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      class="bi bi-clock"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
      />
      <path
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
      />
    </svg>
    <div class="number">
      {timeText}
    </div>
    <div class="descriptor">odhadovaný čas na vyplnění</div>
  </div>
  <div class="divider" />
  <div class="item">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      class="bi bi-clipboard2-pulse"
      viewBox="0 0 16 16"
    >
      <path
        d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"
      />
      <path
        d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"
      />
      <path
        d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128z"
      />
    </svg>
    <div class="number">
      {questionText}
    </div>
    <div class="descriptor">počet kompozic obrázků</div>
  </div>
</div>

<style>
  .wrap {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 1rem;
    align-items: center;
  }

  .number {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .descriptor {
    font-size: 0.75rem;
  }

  .divider {
    width: 1px;
    height: 200px;
    background: #ccc;
  }
</style>
