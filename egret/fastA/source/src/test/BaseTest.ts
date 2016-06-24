class BaseTest extends egret.Sprite {

    protected _resourceConfigURL: string = "resource/default.res.json";

    private _loadingView: LoadingUI = null;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        if (this._resourceConfigURL) {
            //设置加载进度界面
            //Config to load process interface
            this._loadingView = new LoadingUI();
            this.stage.addChild(this._loadingView);

            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig(this._resourceConfigURL, "resource/");
        } else {
            this.init();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group: " + event.groupName + " has failed to load.");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this._loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this._loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

            this.init();
        }
    }

    protected init(): void {
        egret.Ticker.getInstance().register(this.onAdvanceTime, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouch, this);
        //this.stage.addEventListener(egret.TouchEvent.ENTER_FRAME, this.onAdvancedTime, this);
    }

    protected onAdvanceTime(passedTime: number): void {
        dragonBones.WorldClock.clock.advanceTime(passedTime * 0.001);
    }

    protected onTouch(event:egret.TouchEvent): void {
    }
}