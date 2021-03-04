/*
******************************************************
* Copyright (C) 2021-2030 { Nova.js } <{ novascripting@gmail.com }>
*
* This file is part of { Nova Scripting }.
*
* { Nova.js } can not be copied and/or distributed without the express
* permission of { Zapzter, Hawiz or Cadua }
******************************************************
* Anti-aim
* Ragebot Enhancements
* Misc
*/

// Permission for this was granted
// Arc rendering and string outline

Render.OutlineString = function(x, y, a, s, c, f) {
    const alpha = Math.min(255, c[3]);
    Render.String(x + 1, y - 0, a, s, [0, 0, 0, alpha], f);
    Render.String(x - 1, y + 0, a, s, [0, 0, 0, alpha], f);
    Render.String(x + 0, y - 1, a, s, [0, 0, 0, alpha], f);
    Render.String(x + 0, y + 1, a, s, [0, 0, 0, alpha], f);
    Render.String(x - 1, y - 1, a, s, [0, 0, 0, alpha], f);
    Render.String(x - 1, y + 1, a, s, [0, 0, 0, alpha], f);
    Render.String(x + 1, y - 1, a, s, [0, 0, 0, alpha], f);
    Render.String(x + 1, y + 1, a, s, [0, 0, 0, alpha], f);
    Render.String(x, y, a, s, c, f);
}

// Permission for this was granted
Render.Arc = function(x, y, radius, radius_inner, start_angle, end_angle, segments, color)
{
    segments = 360 / segments;

    for (var i = start_angle; i < start_angle + end_angle; i = i + segments)
    {

        var rad = i * Math.PI / 180;
        var rad2 = (i + segments) * Math.PI / 180;

        var rad_cos = Math.cos(rad);
        var rad_sin = Math.sin(rad);

        var rad2_cos = Math.cos(rad2);
        var rad2_sin = Math.sin(rad2);

        var x1_inner = x + rad_cos * radius_inner;
        var y1_inner = y + rad_sin * radius_inner;

        var x1_outer = x + rad_cos * radius;
        var y1_outer = y + rad_sin * radius;

        var x2_inner = x + rad2_cos * radius_inner;
        var y2_inner = y + rad2_sin * radius_inner;

        var x2_outer = x + rad2_cos * radius;
        var y2_outer = y + rad2_sin * radius;

        Render.Polygon( [
            [ x1_outer, y1_outer ],
            [ x2_outer, y2_outer ],
            [ x1_inner, y1_inner ] ],
            color
        );

        Render.Polygon( [
            [ x1_inner, y1_inner ],
            [ x2_outer, y2_outer ],
            [ x2_inner, y2_inner ] ],
            color
        );
    }
}

function Normalize(angle) {
    if (angle < -180)
        angle += 360;

    if (angle > 180)
        angle -= 360;

    return angle;
}

function adjustAngle(angle) {
    if (angle < 0) {
        angle = (90 + angle * (-1));
    } else if (angle > 0) {
        angle = (90 - angle);
    }

    return angle;
}

// region end

function ExtendVector(vector, angle, extension)
{
    var radianAngle = radian(angle);
    return [extension * Math.cos(radianAngle) + vector[0], extension * Math.sin(radianAngle) + vector[1], vector[2]];
}

