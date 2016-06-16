//场景目录名
var SceneName = "Sponza";
var audioManager;
var bgSound;
window.addEventListener("click", egretMouseClickAndPlay);
window.addEventListener("touchstart", egretMouseClickAndPlay);
function startScene() {
    egret3d.EgretWorld.getInstance().loadScene(SceneName);
    playSound();
}
function egretMouseClickAndPlay(e) {
    window.removeEventListener("click", egretMouseClickAndPlay);
    window.removeEventListener("touchstart", egretMouseClickAndPlay);
    playSound();
}
function playSound() {
    audioManager = egret3d.AudioManager.instance;
    if (audioManager && audioManager.hasAudio()) {
        bgSound = audioManager.createSound("./resource/music/bg.mp3", onSoundComplete);
    }
    function onSoundComplete() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var options = { "volume": 0.8, "loop": true };
        var result = audioManager.playSound(bgSound, options);
        if (result) {
            window.removeEventListener("click", egretMouseClickAndPlay);
            window.removeEventListener("touchstart", egretMouseClickAndPlay);
        }
    }
}
function onMyTsconfig() {
}
window.onload = function () {
    startScene();
};
//# sourceMappingURL=scene_release.js.map