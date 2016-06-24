class PerformanceATest extends BaseTest {

    private _dragonBonesData: dragonBones.DragonBonesData = null;
    private _factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
    private _armatures: Array<any> = [];

    private _text: egret.TextField = new egret.TextField();

    public constructor() {
        super();

        this._resourceConfigURL = "resource/PerformanceTestAConfig.json";
    }

    protected init(): void {
        super.init();

        this.stage.dirtyRegionPolicy = "off";

        this._text.x = 0;
        this._text.wordWrap = false;
        this._text.textColor = 0xFF0000;
        this._text.textAlign = egret.HorizontalAlign.CENTER;
        
        this._text.width = this.stage.stageWidth;
        this._text.y = this.stage.stageHeight - 80;
        this.addChild(this._text);

        //
        this._dragonBonesData = dragonBones.DataParser.parseDragonBonesData(RES.getRes("dragonBonesData"));
        const textureDataA = RES.getRes("textureDataA");
        const textureA = RES.getRes("textureA");

        //
        this._factory.addDragonBonesData(this._dragonBonesData);
        this._factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(textureA, textureDataA));

        //
        for (let i = 0; i < 90; ++i) {
            this.addArmature();
        }

        this.resetPosition();
    }

    protected onAdvanceTime(passedTime: number): void {
        super.onAdvanceTime(passedTime);

        if (this._addArmature) {
            this.addArmature();
            this.addArmature();
            this.addArmature();
            this.addArmature();
            this.addArmature();
            this.resetPosition();
        }

        if (this._removeArmature) {
            this.removeArmature();
            this.removeArmature();
            this.removeArmature();
            this.removeArmature();
            this.removeArmature();
            this.resetPosition();
        }
    }

    private _addArmature: boolean = false;
    private _removeArmature: boolean = false;
    protected onTouch(event: egret.TouchEvent): void {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._addArmature = event.stageX > this.stage.stageWidth * 0.5;
                this._removeArmature = event.stageX < this.stage.stageWidth * 0.5;
                break;

            case egret.TouchEvent.TOUCH_END:
            case egret.TouchEvent.TOUCH_CANCEL:
                this._addArmature = false;
                this._removeArmature = false;
                break;
        }
    }

    private resetPosition(): void {
        const count = this._armatures.length;
        const paddingH = 50;
        const paddingV = 150;
        const columnNum = 5;
        const dX = (this.stage.stageWidth - paddingH * 2) / columnNum;
        const dY = (this.stage.stageHeight - paddingV * 2) / Math.ceil(count / columnNum);

        for (let i = 0, l = this._armatures.length; i < l; ++i) {
            const armature = this._armatures[i];
            const armatureDisplay = armature.display as egret.DisplayObjectContainer;
            const lineY = Math.floor(i / columnNum);
            armatureDisplay.x = (i % columnNum) * dX + paddingH;
            armatureDisplay.y = lineY * dY + paddingV;
        }
    }

    private addArmature(): void {
        const armature = this._factory.buildFastArmature(this._dragonBonesData.armatureDataList[0].name);
        const armatureDisplay = armature.display as egret.DisplayObjectContainer;
        armatureDisplay.scaleX = armatureDisplay.scaleY = 0.8;

        armature.enableAnimationCache(24);
        armature.animation.gotoAndPlay(armature.animation.animationList[1], 0, 0, 0);
        dragonBones.WorldClock.clock.add(armature);

        this.addChild(armatureDisplay);
        this._armatures.push(armature);

        this.updateText();
    }

    private removeArmature(): void {
        if (this._armatures.length == 0) {
            return;
        }

        const armature = this._armatures.pop();
        const armatureDisplay = armature.display as egret.DisplayObjectContainer;
        dragonBones.WorldClock.clock.remove(armature);
        this.removeChild(armatureDisplay);

        this.updateText();
    }

    private updateText(): void {
        this._text.text = "数量: " + this._armatures.length + " \n点击屏幕 左侧减少/右侧增加 数量";
    }
}