function VectorAdd(a, b)
{
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function VectorSubtract(a, b)
{
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function VectorMultiply(a, b)
{
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

function VectorLength(x, y, z)
{
    return Math.sqrt(x * x + y * y + z * z);
}

function VectorNormalize(vec)
{
    var length = VectorLength(vec[0], vec[1], vec[2]);
    return [vec[0] / length, vec[1] / length, vec[2] / length];
}

function VectorDot(a, b)
{
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function VectorDistance(a, b)
{
    return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function ClosestPointOnRay(target, rayStart, rayEnd)
{
    var to = VectorSubtract(target, rayStart);
    var dir = VectorSubtract(rayEnd, rayStart);
    var length = VectorLength(dir[0], dir[1], dir[2]);
    dir = VectorNormalize(dir);

    var rangeAlong = VectorDot(dir, to);
    if (rangeAlong < 0.0)
    {
        return rayStart;
    }
    if (rangeAlong > length)
    {
        return rayEnd;
    }
    return VectorAdd(rayStart, VectorMultiply(dir, [rangeAlong, rangeAlong, rangeAlong]));
}
// math region end

UI.AddSubTab(["Config", "SUBTAB_MGR"], "nova");
const path = ["Config", "nova", "nova"];
const accent2 = UI.AddColorPicker(path, "< nova > Circle color");
UI.AddDropdown(path, "< nova > brute", ["Default", "1", "2", "3"], 0);
UI.AddCheckbox(path, "< nova > arc enable")


//------------------------------------------------------------------------------------------------------------------------------------------------------------------ Watermark

function novawatermark() {
    const x = Render.GetScreenSize()[0] / 1
    const ArcColor = UI.GetColor(accent2);
    var font = Render.GetFont("verdana.ttf", 10, true)
    var ping = Math.floor(Global.Latency() * 1000 / 1.5);
    var today = new Date();
    var datetime = today.getHours() + ":" + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
    var tickrate = Global.Tickrate()
    var text = "nova [debug] |" + " delay: " + ping + "ms | " + tickrate + "tick | " + datetime;
    var w = Render.TextSize(text, font)[0] + 10;
    var x = x - w - 10
    Render.FilledRect(x - 20, 10, w, 20, [35, 35, 35, 75]);
    Render.String(x - 18, 10 + 3, 0, text, [255, 255, 255, 255], font)
    Render.FilledRect(x - 20, 10, w, 2, ArcColor)

}

Cheat.RegisterCallback("Draw", "novawatermark");


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------  Indicator
function Indicators() {
    var font = Render.GetFont("verdana.ttf", 9, true);
    var arc_enabled = UI.GetValue(["Config", "nova", "nova", "< nova > arc enable"]);

    const x = Render.GetScreenSize()[0], y = Render.GetScreenSize()[1];

    const localplayer = Entity.GetLocalPlayer();

    if (!localplayer || !Entity.IsAlive(localplayer))
        return;

    const yaw = Local.GetViewAngles()[1] - Local.GetRealYaw();

    var body_active = UI.GetValue(["Rage", "General", "General", "Key assignment", "Force body aim"]);
    var hs_active = UI.GetValue(["Rage", "Exploits", "Key assignment", "Hide shots"]);
    var dt_active = UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"]);
    const charge = Exploit.GetCharge();

    const ref_inverter = ["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"];
    const inverted = UI.GetValue(ref_inverter);
    const ArcColor = UI.GetColor(accent2);

if (arc_enabled){
    for (var i = 0; i < 5; i++)
    {

        Render.Arc(x / 2, y / 2, 11, 5, 270, 360, 18, [10, 10, 10, 42]);

    }

    if (inverted)

        Render.Arc(x / 2, y / 2, 10, 6, 270, 180, 18, ArcColor);
    else
        Render.Arc(x / 2, y / 2, 10, 6, 90, 180, 18, ArcColor);

    Render.Arc(x / 2, y / 2, 20, 15, yaw - 120, 60, 18, ArcColor);
}



    Render.OutlineString(x / 2, y / 2 + 40, 1, "nova", ArcColor, font);
    Render.OutlineString(x / 2, y / 2 + 50, 1, "dynamic", [255, 255, 255, 255], font);
    if (dt_active)
    Render.OutlineString(x / 2, y / 2 + 60, 1, "dt", [184 - 35 * charge, 6 + 178 * charge, 6, 255], font);
    else if(!dt_active && hs_active)
    Render.OutlineString(x / 2, y / 2 + 60, 1, "aa", [137, 137, 250, 255], font);
    else if(dt_active && hs_active)
    Render.OutlineString(x / 2, y / 2 + 60, 1, "dt", [184 - 35 * charge, 6 + 178 * charge, 6, 255], font);


    if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"])){
        Render.OutlineString(x / 2 + 20, y / 2 + 40, 1, ">", ArcColor, font);
        Render.OutlineString(x / 2 - 20, y / 2 + 40, 1, "<", [255, 255, 255, 255], font);
    }
    else{
        Render.OutlineString(x / 2 + 20, y / 2 + 40, 1, ">", [255, 255, 255, 255], font);
        Render.OutlineString(x / 2 - 20, y / 2 + 40, 1, "<", ArcColor, font);
    }


}


function onCreateMove() {

}

function onDraw() {
    Indicators();
}

Cheat.RegisterCallback("Draw", "onDraw");
Cheat.RegisterCallback("CreateMove", "onCreateMove");
Cheat.RegisterCallback("Draw", "Indicators");


//-----------------------------------------------------------------------------------------------------------------------------  ANTI-HIT

var shared = {
    create_fonts: true,
    fonts: { default: null, small: null },

    target: null,

    side: 0,
    last_side: 0
};
function getRandomIntInclusive ( min, max )
{
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor ( Math.random( ) * ( max - min) ) + min ;
}
const cache =
{
    previousState : undefined,
};

function whatEver()
{
    var yourNumber = getRandomIntInclusive( 0, 4 );
    const correctNumber = function( min, max, myNumber )
    {
        if ( cache.prevInt == myNumber )
        {
            myNumber = getRandomIntInclusive( min, max );
            correctNumber( min, max, myNumber );
        }
        myNumber = myNumber == undefined ? getRandomIntInclusive( min, max ) : myNumber;
        cache.prevInt = myNumber;
        return myNumber;
    };
    return correctNumber( 0, 4, yourNumber );
}

var nova = {
    antibrute: {
        activated: false,
        stage: null,
        timesinceinvert: 0.0,
    }
}

function flip() {
    UI.SetValue(["Config", "nova", "SHEET_MGR", "nova", "< nova > brute"],  whatEver());


}
function flip2() {
    UI.ToggleHotkey(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"], "AA Inverter");
}




function on_impact(){

var currenttime = Global.Curtime();
if (Math.abs(nova.antibrute.timesinceinvert - currenttime) < 0.275) return;
nova.antibrute.timesinceinvert = currenttime;


const local = Entity.GetLocalPlayer();
const ent = Entity.GetEntityFromUserID(Event.GetInt("userid"));
const bullet_pos = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z")]

const local_head_pos = Entity.GetHitboxPosition(local, 0)
const enemy_eye_pos = Entity.GetEyePosition(ent)

if (Entity.IsDormant(ent))
    return;
if (VectorDistance(local_head_pos,ClosestPointOnRay(local_head_pos, enemy_eye_pos, bullet_pos)) > 38)
     return;
if (ent == Entity.GetLocalPlayer())
    return;

nova.antibrute.activated = true;
flip();
flip2();
}

Cheat.RegisterCallback("bullet_impact", "on_impact")

const ref_inverter = [ "Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter" ];
function mainAA() {
var currenttime = Global.Curtime();
        if (Math.abs(nova.antibrute.timesinceinvert - currenttime) > 4) {
        nova.antibrute.activated = false;

       if (nova.antibrute.activated == false) {
        UI.SetValue(["Config", "nova", "SHEET_MGR", "nova", "< nova > brute"],  0);
       }
        }
}
Cheat.RegisterCallback("CreateMove", "mainAA")
function fakeoffset(min, max) {

    min = Math.ceil(min);

    max = Math.floor(max);

    return Math.floor(Math.random() * (min * max - 0,0010)) + min;

  }
  function realoffset(min, max) {

    min = Math.ceil(min);

    max = Math.floor(max);

    return Math.floor(Math.random() * (min * max - 0,0025)) + min;

}
function brute2() {
    const me = Entity.GetLocalPlayer();
    if (!me || !Entity.IsAlive(me))
        return;
        var brute_stages = UI.GetValue(["Config", "nova", "SHEET_MGR", "nova", "< nova > brute"]);
    if (brute_stages == 1) {
        const realoffsetspam = Globals.Tickcount() % 4 >= 2 ? 29 : -29;

        AntiAim.SetOverride(1);
        AntiAim.SetRealOffset(realoffsetspam);
        AntiAim.SetFakeOffset(0)


    } else if (brute_stages == 2) {

        AntiAim.SetOverride(1)
        AntiAim.SetFakeOffset(UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) ? 0 : 10);
        AntiAim.SetRealOffset(UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) ? 20: -15);
        AntiAim.SetLBYOffset(0);
    } else if (brute_stages == 3) {
        AntiAim.SetOverride(1)
        AntiAim.SetFakeOffset(UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) ? fakeoffset (0, 1): fakeoffset (10, 11));
        AntiAim.SetRealOffset(UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) ? realoffset (35, 25): realoffset (-35, -25));
        AntiAim.SetLBYOffset(0);
    } else if (brute_stages == 0) {
        AntiAim.SetOverride(1)
     if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"])){
        AntiAim.SetFakeOffset( 34);
        AntiAim.SetRealOffset(-34);
        AntiAim.SetLBYOffset(120);
        }
        else{
        AntiAim.SetFakeOffset( -34);
        AntiAim.SetRealOffset(34);
        AntiAim.SetLBYOffset(-120);
        }
        AntiAim.SetOverride(0)
    }
}
Cheat.RegisterCallback("CreateMove", "brute2")







