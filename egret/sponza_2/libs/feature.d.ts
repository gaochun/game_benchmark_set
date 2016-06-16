declare module egret3d {
    class FeatureConfig {
        static EnableCameraAnim: boolean;
        static EnableAxisMesh: boolean;
        static AxisMeshSize: number;
        constructor();
    }
}
declare module egret3d {
    class LogoUI extends Object3D {
        private bird;
        private bg;
        private particle;
        private logoMaterial;
        private gradients;
        private startPos;
        private endPos;
        private color;
        private offsetY;
        private birdSize;
        private halfSize;
        private font1;
        private font2;
        private font3;
        constructor(logoTexture: ITexture, ptcTexture: ITexture, bgTexture: ITexture, fonts: Array<ITexture>);
        private initBird(texture);
        private initBg(texture);
        private initParticle(texture);
        private initFonts(textures);
        updateProgress(progress: number): void;
        private updateChar(progress);
    }
}
declare module egret3d {
    class LoadingUI extends Object3D {
        private textDiv;
        private lastProgress;
        private lastFps;
        private logoUI;
        private logoLoader;
        private starLoader;
        private bgLoader;
        private fontLoaders;
        private _count;
        constructor();
        private onFontLoaded(e);
        private onLoaded(e);
        private checkImageComplete();
        updateProgress(visible: boolean, progress: number): void;
        updateText(value: number): void;
    }
}
declare module egret3d {
    class AxisMesh extends Object3D {
        private _lineX;
        private _lineY;
        private _lineZ;
        private _boxX;
        private _boxY;
        private _boxZ;
        private _xMat;
        private _yMat;
        private _zMat;
        constructor(axisSize?: number);
    }
}
declare module egret3d {
    class FPSCounter {
        fps: number;
        private _recordDateList;
        private _tempCount;
        private _tempNow;
        private _tempStart;
        private _calcCounter;
        private static MAX_COUNT;
        constructor();
        update(): void;
    }
}
declare module egret3d {
    class EgretCameraZoomController {
        private _view;
        private _camera;
        private _animations;
        private _currentIndex;
        constructor(view: View3D);
        addCameraAnims(animations: Array<CameraAnimationController>): void;
        private onCameraAnimComplete(e);
        private nextAnimation();
    }
}
declare module egret3d {
    class Shake {
        private _currentIndex;
        private _view;
        private cMethod;
        private transform;
        constructor(mesh: Mesh, view: View3D);
        update(delta: number): void;
    }
}
declare module egret3d {
    class EgretWorld {
        private _view;
        private _cameraCtl;
        private _cameraZoomer;
        private _shaker;
        private _sceneLoader;
        private _egret3DCanvas;
        private _loadingUI;
        private _sceneLoaded;
        private _lastProgress;
        private _fps;
        private _startTime;
        private _lastTime;
        private _sceneName;
        private static _instance;
        static getInstance(): EgretWorld;
        constructor();
        private onLoadingUIComplete(e);
        loadScene(value: string): void;
        private initCanvas();
        private initView();
        private onWindowsResize(e);
        private initCamera();
        private onSceneLoaded(e);
        private updateFrameData();
        private update(e);
    }
}
