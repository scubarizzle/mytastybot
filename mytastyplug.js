SockJS.prototype.msg = function(a){this.send(JSON.stringify(a))};
Array.prototype.isArray = true;
var tastyPlugShutDown;
if (tastyPlugShutDown != undefined) tastyPlugShutDown();
(function(){
    var sock, afktime = Date.now(), mousett = false, cd = false, reconint = 2, pms = false, drag = false, version = '1.1.9.9', commands = {}, tos = {}, reconnect = true,
    twitchEmotesList={HDK:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png",width:"28px",height:"28px"},MiniK:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2868-src-5a7a81bb829e1a4c-28x28.png",width:"28px",height:"28px"},"4Head":{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-76292ac622b0fc38-20x30.png",width:"20px",height:"30px"},ArsonNoSexy:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e13a8382e40b19c7-18x27.png",width:"18px",height:"27px"},AsianGlow:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a3708d1e15c3f197-24x30.png",width:"24px",height:"30px"},AtGL:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9809-src-52738249ed340b6a-28x28.png",width:"28px",height:"28px"},AtIvy:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9800-src-b27b39cd614d1791-28x28.png",width:"28px",height:"28px"},AtWW:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9801-src-3d2087b69c5c5c6b-28x28.png",width:"28px",height:"28px"},BCWarrior:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1e3ccd969459f889-29x27.png",width:"29px",height:"27px"},BORT:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6f9fa95e9e3d6a69-19x30.png",width:"19px",height:"30px"},BatChest:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-df8ac34ab89d8c0c-18x28.png",width:"18px",height:"28px"},BibleThump:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png",width:"36px",height:"30px"},BigBrother:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-63c10b84aaddd77c-24x30.png",width:"24px",height:"30px"},BionicBunion:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-740242272832a108-30x30.png",width:"30px",height:"30px"},BlargNaut:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a5293e92212cadd9-21x27.png",width:"21px",height:"27px"},BloodTrail:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png",width:"41px",height:"28px"},BrainSlug:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d8eee0a259b7dfaa-30x30.png",width:"30px",height:"30px"},BrokeBack:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-4057-src-770e3d6c306dda14-28x28.png",width:"28px",height:"28px"},DAESuppy:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ef2a16bdc037bc91-28x28.png",width:"28px",height:"28px"},DBstyle:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1752876c0d0ec35f-21x30.png",width:"21px",height:"30px"},DansGame:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png",width:"25px",height:"32px"},DatSheffy:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-bf13a0595ecf649c-24x30.png",width:"24px",height:"30px"},DogFace:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d0134a612162a147-22x28.png",width:"22px",height:"28px"},EleGiggle:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-4339-src-07433e94eae8754e-28x28.png",width:"28px",height:"28px"},EvilFetus:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-484439fc20e0d36d-29x30.png",width:"29px",height:"30px"},FPSMarksman:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6c26a3f04616c4bf-20x27.png",width:"20px",height:"27px"},FUNgineer:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-731296fdc2d37bea-24x30.png",width:"24px",height:"30px"},FailFish:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c8a77ec0c49976d3-22x30.png",width:"22px",height:"30px"},FrankerZ:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3b96527b46b1c941-40x30.png",width:"40px",height:"30px"},FreakinStinkin:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d14278fea8fad146-19x27.png",width:"19px",height:"27px"},FuzzyOtterOO:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d141fc57f627432f-26x26.png",width:"26px",height:"26px"},GasJoker:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9802-src-6e8eaf7c9777fbf8-28x28.png",width:"28px",height:"28px"},GingerPower:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2febb829eae08b0a-21x27.png",width:"21px",height:"27px"},GrammarKing:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3632-src-c3bf1bef4de9bb99-28x28.png",width:"28px",height:"28px"},HassanChop:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-22c6299e539344a9-19x28.png",width:"19px",height:"28px"},HotPokket:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-55873089390f4a10-28x30.png",width:"28px",height:"30px"},ItsBoshyTime:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e8e0b0c4e70c4fb8-18x18.png",width:"18px",height:"18px"},JKanStyle:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a7ee1bc0e5c9af0-21x27.png",width:"21px",height:"27px"},Jebaited:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-39dff1bb9b42cf38-21x30.png",width:"21px",height:"30px"},JonCarnage:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6aaca644ea5374c6-20x27.png",width:"20px",height:"27px"},KAPOW:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9803-src-4b786d2bb9b6162a-28x28.png",width:"28px",height:"28px"},KZassault:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-5248-src-914192574ba9feec-28x28.png",width:"28px",height:"28px"},KZcover:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-5249-src-c649b1d10e887587-28x28.png",width:"28px",height:"28px"},KZguerilla:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-5250-src-da9dd1029955070e-28x28.png",width:"28px",height:"28px"},KZhelghast:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-5251-src-a1596431098da5d4-28x28.png",width:"28px",height:"28px"},KZowl:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-5252-src-437c1b59f74e39bc-28x28.png",width:"28px",height:"28px"},KZskull:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-5253-src-7358e7adaec32ecc-28x28.png",width:"28px",height:"28px"},Kappa:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png",width:"25px",height:"28px"},Keepo:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8eed21805f6217ce-27x29.png",width:"27px",height:"29px"},KevinTurtle:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d530ef454aa17093-21x27.png",width:"21px",height:"27px"},Kippa:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-56a84f0e87c3d3a5-24x28.png",width:"24px",height:"28px"},Kreygasm:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png",width:"19px",height:"27px"},MVGame:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a1a8bb5cdf6efb9-24x32.png",width:"24px",height:"32px"},MechaSupes:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9804-src-5b096e8d2ec67fbf-28x28.png",width:"28px",height:"28px"},MrDestructoid:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ac61a7aeb52a49d3-39x27.png",width:"39px",height:"27px"},NightBat:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9805-src-5346ae35c2a450e5-28x28.png",width:"28px",height:"28px"},NinjaTroll:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-89e474822a976928-19x27.png",width:"19px",height:"27px"},NoNoSpot:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-179f310b0746584d-23x27.png",width:"23px",height:"27px"},OMGScoots:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e01723a9ae4fbd8b-22x28.png",width:"22px",height:"28px"},OneHand:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b6d67569a0c6340a-20x27.png",width:"20px",height:"27px"},OpieOP:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-21e708123d6a896d-21x30.png",width:"21px",height:"30px"},OptimizePrime:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-41f8a86c4b15b5d8-22x27.png",width:"22px",height:"27px"},PJHarley:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9808-src-e9e3212e738f3370-28x28.png",width:"28px",height:"28px"},PJSalt:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png",width:"28px",height:"28px"},PMSTwin:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a33f6c484c27e249-23x30.png",width:"23px",height:"30px"},PanicVis:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3668-src-f36f5a70b1c93a29-28x28.png",width:"28px",height:"30px"},PazPazowitz:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-521420789e1e93ef-18x27.png",width:"18px",height:"27px"},PeoplesChamp:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3412-src-76b6e3c79b31b696-28x28.png",width:"28px",height:"28px"},PicoMause:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce027387c35fb601-22x27.png",width:"22px",height:"27px"},PipeHype:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-4240-src-d0c560fa27408dc7-28x28.png",width:"28px",height:"28px"},PogChamp:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-60aa1af305e32d49-23x30.png",width:"23px",height:"30px"},Poooound:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-61a08075ecef6afa-21x30.png",width:"21px",height:"30px"},PunchTrees:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b85003ffba04e03e-24x24.png",width:"24px",height:"24px"},RalpherZ:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3d9b59b17687288c-33x30.png",width:"33px",height:"30px"},RedCoat:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6b8d1be08f244e92-19x27.png",width:"19px",height:"27px"},ResidentSleeper:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png",width:"28px",height:"28px"},RitzMitz:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-4338-src-a741c02562405936-28x28.png",width:"28px",height:"28px"},RuleFive:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-4e65703c52fb67b5-20x30.png",width:"20px",height:"30px"},SMOrc:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f276ed33053ec70-32x32.png",width:"32px",height:"32px"},SMSkull:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-50b9867ba05d1ecc-24x24.png",width:"24px",height:"24px"},SSSsss:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png",width:"24px",height:"24px"},ShazBotstix:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ccaf06d02a01a804-24x30.png",width:"24px",height:"30px"},Shazam:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9807-src-4444736c1440cb77-28x28.png",width:"28px",height:"28px"},SoBayed:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-efca3da7a499ac81-24x30.png",width:"24px",height:"30px"},SoonerLater:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-696192d9891880af-23x30.png",width:"23px",height:"30px"},StrawBeary:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3dac9659e838fab2-20x27.png",width:"20px",height:"27px"},SuperVinlin:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-92a1b848540e9347-23x27.png",width:"23px",height:"27px"},SwiftRage:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png",width:"21px",height:"28px"},TF2John:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ffa884123ef70519-22x30.png",width:"22px",height:"30px"},TehFunrun:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a204e65775b969c5-27x27.png",width:"27px",height:"27px"},TheTarFu:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1fcfa48228bbd6ea-25x28.png",width:"25px",height:"28px"},TheThing:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-7427-src-f1278d0b66848536-28x28.png",width:"28px",height:"28px"},ThunBeast:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1bae8ebfe6209a0c-26x28.png",width:"26px",height:"28px"},TinyFace:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b93007bc230754e1-19x30.png",width:"19px",height:"30px"},TooSpicy:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f193772ca6e512f2-23x30.png",width:"23px",height:"30px"},TriHard:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6407e6947eb69e21-24x30.png",width:"24px",height:"30px"},UleetBackup:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5342e829290d1af0-17x27.png",width:"17px",height:"27px"},UnSane:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-4eea6f01e372a996-28x30.png",width:"28px",height:"30px"},UncleNox:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3666-src-19af357000ae2b42-28x28.png",width:"28px",height:"28px"},Volcania:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-efbcc231b2d2d206-27x28.png",width:"27px",height:"28px"},WTRuck:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f9ee1c9eb52375de-28x28.png",width:"28px",height:"28px"},WholeWheat:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-89a30a213fe46f49-20x30.png",width:"20px",height:"30px"},WinWaker:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d4e971f7a6830e95-30x30.png",width:"30px",height:"30px"},YouWHY:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-4337-src-abba134ff81d77c7-28x28.png",width:"28px",height:"28px"},aneleanele:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3792-src-1504dbbe3760173a-28x28.png",width:"28px",height:"28px"},noScope420:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-13084-src-d20453d53c23a780-28x28.png",width:"28px",height:"28px"},shazamicon:{url:"http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-9806-src-973c438f0fd31151-28x28.png",width:"28px",height:"28px"}},
    userfacesEmotesList={CeliFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/3.png",width:"30px",height:"35px"},FungFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/5.png",width:"25px",height:"35px"},RaptorFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/9.png",width:"29px",height:"35px"},UpSkirt:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/8.png",width:"31px",height:"35px"},EmsiFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/4.png",width:"25px",height:"35px"},ShereFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/15.png",width:"32px",height:"35px"},MuffinFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/10.png",width:"23px",height:"35px"},PandaFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/7.png",width:"30px",height:"35px"},SpekFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/13.png",width:"32px",height:"35px"},AeroFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/1.png",width:"26px",height:"35px"},StanFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/2.png",width:"29px",height:"35px"},AngryFungus:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/6.png",width:"28px",height:"35px"},MuffinSmile:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/11.png",width:"25px",height:"35px"},MuffinLean:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/12.png",width:"31px",height:"35px"},WubFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/14.png",width:"35px",height:"35px"},OmiFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/16.png",width:"25px",height:"35px"},FacePalm:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/17.png",width:"28px",height:"35px"},ShereStache:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/18.png",width:"25px",height:"35px"},CeliGlasses:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/19.png",width:"35px",height:"35px"},FlashFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/20.png",width:"28px",height:"35px"},SandyFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/21.png",width:"26px",height:"35px"},MuffinChin:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/22.png",width:"28px",height:"35px"},NashiTutu:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/23.png",width:"22px",height:"35px"},SchlurbiFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/24.png",width:"34px",height:"35px"},NashiFairy:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/25.png",width:"13px",height:"35px"},PuhzestFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/26.png",width:"24px",height:"35px"},MuzzyFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/27.png",width:"22px",height:"35px"},ShazzkaFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/28.png",width:"30px",height:"35px"},CloudFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/29.png",width:"27px",height:"35px"},MuffinWhat:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/30.png",width:"30px",height:"35px"},NitroFunFace:{url:"http://fungustime.pw/tastyplug/emotes/userfaces/31.png",width:"28px",height:"35px"}},
    tastycatEmotesList={ElectroCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/3.png",width:"35px",height:"35px"},DnbCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/1.png",width:"35px",height:"35px"},DubstepCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/9.png",width:"35px",height:"35px"},DrumstepCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/8.png",width:"35px",height:"35px"},HouseCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/2.png",width:"35px",height:"35px"},HardDanceCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/4.png",width:"35px",height:"35px"},TranceCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/7.png",width:"35px",height:"35px"},GlitchCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/5.png",width:"35px",height:"35px"},EdmCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/10.png",width:"35px",height:"35px"},NuDiscoCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/6.png",width:"35px",height:"35px"},MonsterCat:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/11.png",width:"35px",height:"35px"},TastyFace:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/12.png",width:"35px",height:"35px"},TastyKitten:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/13.png",width:"35px",height:"32px"},TastyBotFace:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/14.png",width:"35px",height:"32px"},TastyCatLogo:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/15.png",width:"35px",height:"35px"},MonstercatOld:{url:"http://fungustime.pw/tastyplug/emotes/tastycat/16.png",width:"26px",height:"35px"}},
    logosEmotesList={LiquicityLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/1.png",width:"40px",height:"35px"},ProximityLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/2.png",width:"26px",height:"35px"},UKFLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/3.png",width:"35px",height:"35px"},TrapCityLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/4.png",width:"67px",height:"35px"},InspectorLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/5.png",width:"60px",height:"35px"},TutTutLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/6.png",width:"72px",height:"35px"},MuzzyOld:{url:"http://fungustime.pw/tastyplug/emotes/logos/7.png",width:"35px",height:"35px"},MuzzyLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/8.png",width:"24px",height:"35px"},TristamLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/9.png",width:"51px",height:"35px"},Insan3Lik3Logo:{url:"http://fungustime.pw/tastyplug/emotes/logos/10.png",width:"35px",height:"35px"},PBNLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/11.png",width:"40px",height:"35px"},AlexanderPBN:{url:"http://fungustime.pw/tastyplug/emotes/logos/12.png",width:"29px",height:"35px"},MichaelPBN:{url:"http://fungustime.pw/tastyplug/emotes/logos/13.png",width:"27px",height:"35px"},FavrightFace:{url:"http://fungustime.pw/tastyplug/emotes/logos/14.png",width:"25px",height:"35px"},FavrightLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/15.png",width:"35px",height:"35px"},EphixaLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/16.png",width:"36px",height:"35px"},ModestepLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/17.png",width:"49px",height:"35px"},FijiWijiLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/18.png",width:"35px",height:"35px"},TeqqLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/19.png",width:"36px",height:"35px"},FijiWijiBag:{url:"http://fungustime.pw/tastyplug/emotes/logos/20.png",width:"31px",height:"35px"},SCNDLLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/21.png",width:"74px",height:"35px"},Deadmau5Logo:{url:"http://fungustime.pw/tastyplug/emotes/logos/22.png",width:"48px",height:"35px"},AstronautLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/23.png",width:"42px",height:"35px"},DroptekLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/24.png",width:"59px",height:"25px"},HellbergLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/25.png",width:"71px",height:"25px"},FeintLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/26.png",width:"56px",height:"15px"},SianLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/27.png",width:"74px",height:"34px"},VicetoneLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/28.png",width:"63px",height:"35px"},BrakenLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/29.png",width:"43px",height:"35px"},SouleroLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/30.png",width:"68px",height:"35px"},UKFDubstep:{url:"http://fungustime.pw/tastyplug/emotes/logos/31.png",width:"35px",height:"35px"},UKFDnb:{url:"http://fungustime.pw/tastyplug/emotes/logos/32.png",width:"35px",height:"35px"},TwoThirdsLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/33.png",width:"68px",height:"35px"},Au5Logo:{url:"http://fungustime.pw/tastyplug/emotes/logos/34.png",width:"72px",height:"30px"},KnifePartyLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/35.png",width:"36px",height:"35px"},P46Logo:{url:"http://fungustime.pw/tastyplug/emotes/logos/36.png",width:"71px",height:"21px"},GQLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/37.png",width:"74px",height:"25px"},DirectLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/38.png",width:"37px",height:"35px"},TelevisorLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/39.png",width:"73px",height:"33px"},PixlLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/40.png",width:"41px",height:"35px"},"7MDLogo":{url:"http://fungustime.pw/tastyplug/emotes/logos/41.png",width:"38px",height:"35px"},EminenceLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/42.png",width:"43px",height:"35px"},NoisestormLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/43.png",width:"60px",height:"35px"},RamesesBLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/44.png",width:"57px",height:"25px"},"Case&PointLogo":{url:"http://fungustime.pw/tastyplug/emotes/logos/45.png",width:"53px",height:"35px"},BustreLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/46.png",width:"64px",height:"15px"},HaywyreLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/47.png",width:"39px",height:"35px"},ChrisRamosLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/48.png",width:"61px",height:"35px"},SplitbreedLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/49.png",width:"73px",height:"13px"},DeutgenLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/50.png",width:"70px",height:"25px"},MetrikLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/51.png",width:"74px",height:"24px"},ThrottleLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/52.png",width:"75px",height:"28px"},MediksLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/53.png",width:"59px",height:"35px"},DraperLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/54.png",width:"73px",height:"18px"},AzediaLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/55.png",width:"36px",height:"35px"},TVDSLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/56.png",width:"77px",height:"18px"},MadukLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/57.png",width:"29px",height:"35px"},RezonateLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/58.png",width:"75px",height:"19px"},MitiSLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/59.png",width:"72px",height:"20px"},ProtostarLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/60.png",width:"74px",height:"16px"},NetskyLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/61.png",width:"74px",height:"17px"},FractalLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/62.png",width:"73px",height:"32px"},DayOneLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/63.png",width:"32px",height:"35px"},DotEXELogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/64.png",width:"63px",height:"35px"},ATBLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/65.png",width:"74px",height:"25px"},VirtualRiotLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/66.png",width:"53px",height:"35px"},RazihelLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/67.png",width:"66px",height:"35px"},StereotroniqueLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/68.png",width:"75px",height:"35px"},RogueLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/69.png",width:"31px",height:"35px"},Defqon1Logo:{url:"http://fungustime.pw/tastyplug/emotes/logos/70.png",width:"37px",height:"35px"},HospitalRecordsLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/71.png",width:"35px",height:"35px"},ArmadaLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/72.png",width:"35px",height:"35px"},DaftPunkThomas:{url:"http://fungustime.pw/tastyplug/emotes/logos/73.png",width:"32px",height:"35px"},DaftPunkGuy:{url:"http://fungustime.pw/tastyplug/emotes/logos/74.png",width:"28px",height:"35px"},TrivectaLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/75.png",width:"37px",height:"35px"},KrewellaLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/76.png",width:"72px",height:"15px"},HardwellLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/77.png",width:"74px",height:"15px"},SteveAokiLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/78.png",width:"75px",height:"30px"},ShazzkaLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/79.png",width:"75px",height:"31px"},AeroChordLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/80.png",width:"75px",height:"25px"},NitroFunLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/81.png",width:"51px",height:"35px"},StephenWalkingLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/82.png",width:"75px",height:"27px"},RootkitLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/83.png",width:"72px",height:"20px"},VandenLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/84.png",width:"74px",height:"16px"},StonebankLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/85.png",width:"75px",height:"32px"},AdriLogo:{url:"http://fungustime.pw/tastyplug/emotes/logos/86.png",width:"75px",height:"18px"}},
    miscEmotesList={HodorFace:{height:"35px",url:"http://fungustime.pw/tastyplug/emotes/misc/1.png",width:"26px"},SuchDoge:{height:"35px",url:"http://fungustime.pw/tastyplug/emotes/misc/2.png",width:"31px"},BabbyFace:{height:"35px",url:"http://fungustime.pw/tastyplug/emotes/misc/3.png",width:"25px"},BadJoke:{height:"35px",url:"http://fungustime.pw/tastyplug/emotes/misc/4.png",width:"35px"},WhiteDoge:{height:"32px",url:"http://fungustime.pw/tastyplug/emotes/misc/5.png",width:"35px"},AliMonkey:{height:"35px",url:"http://fungustime.pw/tastyplug/emotes/misc/6.png",width:"38px"},AliChimp:{height:"35px",url:"http://fungustime.pw/tastyplug/emotes/misc/7.png",width:"38px"},AliKong:{height:"35px",url:"http://fungustime.pw/tastyplug/emotes/misc/8.png",width:"29px"},BreathingIntensifies:{url:"http://fungustime.pw/tastyplug/emotes/misc/9.png",width:"35px",height:"35px"},GayWolverine:{url:"http://fungustime.pw/tastyplug/emotes/misc/10.png",width:"23px",height:"35px"},RageCage:{url:"http://fungustime.pw/tastyplug/emotes/misc/11.png",width:"23px",height:"35px"},SlothFace:{url:"http://fungustime.pw/tastyplug/emotes/misc/12.png",width:"35px",height:"35px"},BassCat:{url:"http://fungustime.pw/tastyplug/emotes/misc/13.png",width:"26px",height:"35px"},BassDropped:{url:"http://fungustime.pw/tastyplug/emotes/misc/14.png",width:"33px",height:"35px"},DropTheBass:{url:"http://fungustime.pw/tastyplug/emotes/misc/15.png",width:"40px",height:"35px"},RexFace:{url:"http://fungustime.pw/tastyplug/emotes/misc/16.png",width:"25px",height:"35px"},AwesomeFace:{url:"http://fungustime.pw/tastyplug/emotes/misc/17.png",width:"35px",height:"35px"},DickButt:{url:"http://fungustime.pw/tastyplug/emotes/misc/18.png",width:"28px",height:"35px"},TeemoRun:{url:"http://fungustime.pw/tastyplug/emotes/misc/19.png",width:"44px",height:"35px"}},
    settings = {
        show: true,
        autowoot: false,
        autojoin: false,
        chatmentions: false,
        joinnotifs: {toggle:false,ranks:false,friends:false,fans:false},
        joinmode: 1,
        msgs: [],
        afkalert: false,
        friend: {username:null,id:null},
        lastPM: null,
        uipos: {'top':'54px','left':'0'},
        boothalert: false,
        histalert: false,
        chatimgs: false,
        emotes: false,
        twitch: false,
        userfaces: false,
        tastycatemotes: false,
        logos: false,
        miscemotes: false
    };
    function socket() {
        sock = new SockJS('http://fungustime.pw:4957');
        sock.onopen = function() {
            reconint = 2;
            console.log('[TastyPlug v' + version + '] Connected to socket!');
            return sock.msg({z:'userjoin',a:API.getUser(),r:location.pathname});
        };
        sock.onmessage = function(data) {
            data = JSON.parse(data.data);
            switch (data.z) {
                case 'load':
                    $('#tp-antiAfk span.result').text(data.a.antiAfk?'on':'off');
                    $('#tp-antiAfkLimit span.result').text(data.a.antiAfkLimit);
                    $('#tp-lottery span.result').text(data.a.lottery?'on':'off');
                    $('#tp-lotTime span.result').text(60-new Date().getMinutes());
                    $('#tp-userCmds span.result').text(data.a.userCmds?'on':'off');
                    $('#tp-duels span.result').text(data.a.duels?'on':'off');
                    return console.log('[TastyPlug v' + version + '] Loaded TastyBot settings.');
                case 'settupdate':
                    if (typeof data.b == 'boolean') data.b = data.b ? 'on' : 'off';
                    else if (data.a == 'lottime') data.b = 60 - data.b;
                    return $('#tp-' + data.a + ' span.result').text(data.b);
                case 'cmderr':
                    return Chat('error', data.e);
                case 'afkwarning':
                    if (!settings.afkalert) return;
                    if (data.m) {
                        Chat('error', data.m);
                        chatSound();
                    }
                    else clearInterval(tos.afkalert);
                    if (data.n) tos.afkalert = setInterval(chatSound,4000);
                    return;
                case 'clientmsg':
                    return Chat('info', data.a);
                case 'pm':
                    if (API.getUser(data.user.id).relationship != 3) return;
                    settings.lastPM = data.user.username;
                    chatSound();
                    return ChatPM(data.user.username, data.m);
                case 'reload':
                    return commands.reset();
                default:
                    return console.log('[TastyPlug v' + version + '] Unknown socket command');
            }
        };
        sock.onclose = function() {
            console.log('[TastyPlug v' + version + '] Disconnected from socket!');
            tos.reconnect = setTimeout(function(){
                if (sock.readyState == 3) socket();
                if (reconint < 6) reconint++;
            },Math.pow(2,reconint)*1000);
        };
    }
    function startup() {
        loadSettings();
        loadUI();
        loadEvents();
        if (location.pathname != '/tastycat/') {
            $('#tp-roominfo').remove();
            $('#tp-afkalert').remove();
        } else {
            eta();
            tos.lottery = setInterval(function(){
                var lot = $('#tp-lotTime span.result'), num = +lot.text();
                --num;
                if (num < 0) num = 59;
                lot.text(num);
            },60000);
        }
        $('#chat-popout-button').hide();
        if (settings.autowoot) $('#woot').click();
        if (settings.autojoin) {
            afkCheck();
            if (!getLocked() && API.getWaitListPosition() == -1) API.djJoin();
        }
        socket();
        Chat('init', 'TastyPlug v' + version + ' now running!');
        //Chat('init', 'Hey guys! You may have noticed I\'ve added some custom emotes to TastyPlug. Big thanks to schlurbi for providing many of them! I will make a list of all the emotes soon. Thank you for your patience.');
        console.log('[TastyPlug v' + version + '] Now running.');
    }
    function loadSettings() {
        var a = JSON.parse(localStorage.getItem('tastyPlugSettings'));
        if (a) {
            var b = Object.keys(settings);
            for (var i = 0; i < b.length; i++) {
                if (a[b[i]] !== undefined) {
                    if (a[b[i]] !== null && a[b[i]].isArray && settings[b[i]] !== null && settings[b[i]].isArray) settings[b[i]] = a[b[i]];
                    else if (typeof settings[b[i]] == 'object' && settings[b[i]] !== null) {
                        var c = Object.keys(settings[b[i]]);
                        for (var j = 0; j < c.length; j++) {
                            if (a[b[i]][c[j]] !== undefined) settings[b[i]][c[j]] = a[b[i]][c[j]];
                        }
                    } else settings[b[i]] = a[b[i]];
                }
            }
        }
    }
    function loadUI() {
        $('head').append('<style type="text/css" id="tastyplug-css">#tastyplug-ui{-moz-user-select:none;-webkit-user-select:none;position:absolute;width:150px;border-radius:10px;background-color:#1C1F25;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#1C1F25),color-stop(1,#282D33));background-image:-o-linear-gradient(top,#1C1F25 0,#282D33 100%);background-image:-moz-linear-gradient(top,#1C1F25 0,#282D33 100%);background-image:-webkit-linear-gradient(top,#1C1F25 0,#282D33 100%);background-image:-ms-linear-gradient(top,#1C1F25 0,#282D33 100%);background-image:linear-gradient(to top,#1C1F25 0,#282D33 100%);z-index:9;padding-bottom:1.5px;color:#DDD}#tastyplug-ui a{color:inherit;text-decoration:none}.tastyplug-icon{position:relative;float:right}#tastyplug-ui .tp-toggle{color:#F04F30}#tastyplug-ui .tp-toggle.button-on{color:#1CC7ED}#tp-title{margin:0 15px;padding:3px 0;color:#A874FC;font-size:19px;cursor:pointer}.tp-mainbutton,.tp-secbutton{margin:0 15px;padding:2px 0 3px;font-size:15px;border-top:1px solid rgba(56,60,68,.85);cursor:pointer}.tp-highlight{background-color:rgba(168,116,252,.33)}.tp-secbutton{padding-left:8px}.tp-infobutt{margin:0 15px;padding:1px 0 2px;font-size:12px;border-top:1px solid rgba(56,60,68,.85);cursor:default}.tp-infobutt span{font-weight:700}.tp-infobutt .result{font-weight:400}#tastyplug-ui .icon-drag-handle{position:relative;float:right;top:3px;height:14px;width:14px;background-position:-183px -113px}#waitlist-button .eta{position:relative;top:33px;left:57px;font-size:10px}#chat-messages .tastyplug-pm .icon{top:-1px;left:-3px}#chat-pm-button{left:204px}#chat-messages .tastyplug-pm{border-left-style:solid;border-left-width:3px;border-color:#F59425;padding-left:25px}#chat-messages .tastyplug-pm .from{color:#F59425;font-weight:700}#user-lists .list.room .user .icon-meh{left:auto;right:8px;top:-1px}#chat-messages .id-50aeafd9d6e4a94f77473433 .icon{top:7px;left:6px;background-position:-145px -287px;width:18px;height:16px}#chat-messages .mention.id-50aeafd9d6e4a94f77473433 .icon{left:3px}.id-50aeafd9d6e4a94f77473433{background-color:#2D002D}#chat .emote:nth-child(2n+1).id-50aeafd9d6e4a94f77473433,#chat .mention:nth-child(2n+1).id-50aeafd9d6e4a94f77473433,#chat .message:nth-child(2n+1).id-50aeafd9d6e4a94f77473433{background-color:#240024}#chat .emote.id-50aeafd9d6e4a94f77473433 .text,#chat .mention.id-50aeafd9d6e4a94f77473433 .text,#chat .message.id-50aeafd9d6e4a94f77473433 .text{font-weight:700;color:#CFCFCF}#chat .emote.id-50aeafd9d6e4a94f77473433 .text{font-style:normal}.tp-info{border-left:3px solid #1CC7ED}#chat .update.tp-info .text{color:#1CC7ED}#chat .update.tp-info .text span{color:#EEE}.tp-error{border-left:3px solid red}#chat .update.tp-error .text{color:red}.tp-init{border-left:3px solid #D1D119}#chat .update.tp-init .text{color:#D1D119}.tp-join-admin{border-left:3px solid #1CC7ED}#chat .update.tp-join-admin .text{color:#1CC7ED}.tp-join-ba{border-left:3px solid #088C30}#chat .update.tp-join-ba .text{color:#088C30}.tp-join-host{border-left:3px solid #D1D119}#chat .update.tp-join-host .text{color:#D1D119}.tp-join-cohost{border-left:3px solid #F59425}#chat .update.tp-join-cohost .text{color:#F59425}.tp-join-staff{border-left:3px solid #C322E3}#chat .update.tp-join-staff .text{color:#C322E3}.tp-join-friend{border-left:3px solid #009CDD}#chat .update.tp-join-friend .text{color:#009CDD}.tp-join-fan{border-left:3px solid #1F5DFF}#chat .update.tp-join-fan .text{color:#1F5DFF}.tp-img.wide{width:280px;height:auto}.tp-img.high{height:350px;width:auto}.tp-img-delete{position:absolute;top:25px;left:8px;background-color:#F04F30;padding:0 3px;cursor:pointer}.tp-video-hide{height:0!important}.custom-emote{display:inline-block;vertical-align:top}</style>');
        $('body').append('<div id="tastyplug-ui"><div id="tp-title"> TastyPlug <img class="tastyplug-icon" src="http://fungustime.pw/tastyplug/tastyplug.png"></div><div class="tp-mainbutton tp-toggle button-on" id="tp-autowoot"><span>Autowoot</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-autojoin"><span>Autojoin</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-afkalert"><span>AFK Alert</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-stream"><span>Stream</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-boothalert"><span>Booth Alert</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-histalert"><span>History Alert</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-chatimgs"><span>Chat Images</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-emotes"><div class="icon icon-drag-handle"></div><span>Cust. Emotes</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-tastycatemotes"><span>Tastycat</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-logos"><span>Logos</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-twitch"><span>Twitch.tv</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-userfaces"><span>User Faces</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-miscemotes"><span>Misc. Emotes</span></div><a href="http://fungustime.pw/tastyplug/emotes" target="_blank"><div class="tp-secbutton tp-secemotes" id="tp-listemotes"><span>Emotes List</span></div></a><div class="tp-mainbutton tp-toggle button-on" id="tp-mentions"><div class="icon icon-drag-handle"></div><span>Chat Mentions</span></div><div class="tp-secbutton tp-secmention" id="tp-addmention"><span>Add</span></div><div class="tp-secbutton tp-secmention" id="tp-delmention"><span>Delete</span></div><div class="tp-secbutton tp-secmention" id="tp-listmention"><span>List</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-joinnotifs"><div class="icon icon-drag-handle"></div><span>Join Notifs.</span></div><div class="tp-secbutton tp-secjoin tp-toggle button-on" id="tp-joinranks"><span>Ranks</span></div><div class="tp-secbutton tp-secjoin tp-toggle button-on" id="tp-joinfriends"><span>Friends</span></div><div class="tp-secbutton tp-secjoin tp-toggle button-on" id="tp-joinfans"><span>Fans</span></div><div class="tp-mainbutton" id="tp-roominfo"><div class="icon icon-drag-handle"></div><span>Room Info</span></div><div class="tp-infobutt" id="tp-antiAfk"><span>AntiAFK: <span class="result">off</span></span></div><div class="tp-infobutt" id="tp-antiAfkLimit"><span>AFK Limit: <span class="result">0</span>m</span></div><div class="tp-infobutt" id="tp-lottery"><span>Lottery: <span class="result">off</span></span></div><div class="tp-infobutt" id="tp-lotTime"><span>Next Lottery: <span class="result">0</span>m</span></div><div class="tp-infobutt" id="tp-userCmds"><span>User Cmds.: <span class="result">off</span></span></div><div class="tp-infobutt" id="tp-duels"><span>Duels: <span class="result">off</span></span></div></div>');
        if (location.pathname == '/tastycat/') $('#waitlist-button').append('<span class="eta" >ETA: N/A</span>');
        $('#chat-header').append('<div id="chat-pm-button" class="chat-header-button"><i class="icon icon-ignore"></i></div>');
        if (!settings.autowoot) $('#tp-autowoot').removeClass('button-on');
        if (!settings.autojoin) $('#tp-autojoin').removeClass('button-on');
        if (!settings.afkalert) $('#tp-afkalert').removeClass('button-on');
        if (!getStream()) $('#tp-stream').removeClass('button-on');
        if (!settings.boothalert) $('#tp-boothalert').removeClass('button-on');
        if (!settings.histalert) $('#tp-histalert').removeClass('button-on');
        if (!settings.chatimgs) $('#tp-chatimgs').removeClass('button-on');
        if (!settings.emotes) $('#tp-emotes').removeClass('button-on');
        if (!settings.twitch) $('#tp-twitch').removeClass('button-on');
        if (!settings.userfaces) $('#tp-userfaces').removeClass('button-on');
        if (!settings.tastycatemotes) $('#tp-tastycatemotes').removeClass('button-on');
        if (!settings.logos) $('#tp-logos').removeClass('button-on');
        if (!settings.miscemotes) $('#tp-miscemotes').removeClass('button-on');
        if (!settings.chatmentions) $('#tp-mentions').removeClass('button-on');
        if (!settings.joinnotifs.toggle) $('#tp-joinnotifs').removeClass('button-on');
        if (!settings.joinnotifs.ranks) $('#tp-joinranks').removeClass('button-on');
        if (!settings.joinnotifs.friends) $('#tp-joinfriends').removeClass('button-on');
        if (!settings.joinnotifs.fans) $('#tp-joinfans').removeClass('button-on');
        if (!settings.show) {
            $('.tp-mainbutton').hide();
            $('#tastyplug-ui').css('padding-bottom','0');
        }
        if (API.getUser().permission < 2) $('#tp-histalert').remove();
        $('.tp-secbutton,.tp-infobutt').hide();
        $('#tastyplug-ui').css(settings.uipos);
    }
    function loadEvents() {
        _$context.on('chat:receive',chatHTML);
        _$context.on('settings:show',showSettings);
        API.on(API.CHAT,eventChat);
        API.on(API.USER_JOIN,eventJoin);
        API.on(API.FAN_JOIN,eventFaJoin);
        API.on(API.FRIEND_JOIN,eventFrJoin);
        API.on(API.WAIT_LIST_UPDATE,eventDjUpdate);
        API.on(API.DJ_ADVANCE,eventDjAdvance);
        API.on(API.CHAT_COMMAND,eventCommand);
        $(window).resize(resize);
        if (API.getUser().permission >= 2) {
            API.on(API.VOTE_UPDATE,refreshMehs);
            $('#users-button:not(.selected)').click(refreshMehs);
        }
        //make it draggable
        var dragopts = {
            distance:20,
            handle:'#tp-title',
            snap:'#playback-container',
            snapMode:'outer',
            containment:'#room',
            scroll:false,
            start:function(){
                drag = true
            },
            stop:function(e,ui){
                drag = false;
                settings.uipos = ui.position;
                saveSettings();
            }
        };
        if ($.ui == undefined) {
            $.getScript('http://fungustime.pw/jquery-ui-1.10.4.custom.min.js',function(){
                $('#tastyplug-ui').draggable(dragopts);
            });
         } else {
            $('#tastyplug-ui').draggable(dragopts);
        }
        //history check next song
        $('#next-media-title .bar-value').hover(
            function(){
                var a = false, b = API.getHistory(), c = API.getNextMedia().media.id;
                for (var i = 0; i < b.length; i++) if (b[i].media.id == c) {a = true; break;}
                var d = a ? "This song is on the history!" : "This song isn't on the history!";
                var e = a ? 'orange' : 'blue';
                _$context.trigger('tooltip:show',d,$(this),false,false,e);
            },
            function(){
                _$context.trigger('tooltip:show','',$(this),false);
                _$context.trigger('tooltip:hide');
            }
        );
        //song tooltip
        $('#now-playing-media').hover(
            function(){
                _$context.trigger('tooltip:show', API.getMedia().author + ' - ' + API.getMedia().title, $('#now-playing-dj .dark-label'),false);
                mousett = true;
            },function(){
                _$context.trigger('tooltip:hide');
                mousett = false;
            }
        );
        //quick reply to pm
        $('#chat-messages').on('click','.pm-from', function(){
            if ($('#chat-input-field').val()) return;
            var a = '/pm @' + $(this).text();
            $('#chat-input-field').val(a);
            $('#chat-input-field').focus();
        });
        //pm button
        $('#chat-pm-button i').click(function(){
            pms = !pms;
            $('#chat-pm-button i').attr('class',(pms ? 'icon icon-unignore' : 'icon icon-ignore'));
            $('#chat-messages').children().not('.tastyplug-pm').toggle();
            $('#chat-messages').scrollTop(20000);
        });
        $('#chat-pm-button i').hover(
            function(){
                _$context.trigger('tooltip:show','Only shows PMs received with TastyPlug',$(this),true);
            },function(){
                _$context.trigger('tooltip:hide');
            }
        );
        //highlight ui buttons
        $('.tp-mainbutton,.tp-secbutton,.tp-infobutt').hover(
            function(){$(this).addClass('tp-highlight')},
            function(){$(this).removeClass('tp-highlight')}
        );
        //tp title
        $('#tp-title').mouseup(function(){
            if (!drag) {
                settings.show = !settings.show;
                if (!settings.show) {
                    $('#tastyplug-ui').css('padding-bottom','0');
                    $('.tp-mainbutton').css('border-top','0');
                    $('.tp-secbutton').css('border-top','0');
                }
                $('#tastyplug-ui .tp-mainbutton').slideToggle(function(){
                    if (settings.show) {
                        $('#tastyplug-ui').css('padding-bottom','');
                        $('.tp-mainbutton').css('border-top','');
                        $('.tp-secbutton').css('border-top','');
                    }
                });
                $('.tp-secbutton,.tp-infobutt').slideUp();
                saveSettings();
            }
        });
        //tp autowoot
        $('#tp-autowoot').click(function(){
            settings.autowoot = !settings.autowoot;
            $(this).toggleClass('button-on');
            if (settings.autowoot) $('#woot').click();
            saveSettings();
        });
        //autojoin
        $('#tp-autojoin').click(function(){
            settings.autojoin = !settings.autojoin;
            $(this).toggleClass('button-on');
            if (settings.autojoin && !getLocked() && API.getWaitListPosition() == -1) API.djJoin();
            afkCheck();
            saveSettings();
        });
        //afk alert
        $('#tp-afkalert').click(function(){
            settings.afkalert = !settings.afkalert;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //stream
        $('#tp-stream').click(function(){
            toggleStream();
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //booth alert
        $('#tp-boothalert').click(function(){
            settings.boothalert = !settings.boothalert;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //history alert
        $('#tp-histalert').click(function(){
            settings.histalert = !settings.histalert;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //chat images
        $('#tp-chatimgs').click(function(){
            settings.chatimgs = !settings.chatimgs;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //custom emotes
        $('#tp-emotes span').click(function(){
            settings.emotes = !settings.emotes;
            $(this).parent().toggleClass('button-on');
            saveSettings();
        });
        $('#tp-tastycatemotes').click(function(){
            settings.tastycatemotes = !settings.tastycatemotes;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-logos').click(function(){
            settings.logos = !settings.logos;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-twitch').click(function(){
            settings.twitch = !settings.twitch;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-userfaces').click(function(){
            settings.userfaces = !settings.userfaces;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-miscemotes').click(function(){
            settings.miscemotes = !settings.miscemotes;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-emotes .icon-drag-handle').click(function(){
            $('.tp-secemotes').slideToggle();
        });
        //chat mentions
        $('#tp-mentions span').click(function(){
            settings.chatmentions = !settings.chatmentions;
            $(this).parent().toggleClass('button-on');
            saveSettings();
        });
        $('#tp-addmention').click(function(){
            var len = settings.msgs.length;
            var a = prompt('Add words to the chat mentions list! Separate them with a comma.').trim().split(',');
            if (!a) return Chat('error', 'Please enter at least one word!');
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i].trim().toLowerCase();
                if (a[i].length < 3) Chat('error', 'Did not add: ' + _.escape(a[i]) + ' (too short)');
                else if (settings.msgs.indexOf(a[i]) > -1) Chat('error', 'Did not add: ' + _.escape(a[i]) + ' (already on list)');
                else settings.msgs.push(a[i]);
            }
            if (settings.msgs.length > len) {
                Chat('info', 'Added word(s) to chat mentions list');
                saveSettings();
            }
        });
        $('#tp-delmention').click(function(){
            var a = prompt('Which word would you like to remove from the mentions list?');
            if (settings.msgs.indexOf(a) > -1) {
                settings.msgs.splice(settings.msgs.indexOf(a),1);
                Chat('info', 'Removed "' + _.escape(a) + '" from the chat mentions list');
                saveSettings();
            } else Chat('error', 'That word isn\'t in the mentions list!');
        });
        $('#tp-listmention').click(function(){
            var a = settings.msgs;
            for (var i = 0; i < a.length; i++) a[i] = _.escape(a[i]);
            if (a.length) return Chat('info', 'Chat mentions list:<br>' + a.join('<br>'));
            return Chat('error', 'You don\'t have anything in your chat mentions list!');
        });
        $('#tp-mentions .icon-drag-handle').click(function(){
            $('.tp-secmention').slideToggle();
        });
        //join notifs
        $('#tp-joinnotifs span').click(function(){
            settings.joinnotifs.toggle = !settings.joinnotifs.toggle;
            $(this).parent().toggleClass('button-on');
            saveSettings();
        });
        $('#tp-joinranks').click(function(){
            settings.joinnotifs.ranks = !settings.joinnotifs.ranks;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-joinfriends').click(function(){
            settings.joinnotifs.friends = !settings.joinnotifs.friends;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-joinfans').click(function(){
            settings.joinnotifs.fans = !settings.joinnotifs.fans;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-joinnotifs .icon-drag-handle').click(function(){
            $('.tp-secjoin').slideToggle();
        });
        //room info
        $('#tp-roominfo').click(function(){
            $('.tp-infobutt').slideToggle();
        });
    }
    tastyPlugShutDown = function() {
        _$context.off('chat:receive',chatHTML);
        _$context.off('settings:show',showSettings);
        API.off(API.CHAT,eventChat);
        API.off(API.USER_JOIN,eventJoin);
        API.off(API.FAN_JOIN,eventFaJoin);
        API.off(API.FRIEND_JOIN,eventFrJoin);
        API.off(API.WAIT_LIST_UPDATE,eventDjUpdate);
        API.off(API.DJ_ADVANCE,eventDjAdvance);
        API.off(API.CHAT_COMMAND,eventCommand);
        $(window).off('resize',resize);
        API.off(API.VOTE_UPDATE,refreshMehs);
        $('#users-button').off('click',refreshMehs);
        $('#next-media-title .bar-value').off('mouseenter mouseleave');
        $('#now-playing-media').off('mouseenter mouseleave');
        $('#chat-messages .pm-from').off('click');
        $('#chat-pm-button').remove();
        $('#waitlist-button').find('.eta').remove();
        $('#tastyplug-ui').remove();
        $('#tastyplug-css').remove();
        $('#chat-popout-button').show();
        reconnect = false;
        var a = Object.keys(tos);
        for (var i = 0; i < a.length; i++) clearInterval(tos[a[i]]);
        saveSettings();
        if (sock) sock.close();
        console.log('[TastyPlug v' + version + '] Shut down.');
    };
    function chatHTML(a) {
        var msg = $('#chat-messages').children().last();
        if (pms && !msg.hasClass('.tastyplug-pm')) msg.hide();
        if (a.type != 'message' && a.type != 'emote' && a.type != 'mention') return;
        msg.addClass('id-' + a.from.id);
        if (settings.emotes) {
            var txt = msg.find('.text');
            if (settings.twitch) twitchEmotes(txt);
            if (settings.userfaces) userfacesEmotes(txt);
            if (settings.tastycatemotes) tastycatEmotes(txt);
            if (settings.logos) logosEmotes(txt);
            if (settings.miscemotes) miscEmotes(txt);
        }
        if (settings.chatimgs && a.from.id != '50aeafd9d6e4a94f77473433') {
            var txt = msg.find('.text'), txts = txt.text().trim().split(' ');
            for (var i = 0; i < txts.length; i++) if (/^https?:\/\//.test(txts[i])) return checkImg(txts[i],txt);
        }
    }
    function eventChat(a) {
        if (a.fromID == API.getUser().id) {
            afktime = Date.now();
            clearInterval(tos.afkalert);
            if (API.getUser().status == 1) API.setStatus(0);
            if (!a.message.toLowerCase().indexOf('!afk')) API.setStatus(1);
        }
        if (!settings.chatmentions || a.fromID == API.getUser().id) return;
        var b = a.message.toLowerCase().split(' ');
        for (var i = 0; i < settings.msgs.length; i++) {
            if (b.indexOf(settings.msgs[i]) > -1) return chatSound();
        }
    }
    function eventJoin(user) {
        var rank = API.getUser(user.id).permission, a;
        if (!settings.joinnotifs.toggle || !rank || (!settings.joinnotifs.ranks && !settings.joinnotifs.friends && !settings.joinnotifs.fans) || !user.username) return;
        switch (rank) {
            case 10: a = 'admin'; break;
            case 8:  a = 'ba'; break;
            case 5:  a = 'host'; break;
            case 4:  a = 'cohost'; break;
            case 3:case 2:case 1: a = 'staff'; break;
            default: a = 'undefined';
        }
        return Chat('join-' + a, _.escape(user.username) + ' joined the room');
    }
    function eventFaJoin(user) {
        if (!settings.joinnotifs.toggle || user.permission || !settings.joinnotifs.fans) return;
        return Chat('join-fan', _.escape(user.username) + ' joined the room');
    }
    function eventFrJoin(user) {
        if (!settings.joinnotifs.toggle || user.permission || !settings.joinnotifs.friends) return;
        return Chat('join-friend', _.escape(user.username) + ' joined the room');
    }
    function eventDjUpdate() {
        if (settings.autojoin && !getLocked() && API.getWaitListPosition() == -1)
            API.djJoin();
    }
    function eventDjAdvance(a) {
        if (settings.autojoin && !getLocked() && API.getWaitListPosition() == -1) API.djJoin();
        if (settings.autowoot) setTimeout(function(){$('#woot').click()},1500);
        if (mousett) {
            _$context.trigger('tooltip:hide');
            _$context.trigger('tooltip:show', API.getMedia().author + ' - ' + API.getMedia().title, $('#now-playing-dj .dark-label'),false,false);
        }
        if (settings.boothalert && API.getWaitListPosition() == 2) {
            chatSound();
            Chat('info','It\'s almost your turn to DJ! Make sure to pick a song!');
        }
        if (settings.histalert && API.getUser().permission >= 2) {
            var hist = API.getHistory();
            for (var i = 0; i < hist.length; i++) {
                if (hist[i].media.id == a.media.id) {
                    chatSound();
                    Chat('error','This song is on the history! (played ' + (i + 1) + ' song' + (i == 0 ? '' : 's') + ' ago)');
                    break;
                }
            }
        }
    }
    function eventCommand(a) {
        var cmd = a.trim().substr(1).split(' ')[0].toLowerCase();
        if (cmd == 'afk' || cmd == 'away') API.setStatus(1);
        else if (cmd == 'work' || cmd == 'working') API.setStatus(2);
        else if (cmd == 'gaming' || cmd == 'game' || cmd == 'ingame') API.setStatus(3);
        var data = {
            fromID: API.getUser().id,
            from: API.getUser().username,
            message: a.trim(),
            room: location.pathname
        }, a;
        if (commands[cmd]) a = commands[cmd](data);
        else if (location.pathname == '/tastycat/' && sock.readyState == 1) {
            sock.msg({z:'command',a:data});
            a = true;
        }
        if (a) {
            cd = true;
            setTimeout(function(){cd = false},2000);
        }
    }
    function refreshMehs() {
        if ($('#users-button').hasClass('selected') && $('.button.room').hasClass('selected')) {
            $('#user-lists .list.room i.icon.icon-meh').remove();
            var users = $(API.getUsers()).filter(function(){return this.vote == -1 && !this.curated;});
            users.each(function(i){
                $('#user-lists .list.room .user span').filter(function(){return $(this).text() == users[i].username;}).parent().append('<i class="icon icon-meh"></i>');
            });
        }
    }
    commands.lock = function() {
        if (API.getUser().permission < 3) return;
        API.moderateLockWaitList(true);
    };
    commands.unlock = function() {
        if (API.getUser().permission < 3) return;
        API.moderateLockWaitList(false);
    };
    commands.cycle = function() {
        if (API.getUser().permission < 3) return;
        $('.cycle-toggle').click();
    };
    commands.ban = function(a) {
        if (API.getUser().permission < 3) return;
        var user = getUser(a.message.substr(a.message.indexOf('@')+1));
        if (!user) return Chat('error', 'User not found.');
        if (user.permission) return Chat('error', 'You shouldn\'t ban those with ranks!');
        API.moderateBanUser(user.id,0,-1);
    };
    commands.kick = function(a) {
        if (API.getUser().permission < 2) return;
        var msg = a.split(' '), user, dur;
        if (msg[msg.length-1] != 'day' && msg[msg.length-1] != 'hour') {
            user = getUser(a.message.substr(a.message.indexOf('@')+1));
            dur = 60;
        } else {
            user = getUser(msg.slice(1,msg.length-1).join(' ').substr(1));
            dur = msg[msg.length-1] == 'day' ? 1440 : 60;
        }
        if (!user) return Chat('error', 'User not found.');
        if (user.permission) return Chat('error', 'You shouldn\'t kick those with ranks!');
        API.moderateBanUser(user.id,0,dur);
    };
    commands.pm = function(a) {
        if (cd) return Chat('error', 'PMs have a 2 second slow-mode!');
        if (sock.readyState != 1) return Chat('error', 'Not connected to TastyPlug\'s server!');
        if (a.message.split(' ').length == 1) return Chat('info', 'Usage: /pm @user message<br>Sends a private message to the user if they are using Tastyplug and you are each other\'s fans');
        var str = a.message.split(' '), msg = str.slice(2).join(' '), user = getUser(str[1].substr(1));
        if (!user) return Chat('error', 'User not found.');
        if (user.id == API.getUser().id) return Chat('error', 'You can\'t PM yourself!');
        if (user.relationship != 3) return Chat('error', 'You can only private message a user if you are each other\'s fans!');
        if (!msg) return Chat('error', 'Please input a message to send!');
        sock.msg({z:'pm',m:msg,f:API.getUser(),t:user})
        ChatPM('To: ' + user.username,msg);
        return true;
    };
    commands.r = function(a) {
        if (settings.lastPM) eventCommand('/pm @' + settings.lastPM + ' ' + a.message.split(' ').slice(1).join(' '));
        else Chat('error', 'Nobody has PMed you yet!');
    };
    commands.stream = function() {
        toggleStream();
        $('#tp-stream').toggleClass('button-on');
        saveSettings();
    };
    commands.opcheck = function(a) {
        if (cd) return Chat('error', '/opcheck has a 2 second slow-mode!');
        if (location.pathname != '/tastycat/') return;
        if (sock.readyState != 1) return Chat('error', 'Not connected to TastyPlug\'s server!');
        sock.msg({z:'songcheck',id:API.getNextMedia().media.id,song:'Next on your playlist'});
        return true;
    };
    commands.reset = function() {
        Chat('init', 'Reloading...');
        setTimeout(function(){$.getScript('http://fungustime.pw/tastyplug/tastyplug.js')},1500);
    };
    commands.commands = function() {
        Chat('info', 'TastyBot commands: <a href="http://fungustime.pw/tastybot" target="_blank">Click Here</a>');
        Chat('info', 'TastyPlug commands: ' + Object.keys(commands).join(', '));
    };
    commands.whois = function(a) {
        var user = getUser(a.message.split(' ').slice(1).join(' ').substr(1)), rank;
        if (!user) return Chat('error','User not found.');
        switch (user.permission) {
            case 10: rank = 'plug.dj Admin'; break;
            case 8: rank = 'Brand Ambassador'; break;
            case 5: rank = 'Host'; break;
            case 4: rank = 'Co-Host'; break;
            case 3: rank = 'Manager'; break;
            case 2: rank = 'Bouncer'; break;
            case 1: rank = 'Resident DJ'; break;
            case 0: rank = 'User'; break;
            default: rank = 'Unknown';
        }
        Chat('info','Username: <span>' + user.username + '</span><br>ID: <span>' + user.id + '</span><br>Points: <span>' + (user.listenerPoints+user.djPoints+user.curatorPoints) +
            '</span><br>Fans: <span>' + user.fans + '</span><br>Rank: <span>' + rank + '</span><br>Relation: <span>' + (user.relationship ? (user.relationship > 1 ? 'Friend' : 'Fan') : 'None') + '</span>');
    };
    commands.link = function() {
        var b = API.getMedia(), str = '';
        if (b.format == '1') Chat('info', 'Current song: <a href="http://youtu.be/' + b.cid + '" target="_blank">Click Here</a>');
        else SC.get('/tracks/' + b.cid, function(c) {
            Chat('info', 'Current song: ' + (c.permalink_url ? ('<a href="' + c.permalink_url + '" target="_blank">Click Here') : 'Link not found'));
        });
    };
    function Chat(type, m) {
        var chat = $('#chat-messages'), a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
        chat.append('<div class="update tp-' + type + '"><span class="text">' + m + '</span></div>');
        if (a) chat.scrollTop(chat[0].scrollHeight);
        if (chat.children().length >= 512) chat.children().first().remove();
    }
    function ChatPM(user, msg) {
        var chat = $('#chat-messages'), a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28,
        c = !user.indexOf('To: ') ? '-to' : '-from clickable'
        d = $('#chat-timestamp-button .icon').attr('class').substr(21),
        e = d == 'off' ? 'none' : 'block',
        f = new Date().toTimeString().substr(0,5), j = false,
        k = !user.indexOf('To: ') ? ' message' : ' mention';
        if (d == '12') {
            var g = parseInt(f),
                h = g >= 12 ? 'pm' : 'am',
                i = g%12 == 0 ? '12' : g%12;
            f = i + f.substr(2) + h;
        }
        if (f.charAt(0) == '0') f = f.substr(1);
        msg = urlFix(_.escape(msg));
        if (!msg.indexOf('&#x2F;me')) { msg = msg.replace('&#x2F;me','<em>'); j = true; }
        else if (!msg.indexOf('&#x2F;em')) { msg = msg.replace('&#x2F;em','<em>'); j = true; }
        j = j ? '' : '&nbsp;';
        chat.append('<div class="tastyplug-pm' + k + '"><i class="icon icon-ignored"></i><div class="timestamp" style="display:' + e + '">' + f + '</div><span class="from pm' + c + '">' + user + ' </span><span class="text">' + j + msg + '</span></div>');
        if (a) chat.scrollTop(chat[0].scrollHeight);
        if (chat.children().length >= 512) chat.children().first().remove();
    }
    function eta() {
        tos.eta = setInterval(function(){
            var pos = API.getWaitListPosition(), str = 'ETA: ';
            str += pos == -1 ? 'N/A' : getTime(pos*1000*60*(25/6) + API.getTimeRemaining()*1000);
            $('#waitlist-button').find('.eta').text(str);
        },60000);
    }
    function resize() {
        var room = $('#room'), rpos = room.position(), rwidth = room.width(), rheight = room.height(),
            ui = $('#tastyplug-ui'), uipos = ui.position(), uiwidth = ui.width(), uiheight = ui.height(), a = Object.keys(rpos);
        for (var i = 0; i < a.length; i++) {
            if (uipos[a[i]] < rpos[a[i]]) {
                ui.css({i:rpos[a[i]]});
            }
        }
        if (uiwidth + uipos.left > rwidth) ui.css({'left':rwidth-uiwidth});
        if (uiheight + uipos.top > rheight) ui.css({'top':rheight-uiheight});
        settings.uipos = ui.position();
        saveSettings();
    }
    function getUser(a) {
        a = a.trim();
        var b = API.getUsers();
        for (var i = 0; i < b.length; i++) if (b[i].username == a) return b[i];
        return null;
    }
    function getTime(a) {
        a = Math.floor(a/60000);
        var minutes = (a-Math.floor(a/60)*60);
        var hours = (a-minutes)/60;
        var str = '';
        str += hours + 'h';
        str += minutes<10?'0':'';
        str += minutes;
        return str;
    }
    function urlFix(a) {
        if (a.indexOf('http') == -1) return a;
        a = a.split(' ');
        for (var i = 0; i < a.length; i++) if (!a[i].indexOf('http')) a[i] = '<a href="' + a[i] + '" target="_blank">' + a[i] + '</a>';
        return a.join(' ');
    }
    function afkCheck() {
        if (settings.autojoin) tos.afkInt = setInterval(function(){
            if (Date.now() - afktime >= 1000*60*10000000) {
                settings.autojoin = true;
                $('#tp-autojoin').removeClass('button-on');
                clearInterval(tos.afkInt);
            }
        },6E4);
        else clearInterval(tos.afkInt);
    }
    function toggleStream() {
        _$context.trigger('settings:show');
        $('#settings').hide();
        $('.item.s-av').click();
        _$context.trigger('settings:hide');
    }
    function getStream() {
        _$context.trigger('settings:show');
        $('#settings').hide();
        var a = $('.item.s-av').hasClass('selected');
        _$context.trigger('settings:hide');
        return a;
    }
    function checkImg(a,b) {
        var img = new Image();
        img.onload =  function() {
            img.className += 'tp-img';
            if (img.height > 350 && 280*img.height/img.width > 350) return;
            if (img.width > 280) img.className += ' wide';
            else if (img.height > 350) img.className += ' high';
            var c = b.html().replace('<a href="' + a + '" target="_blank">' + a + '</a>', '<br><a href="' + a + '" target="_blank">' + img.outerHTML + '</div></a>');
            b.parent().append('<div class="tp-img-delete" style="display:none">X</div>');
            b.parent().hover(
                function(){$(this).find('.tp-img-delete').css('display','block')},
                function(){$(this).find('.tp-img-delete').css('display','none')}
            );
            b.parent().find('.tp-img-delete').click(function(){
                var a = $(this).parent().find('img')[0].src;
                $(this).parent().find('br').remove();
                $(this).parent().find('img').parent().append(a).find('img').remove();
                $(this).remove();
            });
            var chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
            b.html(c);
            if (d) chat.scrollTop(chat[0].scrollHeight);
        };
        img.src = a;
    }
    function twitchEmotes(a) {
        var b = a.html(), chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
        for (var i in twitchEmotesList) {
            if (b.indexOf(i) > -1) b = b.replace(new RegExp(i,'g'),'<div class="custom-emote" title="' + i + '" style="background-image:url(' + twitchEmotesList[i].url + ');width:' + twitchEmotesList[i].width + ';height:' + twitchEmotesList[i].height + ';"></div>');
        }
        a.html(b);
        if (d) chat.scrollTop(chat[0].scrollHeight);
    }
    function userfacesEmotes(a) {
        var b = a.html(), chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
        for (var i in userfacesEmotesList) {
            if (b.indexOf(i) > -1) b = b.replace(new RegExp(i,'g'),'<div class="custom-emote" title="' + i + '" style="background-image:url(' + userfacesEmotesList[i].url + ');width:' + userfacesEmotesList[i].width + ';height:' + userfacesEmotesList[i].height + ';"></div>');
        }
        a.html(b);
        if (d) chat.scrollTop(chat[0].scrollHeight);
    }
    function tastycatEmotes(a) {
        var b = a.html(), chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
        for (var i in tastycatEmotesList) {
            if (b.indexOf(i) > -1) b = b.replace(new RegExp(i,'g'),'<div class="custom-emote" title="' + i + '" style="background-image:url(' + tastycatEmotesList[i].url + ');width:' + tastycatEmotesList[i].width + ';height:' + tastycatEmotesList[i].height + ';"></div>');
        }
        a.html(b);
        if (d) chat.scrollTop(chat[0].scrollHeight);
    }
    function logosEmotes(a) {
        var b = a.html(), chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
        for (var i in logosEmotesList) {
            if (b.indexOf(i) > -1) b = b.replace(new RegExp(i,'g'),'<div class="custom-emote" title="' + i + '" style="background-image:url(' + logosEmotesList[i].url + ');width:' + logosEmotesList[i].width + ';height:' + logosEmotesList[i].height + ';"></div>');
        }
        a.html(b);
        if (d) chat.scrollTop(chat[0].scrollHeight);
    }
    function miscEmotes(a) {
        var b = a.html(), chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
        for (var i in miscEmotesList) {
            if (b.indexOf(i) > -1) b = b.replace(new RegExp(i,'g'),'<div class="custom-emote" title="' + i + '" style="background-image:url(' + miscEmotesList[i].url + ');width:' + miscEmotesList[i].width + ';height:' + miscEmotesList[i].height + ';"></div>');
        }
        a.html(b);
        if (d) chat.scrollTop(chat[0].scrollHeight);
    }
    function saveSettings(){localStorage.setItem('tastyPlugSettings',JSON.stringify(settings))}
    function showSettings(){$('#settings').show()}
    function getChatMentions(){return !$('.icon-mention-off').length}
    function getLocked(){return $('.lock-toggle .icon').hasClass('icon-locked')}
    function chatSound(){document.getElementById('chat-sound').playChatSound()}
    var z = function() {
        if (typeof API === 'undefined') setTimeout(z,200);
        else startup();
    };
    z();
})();
