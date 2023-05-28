import {
	Dot,
	Hitbox,
	Particle,
	Sound,
	SpellLogic
} from "../j2ts/jdk8-types";
import Bukkit = org.bukkit.Bukkit;
function getJSSpell() {
	
	
	var spell = new SpellLogic("Flecha Ignea");
	spell.setOnCast((event) => {
		
		// ejecutamos un sonido
		event.getCaster().getWorld().playSound(event.getCaster().getLocation(), Sound.ENTITY_BLAZE_SHOOT, .3, 1);

		// esto es una variable llamada r que simplemente guarda un numero que es el redio del spell, esto es lo que dice la base de datos.
		const r = event.getFinalStats().getArea();
		// usamos esa data para la "HitBox", asi le decimos cuanto tiene que medir para calcular coliciones.
		// creamos un "dot" (un punto)
		// Particle.FLAME -> el tipo de particula [https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Particle.html]
		// el 1 ese es un int, es la cantidad de ticks entre render y render, 1 = muy rapido. 20 = cada 1 segundo.
		// la hitbox que mide r para cada lado.
		// por ultimo un player en este caso el caster (asi para detectar que no nos pege el spell a nosotros mismos xD)
		const dot = new Dot(Particle.FLAME, 1, new Hitbox(r, r, r), event.getCaster());
		
		// dot tiene muchas funciones. entre ellas
		// � onEntityHit     (cuando le pege a una entidad)
		// � onCasterHit     (cuando le pega al propio caster que tiro, para un heal en area ponele que sirve esto)
		// � onGroundHit     (cuando pega en un bloque)
		
		// cuando le pege a una entidad
		dot.setOnEntityHit((entity) => {
			// entity es la entidad [https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/LivingEntity.html]
			
			// la prendemos fuego durante lo que digan las estats en la base de datos
			entity.setFireTicks(event.getFinalStats().getDuration());
			// ejecutamos un sonido en la localizacion donde le pego a esta entidad, con un volumen de 0.3 y un pitch de 1
			// lista de sonidos [https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/LivingEntity.html]
			entity.getLocation().getWorld().playSound(entity.getLocation(), Sound.ENTITY_GENERIC_BURN, .3, 1);
			
			// le hacemos da�o a la entidad, segun lo que diga la base de datos.
			// el segundo parametro es para que spigot sepa que el da�o no es de la nada, sino que el credito (el que le pego) es el caster
			entity.damage(event.getFinalStats().getDamage(), event.getCaster());
			
			// este return si que sirve, si esta en true, el proyectil se destruye, si esta en false sigue atravesando.
			return true;
		});
		
		// esto es cuando el proyectil pegue en un bloque
		dot.setOnGroundHit((location) => {
			// ponemos unas particulas y un sonido, bien simple pero fachero
			location.getWorld().spawnParticle(Particle.FLAME, location, 15, .5, .5, .5, 0);
			location.getWorld().playSound(location, Sound.BLOCK_FIRE_EXTINGUISH, .3, 1);
		});
		
		// bueno ahi arriba unicamente definimos como es el comportamiento de este "dot"
		
		// ahora hay que spawnearlo, en la localizacion del caster. (el + es para que spawnee a la altura de los ojos del player)
		dot.Spawn(event.getCaster().getLocation().add(0, 1.5, 0));

		// y bueno si lo dejamos ahi quedaria duro en el aire por siemopre, para evitar eso lo movemos.
		// esto ya esta todo EZ, pones la localizacion a donde quere que se mueva en este caso a donde apunto al disparar.
		// despues la cantidad de bloques que se mueve por segundo, pueden ser 10000 o 0.02 xD pone lo q te parezca la velocidad
		// por ultimo el alcance maximo antes que despawnee, en este caso lo que dice la DB.
		dot.MoveTo(event.getEndCastLocation(), 20, event.getFinalStats().getAlcance());
		return true;
	});
	
	// no olvidarnos de esto xD
	return spell;	
}