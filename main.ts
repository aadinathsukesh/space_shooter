namespace SpriteKind {
    export const PowerUP = SpriteKind.create()
    export const Mode = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . 2 2 1 1 1 1 2 2 . 
        . . . . 2 2 3 3 1 1 1 1 1 1 2 . 
        . . 3 3 3 3 1 1 1 1 1 1 1 1 2 . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 2 . 
        . . 3 3 2 2 3 1 1 1 1 1 1 1 2 . 
        . . . . . . 2 2 3 1 1 1 1 2 2 . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    if (doublefireMode && doublefireMode.lifespan > 0) {
        projectile.y += -5
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 2 2 2 2 . . . 
            . . . . . . . 2 2 1 1 1 1 2 2 . 
            . . . . 2 2 3 3 1 1 1 1 1 1 2 . 
            . . 3 3 3 3 1 1 1 1 1 1 1 1 2 . 
            . . 1 1 1 1 1 1 1 1 1 1 1 1 2 . 
            . . 3 3 2 2 3 1 1 1 1 1 1 1 2 . 
            . . . . . . 2 2 3 1 1 1 1 2 2 . 
            . . . . . . . . . 2 2 2 2 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 200, 0)
        projectile.y += 5
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(10)) {
        powerUp = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            . 5 2 8 8 8 8 8 8 8 8 8 8 2 5 . 
            . 5 8 8 8 8 9 9 9 9 9 8 8 8 5 . 
            . 5 8 8 8 8 9 8 8 8 9 8 8 8 5 . 
            . 5 8 8 8 8 9 8 8 8 9 8 8 8 5 . 
            . 5 8 8 8 8 9 9 9 9 9 8 8 8 5 . 
            . 5 8 8 8 8 9 8 8 8 8 8 8 8 5 . 
            . 5 8 8 8 8 9 8 8 8 8 8 8 8 5 . 
            . 5 8 8 8 8 9 8 8 8 8 8 8 8 5 . 
            . 5 2 8 8 8 8 8 8 8 8 8 8 2 5 . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PowerUP)
        powerUp.x = enemy.x
        powerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUP, function (sprite, otherSprite) {
    doublefireMode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 5 5 5 2 . . . . . . 
        . . 9 9 9 2 5 5 5 2 . . . . . . 
        . 9 9 9 9 2 5 5 5 2 . . . . . . 
        9 9 9 9 9 9 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 5 5 5 2 . . . . . . 
        . . 9 9 9 2 5 5 5 2 . . . . . . 
        . 9 9 9 9 2 5 5 5 2 . . . . . . 
        9 9 9 9 9 9 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Mode)
    doublefireMode.setPosition(48, 7)
    doublefireMode.lifespan = 10000
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    enemyDeath(otherSprite)
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let powerUp: Sprite = null
let doublefireMode: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
game.showLongText("Welcome to Star Wars- Game developed by Aadinath. Press A button.", DialogLayout.Top)
game.showLongText("A button or Keyboard Q for firing", DialogLayout.Bottom)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    5 5 5 2 . . . . . . . . . . . . 
    2 2 5 5 5 5 . . . . . . 2 . . . 
    f 7 7 7 2 2 2 2 2 2 2 2 2 . . . 
    f 2 2 7 7 4 4 4 4 . . . 2 . . . 
    f 5 2 2 7 4 8 8 8 8 4 . . . . . 
    f 5 5 2 7 4 8 6 6 6 8 4 4 . . . 
    f 4 5 2 7 4 8 6 6 6 6 6 8 1 4 1 
    f 5 5 2 7 4 8 6 6 6 6 6 8 4 1 4 
    f 5 2 2 7 4 8 6 6 6 8 4 4 . . . 
    f 5 2 7 7 4 8 8 8 8 4 . . . . . 
    f 2 2 7 4 4 4 4 4 . . . 2 . . . 
    f 7 7 7 2 2 2 2 2 2 2 2 2 . . . 
    2 2 5 5 5 5 . . . . . . 2 . . . 
    5 5 5 2 . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(10)
let enemySpeed = 20
let enemySpawnTime = 2000
game.onUpdateInterval(5000, function () {
    enemySpeed += 5
    enemySpeed = Math.min(enemySpeed, 50)
    enemySpawnTime += -200
    enemySpawnTime = Math.max(enemySpawnTime, 500)
})
forever(function () {
    enemyShip = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ....................444.
        ...............4444444..
        ..........55555555554...
        ........558888888855....
        ......55589999999855....
        ......22899666669855....
        ......55589999999855....
        ........558888888855....
        ..........55555555554...
        ...............4444444..
        ...................4444.
        ........................
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = 0 - enemySpeed
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(5, 12)
    statusbar.max = 100
    statusbar.attachToSprite(enemyShip)
    pause(enemySpawnTime)
})
