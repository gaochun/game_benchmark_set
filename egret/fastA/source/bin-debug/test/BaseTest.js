var BaseTest = (function (_super) {
    __extends(BaseTest, _super);
    function BaseTest() {
        _super.call(this);
        this._resourceConfigURL = "resource/default.res.json";
        this._loadingView = null;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=BaseTest,p=c.prototype;
    p.onAddToStage = function (event) {
        if (this._resourceConfigURL) {
            //设置加载进度界面
            //Config to load process interface
            this._loadingView = new LoadingUI();
            this.stage.addChild(this._loadingView);
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig(this._resourceConfigURL, "resource/");
        }
        else {
            this.init();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group: " + event.groupName + " has failed to load.");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this._loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this._loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.init();
        }
    };
    p.init = function () {
        egret.Ticker.getInstance().register(this.onAdvanceTime, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouch, this);
        //this.stage.addEventListener(egret.TouchEvent.ENTER_FRAME, this.onAdvancedTime, this);
    };
    p.onAdvanceTime = function (passedTime) {
        dragonBones.WorldClock.clock.advanceTime(passedTime * 0.001);
    };
    p.onTouch = function (event) {
    };
    return BaseTest;
}(egret.Sprite));
egret.registerClass(BaseTest,'BaseTest');
