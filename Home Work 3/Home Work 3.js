'use strict'

var CharacterConfig = {
    MAX_LVL: 150,
    MAX_HEALTH:15000
}
CharacterConfig = Object.freeze(CharacterConfig);

var Character = function (options) {
    var _name = '';                     //private
    var _health = 10;
    var _exp = 0;
    var _lvl = 0;
    var _mana = 0;
    var _stamina = 10;

    this.getName = function () {        //public
        return _name;
    }

    this.getHealth = function () {
        return _health;
    }

    this.getExp = function () {
        return _exp;
    }

    this.getLvl = function () {
        return _lvl;
    }

    this.getMana = function () {
        return _mana;
    }

    this.getStamina = function () {
        return _stamina;
    }

    this.setName = function (name = '') {
        if (name.length > 0) {
            _name = name;
        } else {
            console.error("setName-> incorrect name data");
        }
    }

    this.setHealth = function (health = 0) {
        if (health > 0 && health < CharacterConfig.MAX_HEALTH) {
            _health = health;
        } else {
            console.error("setHealth-> incorrect health value");
        }
    }

    this.addExp = function (exp = 0) {
        _exp += exp;
        _lvlUp();
    }
    var _lvlUp = function () {
        //поднять уровень при достижении определенного значения EXP
        if ((_lvl * 100) < parseInt(_exp)) {
            if (_lvl < CharacterConfig.MAX_LVL) {
                _lvl = parseInt(_exp / 100);
            }
        }
    }

    this.setMana = function (mana = 0){
        _mana = mana;
    }

    this.setStamina = function (stamina = 0){
        _stamina = stamina;
    }

    //инициализацяи полей обьект через внешние аргументы
    this.setName(options.name);
    this.setHealth(options.health);
    this.addExp(options.exp);
    this.setMana(options.mana);
    this.setStamina(options.stamina);
    // --/--
}

// var pers = new Character("bob", 150, 256, 325, 245, 987, 65,)     лучше не делать

// var pers = new Character({name:'alex', mana:0, stamina: 15, health:30})
//
// console.log(pers)


var Undead = function (options) {
    Character.apply(this, arguments);                                       // унаследование полей

    var _powerUndead = 0;
    this.getPowerUndead = function () {
        return _powerUndead;
    }
    this.setPowerUndead = function (powerUndead = 0) {
        if (powerUndead < this.getStamina()) {
            _powerUndead = powerUndead;
        }
    }
    Undead.prototype = Object.create(Character.prototype);                  // унаследование методов
}

var artes = new Undead({health:5000, name:'Artes', mana:10000, stamina: 5000,});

console.log(artes);

/* HW
*   Реализовать недостающие get - set  (Character + Undead)
*   Реализовать механизм набора уровней(градациия: опыт + lvl)
* */

artes.addExp(200)

console.log(artes.getName());
console.log(artes.getExp());
console.log(artes.getLvl());
console.log(artes.getHealth());
console.log(artes.getMana());
console.log(artes.getStamina());