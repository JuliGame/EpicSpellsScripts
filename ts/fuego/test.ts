import {
    API,
    ArrayList,
    Bukkit,
    Dot, FastEvent,
    Hitbox,
    Interpolations,
    ItemStack, LivingEntity,
    Material, MMobEntity,
    Particle, Sound,
    SpellLogic
} from "../j2ts/jdk8-types";
import MultiDot = net.juligame.epicspells.classes.effects.MultiDot;
import List = java.util.List;


function getJSSpell() {

    var spell = new SpellLogic("anshe");

    spell.setOnCast((event) => {
        var caster = event.getCaster();

        event.getCaster().sendMessage("Casteaste la habilidad " + spell.getName());

        var area = event.getFinalStats().getArea();
        var hitbox = new Hitbox(area,area,area);

        // var punto = new Dot(Particle.CLOUD, 5, hitbox, caster)
        // punto.Spawn(caster.getEyeLocation());
        //
        var aDondeApunto = event.getEndCastLocation();
        var alcance = event.getFinalStats().getAlcance();
        // punto.MoveTo(aDondeApunto, 5, alcance)


        // var punto2 = new Dot(Particle.FLAME, 1, hitbox, caster)
        // punto2.Spawn(caster.getEyeLocation());
        // punto2.MoveTo(aDondeApunto, 40, Interpolations.BACK)
        //
        // punto2.setOnEntityHit((entity) => {
        //     entity.setFireTicks(event.getFinalStats().getDuration())
        //     entity.damage(event.getFinalStats().getDamage(), caster)
        //     return true;
        // })
        //
        // var item = new ItemStack(Material.DIAMOND);
        // item.setAmount(5);
        //
        // var itemMeta = item.getItemMeta();
        // var listStrings = new ArrayList<string>();
        //
        // listStrings.add("lore 1")
        // listStrings.add("lore 2")
        // listStrings.add("lore 3")
        // listStrings.add("lore 4")
        // listStrings.add("lore 5")
        // listStrings.add("lore 6")
        // listStrings.add("lore 7")
        //
        // // @ts-ignore
        // itemMeta.setLore(listStrings)
        // item.setItemMeta(itemMeta)
        //
        // caster.getInventory().addItem(item);



        var hitbox = new Hitbox(area, area, area)

        var mythicMober = new MMobEntity("fireball",caster.getEyeLocation(),hitbox,caster,true)
        mythicMober.MoveTo(event.getEndCastLocation(), 7);


        mythicMober.setOnEntityHit((entity) => {
            entity.setFireTicks(event.getFinalStats().getDuration())
            entity.damage(event.getFinalStats().getDamage(), caster)

            entity.getLocation().getWorld().playSound(entity.getLocation(), Sound.BLOCK_FIRE_EXTINGUISH, 1, 2)
            return true;
        })

        mythicMober.setOnGroundHit((location) => {
            location.getWorld().spawnParticle(Particle.FLAME, location, 25, 1 ,1 ,1, 1)
        })

        var itemInHand = caster.getItemInHand();
        return true;
    })

}