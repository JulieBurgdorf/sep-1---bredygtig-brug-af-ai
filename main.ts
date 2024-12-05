namespace SpriteKind {
    export const Vedvarende_energi = SpriteKind.create()
    export const Fossile_brændstoffer = SpriteKind.create()
}
namespace StatusBarKind {
    export const CO2 = StatusBarKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Hero,
    assets.animation`Hero_up`,
    200,
    true
    )
})
function Level_1 () {
    Level = 1
    tiles.setCurrentTilemap(tilemap`level2`)
    scene.setBackgroundColor(13)
    tiles.placeOnRandomTile(Hero, sprites.skillmap.islandTile4)
    info.setScore(0)
    info.setLife(3)
}
function Createlevel () {
    if (Level == 2) {
        game.showLongText("Flot! Nu har du fundet ud af, hvilken energi der er bedst.", DialogLayout.Bottom)
        game.showLongText("Brug din viden til næste level", DialogLayout.Bottom)
        game.splash("Level 2")
        Level_2()
    } else if (Level == 3) {
        tiles.setCurrentTilemap(tilemap`level10`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite, location) {
    if (controller.A.isPressed()) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        info.changeLifeBy(-1)
        tiles.setTileAt(location, sprites.castle.tilePath5)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Hero,
    assets.animation`Hero_left`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Fossile_brændstoffer, assets.tile`myTile7`, function (sprite, location) {
    sprites.destroy(sprite)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Hero,
    assets.animation`Hero_right`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Sol`, function (sprite, location) {
    if (controller.A.isPressed()) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        info.changeScoreBy(10)
        tiles.setTileAt(location, assets.tile`myTile6`)
    }
})
scene.onOverlapTile(SpriteKind.Vedvarende_energi, assets.tile`myTile7`, function (sprite, location) {
    sprites.destroy(sprite)
})
function Miniquiz () {
    game.showLongText("Hvilke kilder er god til energi?", DialogLayout.Bottom)
    Svar1 = game.askForNumber("1: sol, 2: kul", 1)
    if (Svar1 == 2) {
        game.showLongText("Forkert. Prøv level 1 en gang til", DialogLayout.Bottom)
        pause(1000)
        Level_1()
    } else if (Svar1 == 1) {
        Svar1 = game.askForNumber("1: Olie, 2: vind", 1)
        if (Svar1 == 1) {
            game.showLongText("Forkert. Prøv level 1 en gang til", DialogLayout.Bottom)
            pause(1000)
            Level_1()
        } else if (Svar1 == 2) {
            Level += 1
            Createlevel()
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Hero,
    assets.animation`Hero_down`,
    200,
    true
    )
})
function Intro () {
    Brugernavn = game.askForString("Hvad hedder du?")
    game.showLongText("Hej " + Brugernavn, DialogLayout.Bottom)
    game.showLongText("Du er helten, der skal hjælpe verden med at blive et mere bæredygtigt sted.", DialogLayout.Bottom)
    game.showLongText("Find ud af hvilken slags energi der er bedst", DialogLayout.Bottom)
    game.showLongText("Tryk på A for at samle energien", DialogLayout.Bottom)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fossile_brændstoffer, function (sprite, otherSprite) {
    statusbar.value += 1
    sprites.destroy(otherSprite)
})
info.onScore(50, function () {
    Miniquiz()
})
function Level_2 () {
    Hero.setPosition(76, 99)
    controller.moveSprite(Hero, 150, 0)
    tiles.setCurrentTilemap(tilemap`level10`)
    statusbar = statusbars.create(30, 4, StatusBarKind.CO2)
    statusbar.setLabel("CO2")
    statusbar.setColor(7, 2)
    statusbar.value = 50
    for (let index = 0; index < 5; index++) {
        sol = sprites.create(img`
            5 . . . . . . 5 . . . . . . . 5 
            5 5 . . . . . 5 . . . . . 5 5 5 
            . . 5 . . . . . . . . . 5 5 . . 
            . . . . 5 5 5 5 5 5 5 . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            5 5 . 5 5 5 5 5 5 5 5 5 . 5 5 5 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . . 5 5 5 5 5 5 5 . 5 . . . 
            . . . . . . . . . . . . 5 5 . . 
            . 5 5 . . . . . 5 . . . . 5 5 . 
            5 5 . . . . . 5 5 . . . . . 5 5 
            . . . . . . . 5 5 . . . . . . 5 
            `, SpriteKind.Vedvarende_energi)
        sol.setPosition(randint(10, 145), 10)
        sol.setVelocity(0, 50)
        vind = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 1 1 1 1 . . . . . 
            . . . . . . 1 1 . . 1 1 . . . . 
            . . . . . . 1 1 . 1 . 1 1 . . . 
            1 1 1 1 . . . 1 1 1 . . 1 . . . 
            . 1 1 1 1 1 . . . . . . 1 . . . 
            . . . . . 1 1 1 . . . . 1 . . . 
            . . . . . . . 1 1 1 1 1 1 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 1 1 1 1 1 1 1 1 . . . . 
            . 1 1 1 1 1 . . . . 1 1 1 . . . 
            1 1 . . . . . . 1 1 1 . 1 1 . . 
            . . . . . . . 1 1 1 1 . . 1 . . 
            . . . . . . . 1 . 1 . . 1 1 . . 
            . . . . . . . 1 . . 1 1 1 . . . 
            . . . . . . . 1 1 1 1 . . . . . 
            `, SpriteKind.Vedvarende_energi)
        vind.setPosition(randint(10, 145), 10)
        vind.setVelocity(0, 50)
        Kul = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . f f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Fossile_brændstoffer)
        Kul.setPosition(randint(10, 145), 10)
        Kul.setVelocity(0, 50)
        Olie = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f f 5 5 f f . . . . . 
            . . . . . f 5 5 5 5 f . . . . . 
            . . . . f f 5 5 5 5 f . . . . . 
            . . . f f 5 5 5 5 5 f f . . . . 
            . . . f 5 5 5 5 5 5 5 f f . . . 
            . . f f 5 5 5 5 5 5 5 5 f . . . 
            . f f 5 5 5 5 5 5 5 5 5 f . . . 
            . f 5 5 5 5 5 5 5 5 5 5 f f . . 
            . f 5 5 5 5 5 5 5 5 1 1 f f . . 
            . f f 5 5 5 5 5 5 1 1 1 5 f . . 
            . . f f 5 5 5 5 5 1 5 5 f f . . 
            . . . f 5 5 5 5 1 1 5 f f . . . 
            . . . f f f f f f f f . . . . . 
            `, SpriteKind.Fossile_brændstoffer)
        Olie.setPosition(randint(10, 145), 10)
        Olie.setVelocity(0, 50)
        pause(1000)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Vedvarende_energi, function (sprite, otherSprite) {
    statusbar.value += 1
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Vind_højre`, function (sprite, location) {
    if (controller.A.isPressed()) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        info.changeScoreBy(10)
        tiles.setTileAt(location, assets.tile`myTile6`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite, location) {
    if (controller.A.isPressed()) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        info.changeLifeBy(-1)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
})
let Olie: Sprite = null
let Kul: Sprite = null
let vind: Sprite = null
let sol: Sprite = null
let statusbar: StatusBarSprite = null
let Brugernavn = ""
let Svar1 = 0
let Level = 0
let Hero: Sprite = null
Intro()
Level_1()
Hero = sprites.create(assets.image`Hero_`, SpriteKind.Player)
animation.runImageAnimation(
Hero,
assets.animation`Hero_right`,
200,
true
)
controller.moveSprite(Hero)
Hero.setStayInScreen(true)
scene.cameraFollowSprite(Hero)
tiles.placeOnRandomTile(Hero, sprites.skillmap.islandTile4)
