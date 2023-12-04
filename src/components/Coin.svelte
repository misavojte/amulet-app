<div>
    <img src="coin.png" width="120" height="120" alt="coin" class="rotate" />
</div>

<style>
img {
    animation: spin 2s linear infinite;
}

div {
    animation: updown 1s ease-in-out infinite alternate
}

@keyframes spin {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
}

@keyframes updown {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-5px); }
}
    
</style>
