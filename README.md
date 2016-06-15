# Benchmark Set
Benchmark set for gaming optimization

========

### Usage of FPS counter ###

Display average FPS in last 10 seconds on console log

```javascript
window.stats = new Stats();
function animate() {
    requestAnimationFrame( animate );
    window.stats.update();
}

requestAnimationFrame( animate );
```