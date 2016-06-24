class SingleTest extends BaseTest {

    private _dragonBonesData: dragonBones.DragonBonesData = null;
    private _factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
    private _armature: dragonBones.Armature = null;
    //private _armature: dragonBones.FastArmature = null;

    public constructor() {
        super();

        this._resourceConfigURL = "resource/SingleTestConfig.json";
    }

    protected init(): void {
        super.init();

        //
        this._dragonBonesData = dragonBones.DataParser.parseDragonBonesData(RES.getRes("dragonBonesData"));
        const textureDataA = RES.getRes("textureDataA");
        const textureA = RES.getRes("textureA");

        //
        this._factory.addSkeletonData(this._dragonBonesData);
        this._factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(textureA, textureDataA));

        //
        this._armature = this._factory.buildArmature(this._dragonBonesData.armatureDataList[0].name);
        //this._armature = this._factory.buildFastArmature(this._dragonBonesData.armatureDataList[0].name);
        //this._armature.enableAnimationCache(30);

        const armatureDisplay = this._armature.display as egret.DisplayObjectContainer;
        armatureDisplay.x = 240;
        armatureDisplay.y = 600;
        armatureDisplay.scaleX = 1;
        armatureDisplay.scaleY = 1;
        this.addChild(armatureDisplay);

        this._armature.animation.gotoAndPlay(this._armature.animation.animationList[0]);
        dragonBones.WorldClock.clock.add(this._armature);
    }

    private _animationIndex: number = 0;
    protected onTouch(event: egret.TouchEvent): void {
        this._animationIndex++;
        if (this._animationIndex >= this._armature.animation.animationList.length) {
            this._animationIndex = 0;
        }

        const animationName: string = this._armature.animation.animationList[this._animationIndex];
        //this._armature.animation.gotoAndPlay(animationName, -1, -1, 0);
        this._armature.animation.gotoAndPlay(animationName);
    }
}