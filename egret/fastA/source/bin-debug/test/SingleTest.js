var SingleTest = (function (_super) {
    __extends(SingleTest, _super);
    //private _armature: dragonBones.FastArmature = null;
    function SingleTest() {
        _super.call(this);
        this._dragonBonesData = null;
        this._factory = new dragonBones.EgretFactory();
        this._armature = null;
        this._animationIndex = 0;
        this._resourceConfigURL = "resource/SingleTestConfig.json";
    }
    var d = __define,c=SingleTest,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        //
        this._dragonBonesData = dragonBones.DataParser.parseDragonBonesData(RES.getRes("dragonBonesData"));
        var textureDataA = RES.getRes("textureDataA");
        var textureA = RES.getRes("textureA");
        //
        this._factory.addSkeletonData(this._dragonBonesData);
        this._factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(textureA, textureDataA));
        //
        this._armature = this._factory.buildArmature(this._dragonBonesData.armatureDataList[0].name);
        //this._armature = this._factory.buildFastArmature(this._dragonBonesData.armatureDataList[0].name);
        //this._armature.enableAnimationCache(30);
        var armatureDisplay = this._armature.display;
        armatureDisplay.x = 240;
        armatureDisplay.y = 600;
        armatureDisplay.scaleX = 1;
        armatureDisplay.scaleY = 1;
        this.addChild(armatureDisplay);
        this._armature.animation.gotoAndPlay(this._armature.animation.animationList[0]);
        dragonBones.WorldClock.clock.add(this._armature);
    };
    p.onTouch = function (event) {
        this._animationIndex++;
        if (this._animationIndex >= this._armature.animation.animationList.length) {
            this._animationIndex = 0;
        }
        var animationName = this._armature.animation.animationList[this._animationIndex];
        //this._armature.animation.gotoAndPlay(animationName, -1, -1, 0);
        this._armature.animation.gotoAndPlay(animationName);
    };
    return SingleTest;
}(BaseTest));
egret.registerClass(SingleTest,'SingleTest');
