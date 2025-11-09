export default class CharacterModel {

    constructor(id
        , userId
        , createdAt
        , name
        , avatar
        , race
        , class_
        , guild
        , hp
        , shield
        , level
        , isOnline
        , kingdom) {
        this.id = id
        this.userId = userId
        this.createdAt = createdAt
        this.name = name
        this.avatar = avatar
        this.race = race
        this.class = class_
        this.guild = guild
        this.hp = hp
        this.shield = shield
        this.level = level
        this.isOnline = isOnline
        this.kingdom = kingdom
    }

}