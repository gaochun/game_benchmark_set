var PerformanceBTest = (function (_super) {
    __extends(PerformanceBTest, _super);
    function PerformanceBTest() {
        _super.call(this);
        this._dragonBonesData = null;
        this._factory = new dragonBones.EgretFactory();
        this._armatures = [];
        this._text = new egret.TextField();
        this._addArmature = false;
        this._removeArmature = false;
        this._resourceConfigURL = "resource/PerformanceTestBConfig.json";
    }
    var d = __define,c=PerformanceBTest,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
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
        var textureDataA = RES.getRes("textureDataA");
        var textureA = RES.getRes("textureA");
        //
        this._factory.addDragonBonesData(this._dragonBonesData);
        this._factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(textureA, textureDataA));
        //
        for (var i = 0; i < 400; ++i) {
            this.addArmature();
        }
        this.resetPosition();
    };
    p.onAdvanceTime = function (passedTime) {
        _super.prototype.onAdvanceTime.call(this, passedTime);
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
    };
    p.onTouch = function (event) {
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
    };
    p.resetPosition = function () {
        var count = this._armatures.length;
        var paddingH = 50;
        var paddingV = 100;
        var columnNum = 5;
        var dX = (this.stage.stageWidth - paddingH * 2) / columnNum;
        var dY = (this.stage.stageHeight - paddingV * 2) / Math.ceil(count / columnNum);
        for (var i = 0, l = this._armatures.length; i < l; ++i) {
            var armature = this._armatures[i];
            var armatureDisplay = armature.display;
            var lineY = Math.floor(i / columnNum);
            armatureDisplay.x = (i % columnNum) * dX + paddingH;
            armatureDisplay.y = lineY * dY + paddingV;
        }
    };
    p.addArmature = function () {
        var armature = this._factory.buildFastArmature(this._dragonBonesData.armatureDataList[0].name);
        var armatureDisplay = armature.display;
        armatureDisplay.scaleX = armatureDisplay.scaleY = 0.7;
        armature.animation.timeScale = 0.7;
        armature.enableAnimationCache(24);
        armature.animation.gotoAndPlay(armature.animation.animationList[0], 0, 0, 0);
        dragonBones.WorldClock.clock.add(armature);
        this.addChild(armatureDisplay);
        this._armatures.push(armature);
        this.updateText();
    };
    p.removeArmature = function () {
        if (this._armatures.length == 0) {
            return;
        }
        var armature = this._armatures.pop();
        var armatureDisplay = armature.display;
        dragonBones.WorldClock.clock.remove(armature);
        this.removeChild(armatureDisplay);
        this.updateText();
    };
    p.updateText = function () {
        this._text.text = "数量: " + this._armatures.length + " \n点击屏幕 右侧增加 / 左侧减少";
    };
    return PerformanceBTest;
}(BaseTest));
egret.registerClass(PerformanceBTest,'PerformanceBTest');
