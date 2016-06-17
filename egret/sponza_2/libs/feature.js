var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    var FeatureConfig = (function () {
        function FeatureConfig() {
        }
        //是否播放相机动画
        FeatureConfig.EnableCameraAnim = true;
        //是否用坐标轴显示点光源位置
        FeatureConfig.EnableAxisMesh = false;
        //坐标轴尺寸
        FeatureConfig.AxisMeshSize = 6;
        return FeatureConfig;
    }());
    egret3d.FeatureConfig = FeatureConfig;
})(egret3d || (egret3d = {}));
var egret3d;
(function (egret3d) {
    var LogoUI = (function (_super) {
        __extends(LogoUI, _super);
        function LogoUI(logoTexture, ptcTexture, bgTexture, fonts) {
            _super.call(this);
            this.startPos = new egret3d.Vector3D();
            this.endPos = new egret3d.Vector3D();
            this.color = new egret3d.Color(0.1, 0.1, 0.1, 1);
            this.offsetY = 15;
            this.birdSize = 20;
            this.halfSize = this.birdSize / 2;
            this.initBird(logoTexture);
            this.initBg(bgTexture);
            this.initParticle(ptcTexture);
            this.initFonts(fonts);
            this.updateProgress(0.5);
            this.bg.z = 0.1;
            this.bird.z = 0;
            this.particle.z = -1;
        }
        LogoUI.prototype.initBird = function (texture) {
            this.logoMaterial = new egret3d.TextureMaterial(texture);
            this.logoMaterial.materialData.cutAlpha = 0;
            this.logoMaterial.bothside = true;
            this.logoMaterial.ambientColor = 0xffffff;
            this.logoMaterial.diffuseColor = 0xffffff;
            this.logoMaterial.specularColor = 0xffffff;
            this.logoMaterial.blendMode = egret3d.BlendMode.ALPHA;
            //
            this.gradients = new egret3d.ColorGradientsMethod();
            this.logoMaterial.diffusePass.addMethod(this.gradients);
            //
            this.bird = new egret3d.Mesh(new egret3d.PlaneGeometry(this.birdSize, this.birdSize, 1, 1, 1, 1, egret3d.Vector3D.Z_AXIS), this.logoMaterial);
            this.addChild(this.bird);
            this.bird.y = this.offsetY;
        };
        LogoUI.prototype.initBg = function (texture) {
            var bgMaterial = new egret3d.TextureMaterial(texture);
            bgMaterial.materialData.cutAlpha = 0;
            bgMaterial.bothside = true;
            bgMaterial.ambientColor = 0xffffff;
            bgMaterial.diffuseColor = 0xffffff;
            bgMaterial.specularColor = 0xffffff;
            bgMaterial.blendMode = egret3d.BlendMode.NORMAL;
            this.bg = new egret3d.Mesh(new egret3d.PlaneGeometry(this.birdSize * 8, this.birdSize * 4, 1, 1, 1, 1, egret3d.Vector3D.Z_AXIS), bgMaterial);
            this.addChild(this.bg);
            this.bg.y = this.offsetY;
        };
        LogoUI.prototype.initParticle = function (texture) {
            var geo = new egret3d.PlaneGeometry(8.0, 8.0, 1, 1, 1, 1, egret3d.Vector3D.Z_AXIS);
            var mat = new egret3d.TextureMaterial(texture);
            mat.materialData.cutAlpha = 0;
            mat.blendMode = egret3d.BlendMode.ADD;
            this.particle = new egret3d.ParticleEmitter(geo, mat, 800);
            this.particle.timeNode.rate = new egret3d.ConstValueShape();
            var lifeValue = new egret3d.ConstRandomValueShape();
            lifeValue.min = 0.4;
            lifeValue.max = 0.8;
            this.particle.timeNode.life = lifeValue;
            this.particle.timeNode.rate.value = 0.01;
            var posValue = new egret3d.Vec3ConstRandomValueShape();
            posValue.maxX = 6;
            posValue.minX = -6;
            posValue.maxY = posValue.minY = 0;
            posValue.maxZ = posValue.minZ = 0;
            this.particle.positionNode.positions = posValue;
            var vel = new egret3d.ParticleAccelerationSpeedNode();
            vel.speedShape = new egret3d.Vec3ConstRandomValueShape();
            vel.speedShape.minX = -1;
            vel.speedShape.minY = -10;
            vel.speedShape.minZ = 0;
            vel.speedShape.maxX = 1;
            vel.speedShape.maxY = -4;
            vel.speedShape.maxZ = 0;
            this.particle.addAnimNode(vel);
            this.particle.play();
            this.addChild(this.particle);
        };
        LogoUI.prototype.initFonts = function (textures) {
            this.font1 = [];
            this.font2 = [];
            this.font3 = [];
            for (var i = 0; i < 11; i++) {
                var geo = new egret3d.PlaneGeometry(5.0, 5.0, 1, 1, 1, 1, egret3d.Vector3D.Z_AXIS);
                var mat = new egret3d.TextureMaterial(textures[i]);
                mat.materialData.cutAlpha = 0;
                mat.ambientColor = 0xffffff;
                mat.diffuseColor = 0xffffff;
                mat.specularColor = 0xffffff;
                mat.blendMode = egret3d.BlendMode.ALPHA;
                var mesh1 = new egret3d.Mesh(geo, mat);
                this.font1.push(mesh1);
                var mesh2 = new egret3d.Mesh(geo, mat);
                this.font2.push(mesh2);
                var mesh3 = new egret3d.Mesh(geo, mat);
                this.font3.push(mesh3);
                mesh1.z = mesh2.z = mesh3.z = -2;
                mesh1.y = mesh2.y = mesh3.y = this.offsetY - this.birdSize / 2 - 12;
                mesh1.x = -4.0;
                mesh2.x = 0;
                mesh3.x = 5.0;
                this.addChild(mesh1);
                this.addChild(mesh2);
                this.addChild(mesh3);
            }
        };
        LogoUI.prototype.updateProgress = function (progress) {
            var halfRange = 0.3;
            this.particle.y = this.endPos.y = this.startPos.y = -this.halfSize + progress * this.birdSize + this.offsetY;
            this.startPos.y -= halfRange;
            this.endPos.y += halfRange;
            this.gradients.setStartData(this.startPos, this.endPos, this.color);
            this.updateChar(progress);
        };
        LogoUI.prototype.updateChar = function (progress) {
            progress *= 100;
            if (progress < 0)
                progress = 0;
            else if (progress > 99)
                progress = 99;
            progress = Math.floor(progress);
            var charProgress = progress + "";
            if (charProgress.length == 1)
                charProgress = "0" + charProgress;
            var char1 = charProgress.charAt(0);
            var char2 = charProgress.charAt(1);
            var char1Index = Number(char1);
            var char2Index = Number(char2);
            for (var i = 0; i < 11; i++) {
                this.font1[i].visible = char1Index == i;
                this.font2[i].visible = char2Index == i;
                this.font3[i].visible = false;
            }
            this.font3[10].visible = true;
        };
        return LogoUI;
    }(egret3d.Object3D));
    egret3d.LogoUI = LogoUI;
})(egret3d || (egret3d = {}));
var egret3d;
(function (egret3d) {
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            _super.call(this);
            this.lastProgress = -1;
            this.lastFps = 0;
            this._count = 0;
            this.textDiv = document.getElementById("canvas");
            var url;
            url = "./resource/loading/logo02.png";
            this.logoLoader = new egret3d.URLLoader(url);
            this.logoLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            url = "./resource/loading/star.png";
            this.starLoader = new egret3d.URLLoader(url);
            this.starLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            url = "./resource/loading/bg.png";
            this.bgLoader = new egret3d.URLLoader(url);
            this.bgLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            this.fontLoaders = [];
            for (var i = 0; i < 10; i++) {
                url = "./resource/loading/number/" + i + ".png";
                var loader = new egret3d.URLLoader(url);
                loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onFontLoaded, this);
                this.fontLoaders.push(loader);
            }
            url = "./resource/loading/number/a.png";
            var loader = new egret3d.URLLoader(url);
            loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onFontLoaded, this);
            this.fontLoaders.push(loader);
        }
        LoadingUI.prototype.onFontLoaded = function (e) {
            e.loader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onFontLoaded, this);
            this._count++;
            this.checkImageComplete();
        };
        LoadingUI.prototype.onLoaded = function (e) {
            e.loader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            this._count++;
            this.checkImageComplete();
        };
        LoadingUI.prototype.checkImageComplete = function () {
            if (this._count == 14) {
                var fontTextures = [];
                for (var i = 0; i < 11; i++) {
                    fontTextures.push(this.fontLoaders[i].data);
                }
                this.logoUI = new egret3d.LogoUI(this.logoLoader.data, this.starLoader.data, this.bgLoader.data, fontTextures);
                this.addChild(this.logoUI);
                var event = new egret3d.Event3D(egret3d.Event3D.COMPLETE);
                this.dispatchEvent(event);
            }
        };
        LoadingUI.prototype.updateProgress = function (visible, progress) {
            if (progress < this.lastProgress)
                return;
            if (progress < 0)
                progress = 0;
            else if (progress > 1)
                progress = 1;
            this.lastProgress = progress;
            if (visible) {
                this.logoUI.updateProgress(progress);
            }
            else {
            }
        };
        LoadingUI.prototype.updateText = function (value) {
            if (this.lastFps == value)
                return;
            this.lastFps = value;
            // this.textDiv.innerHTML = "Egret3D " + value + "fps";
	    console.log("Egret3D " + value + "fps");
        };
        return LoadingUI;
    }(egret3d.Object3D));
    egret3d.LoadingUI = LoadingUI;
})(egret3d || (egret3d = {}));
var egret3d;
(function (egret3d) {
    var AxisMesh = (function (_super) {
        __extends(AxisMesh, _super);
        function AxisMesh(axisSize) {
            if (axisSize === void 0) { axisSize = 100; }
            _super.call(this);
            this._xMat = new egret3d.ColorMaterial(0xff0000);
            this._xMat.ambientColor = 0xf0f0f0;
            this._yMat = new egret3d.ColorMaterial(0x00ff00);
            this._yMat.ambientColor = 0xf0f0f0;
            this._zMat = new egret3d.ColorMaterial(0x0000ff);
            this._zMat.ambientColor = 0xf0f0f0;
            var geom;
            var lineSize = axisSize / 100;
            geom = new egret3d.CubeGeometry(axisSize, lineSize, lineSize);
            this._lineX = new egret3d.Mesh(geom, this._xMat);
            this.addChild(this._lineX);
            geom = new egret3d.CubeGeometry(lineSize, axisSize, lineSize);
            this._lineY = new egret3d.Mesh(geom, this._yMat);
            this.addChild(this._lineY);
            geom = new egret3d.CubeGeometry(lineSize, lineSize, axisSize);
            this._lineZ = new egret3d.Mesh(geom, this._zMat);
            this.addChild(this._lineZ);
            var boxSize = axisSize / 25;
            var offset = (axisSize - boxSize) / 2;
            geom = new egret3d.CubeGeometry(boxSize, boxSize, boxSize);
            this._boxX = new egret3d.Mesh(geom, this._xMat);
            this._boxX.position = new egret3d.Vector3D(offset, 0, 0);
            this.addChild(this._boxX);
            this._boxY = new egret3d.Mesh(geom, this._yMat);
            this._boxY.position = new egret3d.Vector3D(0, offset, 0);
            this.addChild(this._boxY);
            this._boxZ = new egret3d.Mesh(geom, this._zMat);
            this._boxZ.position = new egret3d.Vector3D(0, 0, offset);
            this.addChild(this._boxZ);
        }
        return AxisMesh;
    }(egret3d.Object3D));
    egret3d.AxisMesh = AxisMesh;
})(egret3d || (egret3d = {}));
var egret3d;
(function (egret3d) {
    var FPSCounter = (function () {
        function FPSCounter() {
            this.fps = 0;
            this._tempCount = 0;
            this._calcCounter = 0;
            this._recordDateList = new Array();
        }
        FPSCounter.prototype.update = function () {
            this._tempNow = new Date();
            this._recordDateList.push(this._tempNow);
            //统计fps
            this._calcCounter++;
            if (this._calcCounter > 20) {
                this._calcCounter = 0;
                //移除超过总数量上限的date
                while (this._recordDateList.length > FPSCounter.MAX_COUNT) {
                    this._recordDateList.shift();
                }
                this._tempCount = this._recordDateList.length;
                this._tempStart = this._recordDateList[0];
                this.fps = (this._tempNow.getTime() - this._tempStart.getTime()) / 1000;
                this.fps = Math.floor(this._tempCount / this.fps);
            }
        };
        FPSCounter.MAX_COUNT = 60;
        return FPSCounter;
    }());
    egret3d.FPSCounter = FPSCounter;
})(egret3d || (egret3d = {}));
var egret3d;
(function (egret3d) {
    var EgretCameraZoomController = (function () {
        function EgretCameraZoomController(view) {
            this._currentIndex = -1;
            this._view = view;
            view.camera3D.addEventListener(egret3d.CameraAnimationController.EVENT_CAMERA_COMPLETE, this.onCameraAnimComplete, this);
        }
        EgretCameraZoomController.prototype.addCameraAnims = function (animations) {
            this._animations = animations;
            this._camera = this._view.camera3D;
            var anim;
            for (var _i = 0, _a = this._animations; _i < _a.length; _i++) {
                anim = _a[_i];
                this._camera.addAnimation(anim.name, anim);
            }
            this.nextAnimation();
        };
        EgretCameraZoomController.prototype.onCameraAnimComplete = function (e) {
            this.nextAnimation();
        };
        EgretCameraZoomController.prototype.nextAnimation = function () {
            this._currentIndex++;
            if (this._currentIndex >= this._animations.length) {
                this._currentIndex = 0;
            }
            var anim = this._animations[this._currentIndex];
            if (anim)
                this._camera.play(anim.name, false);
        };
        return EgretCameraZoomController;
    }());
    egret3d.EgretCameraZoomController = EgretCameraZoomController;
})(egret3d || (egret3d = {}));
var egret3d;
(function (egret3d) {
    var Shake = (function () {
        function Shake(mesh, view) {
            this._currentIndex = 0;
            this._view = view;
            this.cMethod = new egret3d.ColorTransformMethod();
            mesh.material.diffusePass.addMethod(this.cMethod);
            this.transform = this.cMethod.colorTransform;
        }
        Shake.prototype.update = function (delta) {
            this._currentIndex++;
            this.transform.vec4[0] = Math.cos(this._currentIndex / 30) / 2;
            this.transform.vec4[0] = 0.5 - Math.abs(this.transform.vec4[0]);
            this.cMethod.colorTransform = this.transform;
        };
        return Shake;
    }());
    egret3d.Shake = Shake;
})(egret3d || (egret3d = {}));
var egret3d;
(function (egret3d) {
    var EgretWorld = (function () {
        function EgretWorld() {
            this._sceneLoaded = false;
            this._lastProgress = -1;
            this._startTime = 0;
            this._lastTime = 0;
            this.initCanvas();
            this.initView();
            this.initCamera();
            this._sceneLoader = new egret3d.EgretMapLoader();
            this._fps = new egret3d.FPSCounter();
            //start
            this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
            this._loadingUI = new egret3d.LoadingUI();
            this._view.addChild3D(this._loadingUI);
            this._loadingUI.addEventListener(egret3d.Event3D.COMPLETE, this.onLoadingUIComplete, this);
        }
        EgretWorld.getInstance = function () {
            if (EgretWorld._instance == null) {
                EgretWorld._instance = new EgretWorld();
            }
            return EgretWorld._instance;
        };
        EgretWorld.prototype.onLoadingUIComplete = function (e) {
            this._loadingUI.removeEventListener(egret3d.Event3D.COMPLETE, this.onLoadingUIComplete, this);
            //加载场景
            this._loadingUI.updateProgress(true, 0);
            this._sceneLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneLoaded, this);
            this._sceneLoader.loadScene(this._sceneName);
        };
        EgretWorld.prototype.loadScene = function (value) {
            this._sceneLoaded = false;
            this._sceneName = value;
        };
        EgretWorld.prototype.initCanvas = function () {
            this._egret3DCanvas = new egret3d.Egret3DCanvas();
            this._egret3DCanvas.x = 0;
            this._egret3DCanvas.y = 0;
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;
            this._egret3DCanvas.start();
        };
        EgretWorld.prototype.initView = function () {
            var _this = this;
            this._view = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
            this._view.backColor = 0xff191919;
            this._egret3DCanvas.addView3D(this._view);
            window.addEventListener("resize", function (e) { return _this.onWindowsResize(e); }, true);
        };
        EgretWorld.prototype.onWindowsResize = function (e) {
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;
            this._view.width = window.innerWidth;
            this._view.height = window.innerHeight;
        };
        EgretWorld.prototype.initCamera = function () {
            this._cameraZoomer = new egret3d.EgretCameraZoomController(this._view);
            this._view.camera3D.y = 60;
            var target = new egret3d.Object3D();
            target.position = new egret3d.Vector3D(0, 15, 0);
            this._cameraCtl = new egret3d.LookAtController(this._view.camera3D, target);
            this._cameraCtl.distance = 100;
            this._cameraCtl.update();
        };
        EgretWorld.prototype.onSceneLoaded = function (e) {
            this._sceneLoader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneLoaded, this);
            if (egret3d.FeatureConfig.EnableAxisMesh) {
                var pointLight;
                for (var _i = 0, _a = this._sceneLoader.parser.lightDatas; _i < _a.length; _i++) {
                    pointLight = _a[_i];
                    if (pointLight.type != egret3d.LightType.pointlight)
                        continue;
                    var axis = new egret3d.AxisMesh(egret3d.FeatureConfig.AxisMeshSize);
                    axis.x = pointLight.posX;
                    axis.y = pointLight.posY;
                    axis.z = pointLight.posZ;
                    this._view.addChild3D(axis);
                }
            }
            this._view.addChild3D(this._sceneLoader.container);
            if (egret3d.FeatureConfig.EnableCameraAnim == false) {
                this._sceneLoader.container.scale = new egret3d.Vector3D(5, 5, 5);
            }
            this._loadingUI.updateProgress(false, 1.0);
            if (egret3d.FeatureConfig.EnableCameraAnim) {
                this._cameraZoomer.addCameraAnims(this._sceneLoader.cameraAnims);
            }
            var mesh = this._sceneLoader.container.getChildAt(0);
            this._shaker = new egret3d.Shake(mesh, this._view);
            this._sceneLoaded = true;
            this._view.removeChild3D(this._loadingUI);
        };
        EgretWorld.prototype.updateFrameData = function () {
            var time = new Date().getTime();
            if (this._startTime == 0) {
                time = 0;
                this._startTime = new Date().getTime();
            }
            else {
                this._lastTime = time;
                time = new Date().getTime() - this._startTime;
            }
            time /= 17;
            time /= 200;
            return time;
        };
        EgretWorld.prototype.update = function (e) {
            var delta = this.updateFrameData();
            if (this._sceneLoader.status == 1) {
                var progress = this._sceneLoader.calcProgress();
                if (this._lastProgress != progress) {
                    this._loadingUI.updateProgress(true, progress);
                    this._lastProgress = progress;
                }
            }
            else if (this._sceneLoader.status == 2) {
                this._fps.update();
                this._loadingUI.updateText(this._fps.fps);
                //this._shaker.update(delta);
                this._cameraCtl.update();
            }
        };
        return EgretWorld;
    }());
    egret3d.EgretWorld = EgretWorld;
})(egret3d || (egret3d = {}));
