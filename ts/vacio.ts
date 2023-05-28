import {Particle, Sound, SpellLogic} from "./j2ts/jdk8-types";

function getJSSpell() {

    let spell = new SpellLogic("vacio");

    spell.setOnCast( (event) => {
        event.getEndCastLocation().getWorld().spawnParticle(Particle.SMOKE_LARGE, event.getEndCastLocation(), 0);
        event.getCaster().playSound(event.getCaster().getLocation(), Sound.BLOCK_LAVA_EXTINGUISH, 0.4, 2);
        return true;
    });

	return spell;
}